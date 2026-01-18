import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa';
import XLogo from './XLogo';

export default function Footer() {
  return (
    <footer className="bg-black text-amber-500 py-12 px-4 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <motion.h3
          className="text-3xl font-black italic tracking-tighter text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          $MCRIB
        </motion.h3>

        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="https://t.me/mcrib_dogechain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Telegram"
          >
            <FaTelegram size={32} />
          </motion.a>
          <motion.a
            href="https://x.com/MCRIB_DOGECHAIN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="X (Twitter)"
          >
            <XLogo size={32} />
          </motion.a>
        </motion.div>

        <motion.p
          className="text-sm text-gray-400 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Not affiliated with any actual fast food corporation. This is a
          meme coin on Dogechain. Price may go up, price may go down, stomach
          may hurt.
        </motion.p>
      </div>
    </footer>
  );
}
