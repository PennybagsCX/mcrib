import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const UNIT_PX_IMAGE = 'https://mcribpix.dog/Unit-PX.png';

export default function McRibPixPartner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const traits = [
    'Background', 'Buns', 'Patties', 'Sauces',
    'Onions', 'Pickles', 'TopBuns', 'BottomBun'
  ];

  return (
    <motion.div
      ref={ref}
      className="max-w-5xl mx-auto mt-16"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Header Badge */}
      <motion.div
        className="text-center mb-6"
        variants={itemVariants}
      >
        <span className="inline-block bg-purple-600 text-white font-bold px-6 py-2 rounded-full border-4 border-black retro-shadow">
          ⭐ SPECIAL PARTNER ⭐
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 border-b-4 border-black relative overflow-hidden">
          {/* Pixel grid background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)',
            backgroundSize: '8px 8px'
          }}></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter" style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}>
                McRIB Pix
              </h3>
              <p className="text-white font-bold mt-1 text-lg">
                The McRIB is IMMORTAL
              </p>
            </div>
            <motion.a
              href="https://mcribpix.dog/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 font-black px-6 py-3 rounded-lg border-4 border-black retro-shadow hover:bg-amber-400 transition-colors text-lg whitespace-nowrap"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              VISIT SITE →
            </motion.a>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left Column: UNIT-PX Image */}
          <div className="bg-slate-900 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 4px'
            }}></div>

            <motion.img
              src={UNIT_PX_IMAGE}
              alt="UNIT-PX Robot - A pixelated mechanical robot character from McRIB Pix NFT collection"
              className="relative z-10 w-full max-w-md h-auto"
              style={{ imageRendering: 'pixelated' }}
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
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
            />
          </div>

          {/* Right Column: Info Blocks */}
          <div className="p-8 space-y-6">

            {/* Mint Details */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🎨</span>
                10,000 Unique NFTs
              </h4>
              <p className="font-bold text-slate-700 mb-3">
                Mint Cost: <span className="text-red-600">50B $MCRIB + 1 DOGE</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait) => (
                  <span
                    key={trait}
                    className="bg-slate-100 text-slate-700 text-sm font-bold px-3 py-1 rounded-md border-2 border-slate-300"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Eat Mechanic */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🔥</span>
                The "Eat" Mechanic
              </h4>
              <p className="font-bold text-slate-700">
                Burn $MCRIB tokens to evolve your NFT with Fire & Smoke effects.
              </p>
              <p className="text-sm font-bold text-red-600 mt-2">
                Full evolution = 50% of total supply burned!
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🌐</span>
                Multi-Chain Meat
              </h4>
              <p className="font-bold text-slate-700">
                Omni-Vault Protocol enables cross-chain mobility. Lock & sync assets across the blockchain multiverse.
              </p>
            </motion.div>

            {/* Future */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🤖</span>
                3D BattleBots Future
              </h4>
              <p className="font-bold text-slate-700 mb-2">
                From 2D pixels to high-fidelity 3D entities. Your "Eaten" NFTs become playable BattleBots in the metaverse.
              </p>
              <div className="bg-purple-50 border-4 border-black rounded-lg p-4 retro-shadow">
                <p className="font-black text-purple-900 text-lg mb-2">
                  ⛽ MINT FUEL ⛽
                </p>
                <p className="font-bold text-slate-800">
                  <span className="text-purple-700 font-black">3 Eaten McRIB Pix</span> + <span className="text-amber-600 font-black">5 DOGE</span>
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  = 1 Unit-PX (3D BattleBot) forged
                </p>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              className="bg-amber-50 border-4 border-black rounded-lg p-4 retro-shadow"
              variants={itemVariants}
            >
              <p className="text-sm font-bold text-slate-800 italic">
                "Building the plane in the air while learning to fly."
              </p>
              <p className="text-sm font-bold text-slate-700 mt-2">
                Solo dev + AI partners. Community-built, not corporate.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
