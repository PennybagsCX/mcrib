import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BubblemapsPartner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="max-w-5xl mx-auto mt-16"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Header Badge */}
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <span className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold px-6 py-2 rounded-full border-4 border-black retro-shadow">
          🔍 TOKEN ANALYTICS 🔍
        </span>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="bg-white rounded-xl overflow-hidden border-4 border-black retro-shadow-lg"
        variants={itemVariants}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Title Section */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 p-6 border-b-4 border-black relative overflow-hidden">
          {/* Pixel grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)',
              backgroundSize: '8px 8px'
            }}
          ></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter" style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}>
                BUBBLEMAPS
              </h3>
              <p className="text-white font-bold mt-1 text-lg">
                Wallet Distribution Intelligence
              </p>
            </div>
            <motion.a
              href="https://www.dogechain-bubblemaps.xyz/?token=0xbdad927604c5cb78f15b3669a92fa5a1427d33a2&type=TOKEN&view=analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-teal-600 font-black px-6 py-3 rounded-lg border-4 border-black retro-shadow hover:bg-amber-400 transition-colors text-lg whitespace-nowrap"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE TOKEN →
            </motion.a>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column: Bubblemap Visualization */}
          <div className="bg-slate-900 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 4px'
            }}></div>

            <motion.img
              src="/bubblemap-actual.png"
              alt="$MCRIB Token Bubblemap - Live wallet distribution visualization from Dogechain BubbleMaps showing actual holder clustering and concentration patterns"
              className="relative z-10 w-full max-w-md h-auto"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            />
          </div>

          {/* Right Column: Info Blocks */}
          <div className="p-8 space-y-6">
            {/* Block 1: Wallet Distribution */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🫧</span>
                Visual Wallet Clustering
              </h4>
              <p className="font-bold text-slate-700 mb-3">
                Interactive bubble map shows token distribution across top wallets.
              </p>
              <ul className="space-y-2 text-sm font-bold text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>Identify whale wallets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>Spot centralized holding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>Track holder movements</span>
                </li>
              </ul>
            </motion.div>

            {/* Block 2: Transparency */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🔍</span>
                Full Transparency
              </h4>
              <p className="font-bold text-slate-700 mb-3">
                Every transaction visible. Every wallet traceable.
              </p>
              <ul className="space-y-2 text-sm font-bold text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>100% fair launch verified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>Zero team allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>Complete on-chain audit trail</span>
                </li>
              </ul>
            </motion.div>

            {/* Block 3: Live Tracking */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>⚡</span>
                Real-Time Analytics
              </h4>
              <p className="font-bold text-slate-700">
                Monitor token flow and wallet movements as they happen on-chain.
              </p>
            </motion.div>

            {/* Block 4: Partnership Benefits */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🤝</span>
                Holder Benefits
              </h4>
              <p className="font-bold text-slate-700">
                Professional-grade analytics tools for $MCRIB holders.
              </p>
              <div className="mt-3 bg-teal-50 border-4 border-black rounded-lg p-4 retro-shadow">
                <p className="font-black text-teal-900 text-sm">
                  Enhanced trust and credibility
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
