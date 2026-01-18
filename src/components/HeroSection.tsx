import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [sauceLevel, setSauceLevel] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    setSauceLevel((prev) => Math.min(prev + 1, 5));
    setTimeout(() => setIsOrdered(false), 500);
  };

  const scrollToChart = () => {
    document.getElementById('chart')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-32 bg-red-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-polka-dot" style={{ backgroundSize: '24px 24px' }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.div
            className="inline-block bg-amber-400 text-red-900 font-bold px-4 py-1 rounded-full border-2 border-black mb-4 rotate-[-2deg]"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            LIMITED TIME ONLY!
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white italic leading-none mb-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
            >
              THE{' '}
            </motion.span>

            <motion.span
              className="text-amber-400 inline-block"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: [0, -3, 3, -3, 0],
                x: [0, -2, 2, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: {
                  duration: 0.8,
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 200,
                },
                rotate: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                x: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              whileHover={{
                scale: [1, 1.1, 1],
                rotate: [0, -10, 10, -10, 0],
              }}
            >
              $MCRIB
            </motion.span>

            <br />

            <motion.span
              initial={{ opacity: 0, x: -100, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                type: 'spring',
              }}
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
            >
              IS BACK
            </motion.span>

            <motion.div
              className="text-4xl md:text-6xl block mt-2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <span
                className="text-[#7B3FF2] font-black italic"
                style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
              >
                ON DOGECHAIN
              </span>
            </motion.div>
          </h1>

          <motion.div
            className="text-xl text-red-100 font-bold mb-8 max-w-lg mx-auto md:mx-0 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              100% Boneless. 100% Degenerate. Smothered in tangy BBQ yield sauce.
            </p>
            <p>
              Get it before the rug (or the sauce) runs out.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <a
              href="https://chewyswap.dog/swap/?chain=dogechain&inputCurrency=0x7B4328c127B85369D9f82ca0503B000D09CF9180&outputCurrency=0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-amber-400 hover:bg-amber-300 text-red-900 text-2xl font-black py-4 px-10 rounded-xl border-4 border-black retro-shadow-lg transition-all"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                ORDER NOW
              </motion.button>
            </a>
            <motion.button
              onClick={scrollToChart}
              className="bg-red-900 hover:bg-red-800 text-white text-xl font-bold py-4 px-8 rounded-xl border-4 border-black retro-shadow-lg transition-all"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW CHART
            </motion.button>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Dogechain Logo - Top Right */}
          <motion.div
            className="absolute top-0 right-0 z-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <img
              src="/dogechain-logo.png"
              alt="Dogechain"
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </motion.div>

          {/* The Rib SVG */}
          <motion.div
            className="relative w-80 h-80 md:w-[500px] md:h-[500px] z-10"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8, type: 'spring' },
              rotate: { duration: 0.8 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            style={{
              filter: `drop-shadow(0px ${sauceLevel * 10}px 0px rgba(0,0,0,0.3))`,
            }}
          >
            <svg
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Buns Top */}
              <path
                d="M20 100 C 20 20, 380 20, 380 100 L 380 140 L 20 140 Z"
                fill="#FBBF24"
                stroke="black"
                strokeWidth="8"
              />
              {/* Seeds */}
              <circle cx="100" cy="70" r="4" fill="#FEF3C7" />
              <circle cx="160" cy="50" r="4" fill="#FEF3C7" />
              <circle cx="250" cy="60" r="4" fill="#FEF3C7" />
              <circle cx="320" cy="80" r="4" fill="#FEF3C7" />

              {/* Meat Patty (Rib Shape) */}
              <path
                d="M10 140 H 390 V 220 C 390 220, 380 250, 350 250 C 320 250, 320 220, 320 220 C 320 220, 310 250, 280 250 C 250 250, 250 220, 250 220 C 250 220, 240 250, 210 250 C 180 250, 180 220, 180 220 C 180 220, 170 250, 140 250 C 110 250, 110 220, 110 220 C 110 220, 100 250, 70 250 C 40 250, 10 220, 10 220 V 140 Z"
                fill="#7F1D1D"
                stroke="black"
                strokeWidth="8"
              />

              {/* BBQ Sauce Drips */}
              <motion.g
                animate={{
                  scaleY: [1, 0.85, 1],
                }}
                style={{ transformOrigin: '50px 140px' }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M40 140 V 180 C 40 190, 60 190, 60 180 V 140"
                  fill="#991B1B"
                />
              </motion.g>
              <motion.g
                animate={{
                  scaleY: [1, 0.8, 1],
                }}
                style={{ transformOrigin: '130px 140px' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <path
                  d="M120 140 V 200 C 120 210, 140 210, 140 200 V 140"
                  fill="#991B1B"
                />
              </motion.g>
              <motion.g
                animate={{
                  scaleY: [1, 0.9, 1],
                }}
                style={{ transformOrigin: '290px 140px' }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <path
                  d="M280 140 V 170 C 280 180, 300 180, 300 170 V 140"
                  fill="#991B1B"
                />
              </motion.g>

              {/* Bun Bottom */}
              <path
                d="M20 230 H 380 V 260 C 380 290, 20 290, 20 260 V 230 Z"
                fill="#FBBF24"
                stroke="black"
                strokeWidth="8"
              />

              {/* Onions */}
              <rect
                x="80"
                y="145"
                width="40"
                height="10"
                fill="white"
                rx="2"
              />
              <rect
                x="200"
                y="150"
                width="40"
                height="10"
                fill="white"
                rx="2"
              />
              <rect
                x="300"
                y="145"
                width="40"
                height="10"
                fill="white"
                rx="2"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
