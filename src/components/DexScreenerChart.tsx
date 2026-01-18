import { motion } from 'framer-motion';

export default function DexScreenerChart() {
  return (
    <section id="chart" className="py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-black text-center text-white mb-8 uppercase"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textShadow: '4px 4px 0 rgba(234, 179, 8, 1)' }}
        >
          Live Chart
        </motion.h2>

        <motion.div
          className="w-full border-4 border-black rounded-xl overflow-hidden retro-shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            src="https://dexscreener.com/dogechain/0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2?embed=1&theme=dark"
            className="w-full h-[600px]"
            title="$MCRIB DexScreener Chart"
          />
        </motion.div>

        <motion.p
          className="text-center text-gray-400 mt-6 font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Real-time price and trading data powered by DexScreener
        </motion.p>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://chewyswap.dog/swap/?chain=dogechain&inputCurrency=0x7B4328c127B85369D9f82ca0503B000D09CF9180&outputCurrency=0xbdaD927604c5cB78F15b3669a92Fa5A1427d33a2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-red-900 text-2xl font-black py-4 px-10 rounded-xl border-4 border-black retro-shadow-lg transition-all uppercase"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            BUY ON CHEWYSWAP
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
