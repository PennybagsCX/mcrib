import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BurnMetrics,
  calculateBurnMetrics,
  getContractMetadata,
} from '../lib/blockchainService';

interface UseBurnDataResult {
  data: BurnMetrics | null;
  tokenSymbol: string;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

export function useBurnData(contractAddress: string): UseBurnDataResult {
  const [data, setData] = useState<BurnMetrics | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string>('$MCRIB');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Fetch burn data
  const fetchBurnData = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      setError(null);
      const [metrics, metadata] = await Promise.all([
        calculateBurnMetrics(contractAddress),
        getContractMetadata(contractAddress).catch(() => ({ symbol: 'MCRIB' })),
      ]);

      if (!isMountedRef.current) return;

      setData(metrics);
      setTokenSymbol('$' + metadata.symbol);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      if (!isMountedRef.current) return;

      console.error('Error fetching burn data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch burn data');
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [contractAddress]);

  // Manual refetch function
  const refetch = useCallback(async () => {
    setIsLoading(true);
    await fetchBurnData();
  }, [fetchBurnData]);

  // Initial fetch and set up polling
  useEffect(() => {
    isMountedRef.current = true;

    // Initial fetch
    fetchBurnData();

    // Set up polling interval (30 seconds)
    const intervalMs = parseInt(import.meta.env.VITE_UPDATE_INTERVAL || '30000', 10);
    intervalRef.current = setInterval(() => {
      fetchBurnData();
    }, intervalMs);

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchBurnData]);

  return {
    data,
    tokenSymbol,
    isLoading,
    error,
    lastUpdated,
    refetch,
  };
}
