import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SauceHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'TOKENOMICS', href: '#tokenomics' },
    { name: 'ROADMAP', href: '#roadmap' },
    { name: 'CHART', href: '#chart' },
    { name: 'BUY NOW', href: '#cta' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-red-700 border-b-4 border-black shadow-lg h-16 px-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-amber-400 p-1 rounded border-2 border-black rotate-3"
            whileHover={{ rotate: [3, 0, 3], scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="32" height="32" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Buns Top */}
              <path
                d="M20 100 C 20 20, 380 20, 380 100 L 380 140 L 20 140 Z"
                fill="#FBBF24"
                stroke="black"
                strokeWidth="10"
              />
              {/* Seeds */}
              <circle cx="100" cy="70" r="5" fill="#FEF3C7" />
              <circle cx="160" cy="50" r="5" fill="#FEF3C7" />
              <circle cx="250" cy="60" r="5" fill="#FEF3C7" />
              <circle cx="320" cy="80" r="5" fill="#FEF3C7" />
              {/* Meat Patty */}
              <path
                d="M10 140 H 390 V 220 C 390 220, 380 250, 350 250 C 320 250, 320 220, 320 220 C 320 220, 310 250, 280 250 C 250 250, 250 220, 250 220 C 250 220, 240 250, 210 250 C 180 250, 180 220, 180 220 C 180 220, 170 250, 140 250 C 110 250, 110 220, 110 220 C 110 220, 100 250, 70 250 C 40 250, 10 220, 10 220 V 140 Z"
                fill="#7F1D1D"
                stroke="black"
                strokeWidth="10"
              />
              {/* Bun Bottom */}
              <path
                d="M20 230 H 380 V 260 C 380 290, 20 290, 20 260 V 230 Z"
                fill="#FBBF24"
                stroke="black"
                strokeWidth="10"
              />
            </svg>
          </motion.div>
          <span className="text-2xl font-black text-white tracking-tighter italic uppercase text-shadow-sm">
            $MCRIB
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white font-bold hover:text-amber-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.nav
          className="md:hidden bg-red-800 border-t-4 border-black"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white font-bold hover:text-amber-400 transition-colors py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </div>
  );
}
