import { ethers } from 'ethers';

// Constants
const DOGECHAIN_RPC = import.meta.env.VITE_DOGECHAIN_RPC || 'https://rpc.dogechain.dog';
const BLOCKSCOUT_API = import.meta.env.VITE_BLOCKSCOUT_API || 'https://explorer.dogechain.dog/api';
const BURN_ADDRESS = import.meta.env.VITE_BURN_ADDRESS || '0x000000000000000000000000000000000000dEaD';
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2';

// Types
export interface BurnTransaction {
  hash: string;
  timestamp: number;
  from: string;
  value: string;
  blockNumber: number;
}

export interface BuybackTransaction {
  hash: string;
  timestamp: number;
  value: string;
  blockNumber: number;
}

export interface BurnMetrics {
  totalSupply: string;
  totalSupplyRaw: bigint;
  totalBurned: string;
  totalBurnedRaw: bigint;
  burnPercentage: number;
  circulatingSupply: string;
  circulatingSupplyRaw: bigint;
  recentBurns: BurnTransaction[];
  totalBurnTransactions: number;
  buybackData: {
    totalBuybacks: number;
    latestBuyback: BuybackTransaction | null;
    buybackPercentage: number;
  };
  decimals: number;
}

// ERC-20 ABI for balance and total supply queries
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
];

// Initialize provider
const getProvider = () => {
  return new ethers.JsonRpcProvider(DOGECHAIN_RPC);
};

// Format token amount with proper decimals
export const formatTokenAmount = (amount: bigint, decimals: number = 18): string => {
  // Use BigInt for the divisor to handle large decimal values
  const divisor = 10n ** BigInt(decimals);
  const whole = amount / divisor;
  const fractional = amount % divisor;

  if (fractional === 0n) {
    return whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Format fractional part with leading zeros
  const fractionalStr = fractional.toString().padStart(Number(decimals), '0');
  const combined = `${whole.toString()}.${fractionalStr}`;
  const [wholePart, decimalPart] = combined.split('.');

  // Add commas to whole part
  const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Remove trailing zeros from decimal part
  const trimmedDecimal = decimalPart.replace(/0+$/, '');

  return trimmedDecimal ? `${formattedWhole}.${trimmedDecimal}` : formattedWhole;
};

// Abbreviate large numbers for display (K, M, B, T)
export const abbreviateNumber = (amount: bigint, decimals: number = 18): string => {
  // Convert to actual token amount first
  const divisor = 10n ** BigInt(decimals);
  const whole = amount / divisor;

  // Convert to number for abbreviation
  const num = Number(whole);

  if (isNaN(num) || num === 0) return '0';

  const suffixes = ['', 'K', 'M', 'B', 'T']; // Cap at Trillions
  const suffixNum = Math.min(Math.floor(('' + Math.floor(num)).length / 3), 4); // Max index 4 (T)

  if (suffixNum === 0) {
    return whole.toString();
  }

  const shortValue = num / Math.pow(1000, suffixNum);

  // Handle decimal places based on magnitude
  let formatted: string;
  if (shortValue >= 100) {
    formatted = Math.floor(shortValue).toString();
  } else if (shortValue >= 10) {
    formatted = (Math.floor(shortValue * 10) / 10).toFixed(1);
  } else {
    formatted = (Math.floor(shortValue * 100) / 100).toFixed(2);
  }

  // Remove trailing zeros after decimal point
  if (formatted.includes('.')) {
    formatted = formatted.replace(/\.?0+$/, '');
  }

  return formatted + suffixes[suffixNum];
};

// Fetch token balance for any address
export async function getTokenBalance(
  contractAddress: string,
  walletAddress: string
): Promise<{ balance: bigint; decimals: number }> {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

    const [balance, decimals] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
    ]);

    return { balance, decimals };
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw new Error(`Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch total supply from contract
export async function getTotalSupply(contractAddress: string): Promise<{ supply: bigint; decimals: number }> {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

    const [supply, decimals] = await Promise.all([
      contract.totalSupply(),
      contract.decimals(),
    ]);

    return { supply, decimals };
  } catch (error) {
    console.error('Error fetching total supply:', error);
    throw new Error(`Failed to fetch total supply: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch token transfer events using BlockScout API
export async function getTokenTransfers(
  contractAddress: string,
  address?: string
): Promise<any[]> {
  try {
    let url = `${BLOCKSCOUT_API}?module=account&action=tokentx&contractaddress=${contractAddress}`;

    if (address) {
      url += `&address=${address}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== '1' && data.status !== 1) {
      throw new Error(data.message || 'API request failed');
    }

    return data.result || [];
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    throw new Error(`Failed to fetch transfers: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch all burn transactions to dead address
export async function getBurnTransactions(contractAddress: string): Promise<BurnTransaction[]> {
  try {
    const transfers = await getTokenTransfers(contractAddress, BURN_ADDRESS);

    return transfers
      .filter((tx: any) => tx.to.toLowerCase() === BURN_ADDRESS.toLowerCase())
      .map((tx: any) => ({
        hash: tx.hash,
        timestamp: parseInt(tx.timeStamp),
        from: tx.from,
        value: tx.value,
        blockNumber: parseInt(tx.blockNumber),
      }))
      .sort((a: BurnTransaction, b: BurnTransaction) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching burn transactions:', error);
    throw new Error(`Failed to fetch burn transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Detect buyback transactions
// Note: True buybacks would involve the contract using fees to buy tokens from LP and burn them
// This function attempts to detect such transactions, but they may not be implemented yet
export async function detectBuybacks(contractAddress: string): Promise<{
  totalBuybacks: number;
  latestBuyback: BuybackTransaction | null;
  buybackPercentage: number;
}> {
  try {
    const burnTxs = await getBurnTransactions(contractAddress);

    // A transaction is a buyback if it comes from the contract address or LP address
    // For now, we'll count all burns from the contract address as buybacks
    const buybackTxs = burnTxs.filter((tx) =>
      tx.from.toLowerCase() === contractAddress.toLowerCase()
    );

    const latestBuyback = buybackTxs.length > 0 ? buybackTxs[0] : null;
    const buybackPercentage = burnTxs.length > 0 ? (buybackTxs.length / burnTxs.length) * 100 : 0;

    // Log for debugging - if this is consistently 0, buybacks may not be implemented yet
    if (buybackTxs.length === 0) {
      console.log('No buyback transactions detected - the buyback feature may not be implemented in the contract yet');
    }

    return {
      totalBuybacks: buybackTxs.length,
      latestBuyback,
      buybackPercentage,
    };
  } catch (error) {
    console.error('Error detecting buybacks:', error);
    return {
      totalBuybacks: 0,
      latestBuyback: null,
      buybackPercentage: 0,
    };
  }
}

// Calculate comprehensive burn metrics
export async function calculateBurnMetrics(contractAddress: string): Promise<BurnMetrics> {
  try {
    // Fetch burn balance and total supply in parallel
    const [burnData, supplyData] = await Promise.all([
      getTokenBalance(contractAddress, BURN_ADDRESS),
      getTotalSupply(contractAddress),
    ]);

    const burnedAmount = burnData.balance;
    const totalSupply = supplyData.supply;
    const decimals = burnData.decimals;

    // Calculate circulating supply
    const circulatingSupply = totalSupply - burnedAmount;

    // Calculate burn percentage - use BigInt arithmetic
    let burnPercentage = 0;
    if (totalSupply > 0n) {
      const burnAmountScaled = burnedAmount * 10000n;
      const percentageScaled = burnAmountScaled / totalSupply;
      burnPercentage = Number(percentageScaled) / 100;
    }

    // Fetch recent burn transactions (last 10) - if this fails, continue without it
    let burnTxs: BurnTransaction[] = [];
    let buybackData = {
      totalBuybacks: 0,
      latestBuyback: null as BuybackTransaction | null,
      buybackPercentage: 0,
    };

    try {
      burnTxs = await getBurnTransactions(contractAddress);
      buybackData = await detectBuybacks(contractAddress);
    } catch (txError) {
      console.warn('Could not fetch burn transactions, continuing without them:', txError);
      burnTxs = [];
    }

    return {
      totalSupply: formatTokenAmount(totalSupply, decimals),
      totalSupplyRaw: totalSupply,
      totalBurned: formatTokenAmount(burnedAmount, decimals),
      totalBurnedRaw: burnedAmount,
      burnPercentage,
      circulatingSupply: formatTokenAmount(circulatingSupply, decimals),
      circulatingSupplyRaw: circulatingSupply,
      recentBurns: burnTxs.slice(0, 10),
      totalBurnTransactions: burnTxs.length,
      buybackData,
      decimals,
    };
  } catch (error) {
    console.error('Error calculating burn metrics:', error);
    throw error;
  }
}

// Fetch contract metadata
export async function getContractMetadata(contractAddress: string): Promise<{
  name: string;
  symbol: string;
  decimals: number;
}> {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

    const [name, symbol, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
    ]);

    return { name, symbol, decimals };
  } catch (error) {
    console.error('Error fetching contract metadata:', error);
    throw new Error(`Failed to fetch metadata: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Validate address format
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};
