import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import McRibPixPartner from './McRibPixPartner';

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring' },
    },
  };

  const combos = [
    {
      number: 1,
      emoji: '🍔',
      title: 'Combo #1',
      color: 'bg-amber-400',
      pattern: 'bg-red-500 opacity-20',
      items: [
        'Token Launch',
        'Website V1 (You are here)',
        'Doge Shilling Campaign',
        'Sauce Leak (Marketing)',
      ],
    },
    {
      number: 2,
      emoji: '🍟',
      title: 'Combo #2',
      color: 'bg-red-500',
      pattern: 'bg-amber-400 opacity-20',
      items: [
        'CoinGecko Listing',
        'First CEX Drive-Thru',
        'Influencer Mukbangs',
        '10,000 Holders',
      ],
    },
    {
      number: 3,
      emoji: '🚀',
      title: 'Combo #3',
      color: 'bg-slate-800',
      pattern: 'bg-amber-400 opacity-20',
      items: [
        'Global Domination',
        'McRib NFT Collection',
        'Partnership with Ron',
        'Flip ETH Market Cap',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-red-700 relative overflow-hidden" ref={ref}>
      {/* Top zigzag pattern */}
      <div className="absolute top-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZD0iTTAgMTAgTTEwIDAgTDIwIDEwIFoiIGZpbGw9IndoaXRlIiAvPjwvc3ZnPg==')]"></div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-black text-amber-400 mb-16 uppercase"
          style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Value Menu
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {combos.map((combo) => (
            <motion.div
              key={combo.number}
              className="bg-white rounded-xl overflow-hidden border-4 border-black retro-shadow-lg group"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className={`${combo.color} h-32 flex items-center justify-center border-b-4 border-black relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 ${combo.pattern}`}
                  style={{
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                  }}
                ></div>
                <motion.div
                  className="text-6xl relative z-10 text-amber-400"
                  whileHover={{
                    scale: 1.25,
                    rotate: [0, -10, 10, -10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {combo.emoji}
                </motion.div>
              </div>
              <div className="p-8 text-left">
                <h3 className="text-3xl font-black text-red-700 mb-4 uppercase">
                  {combo.title}
                </h3>
                <ul className="space-y-3 font-bold text-slate-800 list-disc list-inside">
                  {combo.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* McRIB Pix Partner Section */}
        <McRibPixPartner />
      </div>
    </section>
  );
}
