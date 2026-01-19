import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import BurnCounter from './BurnCounter';
import BubblemapsPartner from './BubblemapsPartner';
import StakingPartner from './StakingPartner';
import { useBurnData } from '../hooks/useBurnData';

export default function Tokenomics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';
  const { data } = useBurnData(contractAddress);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="tokenomics" className="py-24 px-4 bg-white relative" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto flex flex-col gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Top Section: Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
          {/* Left Column: Sales Pitch */}
          <div className="md:w-1/2 space-y-8">
            <motion.h2
              className="text-5xl font-black uppercase italic text-red-700 leading-none"
              variants={itemVariants}
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
            >
              What's in the <br />
              <span className="text-amber-500 text-6xl" style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}>Special Sauce?</span>
            </motion.h2>
            <motion.div
              className="text-xl font-bold text-gray-800 space-y-4"
              variants={itemVariants}
            >
              <p>
                Every transaction marinates in delicious 3% sauce.
              </p>
              <p>
                <span className="text-red-700">1% buyback & burn</span> (crispy supply), <span className="text-amber-600">1% reflections</span> (free tendies for holders), and <span className="text-red-700">1% dev</span> (keeps the grill hot).
              </p>
              <p>
                Same sauce on buys AND sells - double the flavor, double the gains.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              <motion.div
                className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl border-4 border-black retro-shadow-red flex flex-col items-center justify-center text-center"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-5xl mb-2">🔥</div>
                <h3 className="font-black text-white text-lg uppercase">
                  1% Buyback & Burn
                </h3>
                <p className="text-sm font-bold text-amber-300">
                  Crispy supply reduction
                </p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl border-4 border-black retro-shadow flex flex-col items-center justify-center text-center"
                whileHover={{ scale: 1.05, y: -4, rotate: [0, -2, 2, -2, 0] }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-5xl mb-2">🍗</div>
                <h3 className="font-black text-white text-lg uppercase">
                  1% Reflections
                </h3>
                <p className="text-sm font-bold text-amber-100">
                  Free tendies for holders
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: The Label */}
          <motion.div
            className="md:w-1/2 w-full max-w-md mx-auto bg-white p-4 border-4 border-black retro-shadow-red"
            variants={itemVariants}
            whileHover={{ rotate: 0 }}
            initial={{ rotate: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-black text-4xl leading-none border-b border-black pb-1">
              Nutrition Facts
            </h3>
            <p className="text-sm font-bold border-b-8 border-black pb-1 mb-2">
              Serving Size: 1 Wallet
            </p>

            <div className="flex justify-between items-baseline font-black border-b border-black py-1">
              <span className="text-2xl">Amount Per $MCRIB</span>
            </div>

            <div className="border-b border-black py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="font-bold">Total Supply</span>
              <span className="font-bold text-right break-all text-xs sm:text-sm">
                {data?.totalSupply || 'Loading...'}
              </span>
            </div>

            <div className="border-b border-black py-1 pl-4 flex justify-between text-sm">
              <span>Community Allocation</span>
              <span className="font-bold">100%</span>
            </div>

            <div className="border-b border-black py-1 pl-4 flex justify-between text-sm">
              <span>Team (Marketing)</span>
              <span className="font-bold">0%</span>
            </div>

            <div className="border-b border-black py-1 pl-4 flex justify-between text-sm">
              <span>Presale</span>
              <span className="font-bold">0%</span>
            </div>

            <div className="border-b border-black py-1 pl-4 flex justify-between text-sm">
              <span>Liquidity Pool</span>
              <span className="font-bold">0%</span>
            </div>

            <div className="border-b border-black py-1 pl-4 flex justify-between text-sm">
              <span>Airdrop</span>
              <span className="font-bold">0%</span>
            </div>

            <div className="border-b-8 border-black py-1 flex justify-between font-black mt-2">
              <span>Taxes (Buy & Sell)</span>
              <span>3%</span>
            </div>

            <div className="border-b border-black py-1 flex justify-between">
              <span className="font-bold pl-4">- Burn</span>
              <span className="font-bold text-sm">1%</span>
            </div>

            <div className="border-b border-black py-1 flex justify-between">
              <span className="font-bold pl-4">- Reflections</span>
              <span className="font-bold text-sm">1%</span>
            </div>

            <div className="border-b border-black py-1 flex justify-between">
              <span className="font-bold pl-4">- Auto-LP</span>
              <span className="font-bold text-sm">1%</span>
            </div>

            <div className="py-1 text-xs font-bold leading-tight mt-2">
              * Percent Daily Values are based on a 2,000 degens diet. Your values
              may be higher or lower depending on your risk tolerance.
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Live Burn Tracker - Full Width */}
        <motion.div
          variants={itemVariants}
          style={{ rotate: 0 }}
        >
          <BurnCounter />
        </motion.div>

        {/* Bubblemaps Partner Section */}
        <motion.div variants={itemVariants}>
          <BubblemapsPartner />
        </motion.div>

        {/* Staking Partner Section */}
        <motion.div variants={itemVariants}>
          <StakingPartner />
        </motion.div>
      </motion.div>
    </section>
  );
}
