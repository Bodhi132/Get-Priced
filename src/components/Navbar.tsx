'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm'
          : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
              <Image 
                src="/gpLogo.png" 
                alt="getPriced Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              getPriced
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-all duration-300 relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#51bc8f] rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        {/* CTA Container */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link href="/audit" className="hidden md:inline-flex">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-black hover:bg-black transition-all hover:scale-[1.02] shadow-lg shadow-gray-900/10 flex items-center gap-2">
              Start Audit
              <ArrowRight className="w-4 h-4 text-[#51bc8f]" />
            </button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex flex-col gap-1.5 w-6 relative z-50">
              <span className={`h-1 rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`h-1 rounded-full bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-1 rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center justify-center gap-10 h-full px-6">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.href}
                  href={link.href}
                  className="text-4xl font-black text-gray-900 hover:text-[#51bc8f] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-sm mt-8"
              >
                <Link href="/audit" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-6 bg-[#51bc8f] text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-[#51bc8f]/20">
                    Start Free Audit
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}