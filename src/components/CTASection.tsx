import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const contractAddress = '0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section
      id="cta"
      className="py-24 bg-amber-400 flex flex-col items-center justify-center text-center px-4 border-t-4 border-black"
      ref={ref}
    >
      <motion.div
        className="max-w-3xl bg-white p-8 md:p-12 rounded-3xl border-4 border-black retro-shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-black text-red-700 mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}
        >
          Hungry for Gains?
        </motion.h2>
        <motion.p
          className="text-xl font-bold mb-8 text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          The McRib is fleeting. It comes, it goes, it leaves a stain on your
          shirt. Don't miss the window.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            readOnly
            value={contractAddress}
            className="bg-slate-100 border-2 border-slate-300 px-4 py-3 rounded-lg font-mono text-center w-full md:w-auto text-slate-500 select-all cursor-pointer"
            onClick={handleCopy}
          />
          <motion.button
            onClick={handleCopy}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg border-2 border-black retro-shadow transition-all uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, y: 2 }}
            animate={copied ? { backgroundColor: '#16a34a' } : {}}
          >
            {copied ? 'Copied!' : 'Copy Address'}
          </motion.button>
        </motion.div>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center w-full mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://chewyswap.dog/swap/?chain=dogechain&inputCurrency=0x7B4328c127B85369D9f82ca0503B000D09CF9180&outputCurrency=0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-red-900 text-xl font-black py-3 px-8 rounded-lg border-2 border-black retro-shadow transition-all uppercase w-full md:w-auto text-center"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            BUY ON CHEWYSWAP
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
