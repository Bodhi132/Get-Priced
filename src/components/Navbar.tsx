'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { EASE_OUT } from '@/lib/easing';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Savings Proof', href: '#social-proof' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
          ? 'bg-[rgba(8,9,13,0.85)] backdrop-blur-xl border-b border-black/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo Container - Takes up equal space on the left */}
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center glow-purple shadow-md transition-transform duration-300 group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="#111827" fillOpacity="0.9" />
                <path d="M8 4L11.5 6V10L8 12L4.5 10V6L8 4Z" fill="#111827" fillOpacity="0.4" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Get<span className="gradient-text">Priced</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav - Forced to the center */}
        <nav className="hidden md:flex items-center justify-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] rounded-full bg-violet-400 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        {/* CTA Container - Takes up equal space on the right */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a
            href="#cta"
            className="hidden md:inline-flex btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            Audit My AI Spend &rarr;
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col gap-1.5 w-6 relative z-50">
              <span className={`h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`h-[2px] rounded-full bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-black/10 overflow-hidden"
          >
            <nav className="flex flex-col gap-6 px-6 pt-8 pb-12 h-full">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4 pt-6 border-t border-black/10"
              >
                <a
                  href="#cta"
                  className="btn-primary block w-full py-4 rounded-xl text-base font-semibold text-white text-center shadow-lg shadow-violet-500/20"
                  onClick={() => setMenuOpen(false)}
                >
                  Audit My AI Spend &rarr;
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}