import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useBurnData } from '../hooks/useBurnData';
import { formatTimestamp, formatTokenAmount, abbreviateNumber } from '../lib/blockchainService';

export default function BurnCounter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';

  const { data, tokenSymbol, isLoading, error, lastUpdated, refetch } = useBurnData(contractAddress);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return 'Never';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 5) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  };

  if (isLoading && !data) {
    return (
      <motion.div
        className="w-full bg-white border-4 border-black retro-shadow-red overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8 animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error && !data) {
    return (
      <motion.div
        className="w-full bg-red-50 border-4 border-red-500 p-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-4xl mb-2">⚠️</div>
        <h3 className="font-black text-red-700 text-lg mb-2">Unable to Load Burn Data</h3>
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <button
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full bg-white border-4 border-black retro-shadow-red overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ rotate: 0, transformStyle: 'preserve-3d' }}
    >
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-red-600 to-amber-500 p-4 md:p-6 text-white"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">
              🔥
            </span>
            <h3 className="font-black text-2xl md:text-3xl uppercase italic">Live Burn Tracker</h3>
          </div>
          <motion.div
            className="flex items-center gap-2 text-sm font-bold self-start md:self-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            LIVE
          </motion.div>
        </div>
      </motion.div>

      {/* Main Metrics - Horizontal Grid */}
      <div className="p-6 md:p-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={itemVariants}
        >
          {/* Total Burned */}
          <motion.div
            className="bg-gradient-to-br from-red-600 to-red-700 p-4 md:p-6 rounded-xl border-4 border-black retro-shadow-red flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl md:text-5xl mb-2">🔥</div>
            <h3 className="font-black text-white text-sm md:text-base uppercase mb-1">
              Total Burned
            </h3>
            <motion.div
              className="font-black text-xl md:text-2xl text-amber-300"
              key={data?.totalBurnedRaw?.toString()}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {data?.totalBurnedRaw ? abbreviateNumber(data.totalBurnedRaw, data.decimals) : '0'}
            </motion.div>
          </motion.div>

          {/* Burn Percentage */}
          <motion.div
            className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 md:p-6 rounded-xl border-4 border-black retro-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl md:text-5xl mb-2">📊</div>
            <h3 className="font-black text-white text-sm md:text-base uppercase mb-1">
              Burn Percentage
            </h3>
            <div className="font-black text-xl md:text-2xl text-white">
              {data?.burnPercentage.toFixed(2)}%
            </div>
          </motion.div>

          {/* Circulating Supply */}
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 md:p-6 rounded-xl border-4 border-black retro-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl md:text-5xl mb-2">💰</div>
            <h3 className="font-black text-white text-sm md:text-base uppercase mb-1">
              Circulating Supply
            </h3>
            <div className="font-black text-xl md:text-2xl text-amber-300">
              {data?.circulatingSupplyRaw ? abbreviateNumber(data.circulatingSupplyRaw, data.decimals) : '0'}
            </div>
          </motion.div>

          {/* Total Burns */}
          <motion.div
            className="bg-gradient-to-br from-green-600 to-green-700 p-4 md:p-6 rounded-xl border-4 border-black retro-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl md:text-5xl mb-2">📈</div>
            <h3 className="font-black text-white text-sm md:text-base uppercase mb-1">
              Total Burns
            </h3>
            <div className="font-black text-xl md:text-2xl text-amber-300">
              {data?.totalBurnTransactions || 0}
            </div>
          </motion.div>
        </motion.div>

        {/* Buybacks & Last Updated Row */}
        <motion.div
          className={`grid gap-4 mt-4 pt-4 border-t-4 border-black ${
            data?.buybackData.totalBuybacks > 0 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
          variants={itemVariants}
        >
          {data?.buybackData.totalBuybacks > 0 && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg border-4 border-black retro-shadow">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍗</span>
                <span className="text-xs font-black text-white uppercase">Buybacks</span>
              </div>
              <span className="font-black text-xl text-amber-300">
                {data?.buybackData.totalBuybacks || 0}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg border-4 border-black retro-shadow">
            <span className="text-xs font-black text-white uppercase">Last updated</span>
            <span className="font-black text-lg text-amber-300">{formatLastUpdated(lastUpdated)}</span>
          </div>
        </motion.div>

        {/* Expand/Collapse Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 bg-amber-400 hover:bg-amber-500 border-4 border-black rounded-xl py-3 px-6 font-black text-sm uppercase retro-shadow transition-all flex items-center justify-center gap-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Hide' : 'View'} Recent Burn Activity</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </motion.button>
      </div>

      {/* Recent Activity Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t-4 border-black bg-gray-50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 md:p-8">
              <h4 className="font-black text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span>🔥</span>
                <span>Recent Burn Transactions</span>
              </h4>

              {data?.recentBurns && data.recentBurns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.recentBurns.map((burn, index) => (
                    <motion.div
                      key={burn.hash}
                      className="bg-white p-4 rounded-xl border-4 border-gray-200 hover:border-red-300 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs md:text-sm text-gray-600 truncate flex-1">
                          {burn.from.slice(0, 8)}...{burn.from.slice(-6)}
                        </span>
                        <span className="font-black text-sm md:text-base text-red-600 ml-2">
                          🔥 {formatTokenAmount(BigInt(burn.value))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatTimestamp(burn.timestamp)}</span>
                        <a
                          href={`https://explorer.dogechain.dog/tx/${burn.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 font-black hover:underline uppercase"
                        >
                          View on Explorer →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No burn transactions yet
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Latest Buyback Banner */}
      {data?.buybackData.latestBuyback && (
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 border-t-4 border-black"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍗</span>
              <span className="font-black text-white uppercase">Latest Buyback:</span>{' '}
              <span className="font-bold text-white">{formatTokenAmount(BigInt(data.buybackData.latestBuyback.value))}</span>
              <span className="text-white">•</span>
              <span className="text-white">{formatTimestamp(data.buybackData.latestBuyback.timestamp)}</span>
            </div>
            <a
              href={`https://explorer.dogechain.dog/tx/${data.buybackData.latestBuyback.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-200 font-black hover:underline uppercase"
            >
              View Transaction →
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
