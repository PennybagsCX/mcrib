import { motion } from 'framer-motion';

export default function MarqueeBanner() {
  return (
    <div className="bg-amber-400 border-y-4 border-black py-3 overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block text-2xl font-black uppercase tracking-widest text-red-900"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        ★ 100% PORK-FREE FINANCE ★ NO VEGANS ALLOWED ★ THE SAUCE IS ON CHAIN ★
        DOGE APPROVED ★ $MCRIB TO THE MOON ★ SATURATED FAT WALLET ★ ★ 100%
        PORK-FREE FINANCE ★ NO VEGANS ALLOWED ★ THE SAUCE IS ON CHAIN ★ DOGE
        APPROVED ★ $MCRIB TO THE MOON ★ SATURATED FAT WALLET ★
      </motion.div>
    </div>
  );
}
