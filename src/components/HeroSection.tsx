'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { Mail, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Users } from 'lucide-react';

const TOOLS = ['Cursor', 'Claude', 'ChatGPT', 'GitHub Copilot', 'Midjourney', 'Perplexity'];

function RotatingWords() {
  const [index, setIndex] = useState(0);

  // Auto-cycle
  useState(() => {
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % TOOLS.length);
    }, 2400);
    return () => clearInterval(iv);
  });

  return (
    <span className="relative inline-block overflow-hidden h-[1.15em] align-bottom w-64 md:w-96">
      <motion.span
        key={index}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="absolute left-0 gradient-text font-extrabold"
      >
        {TOOLS[index]}
      </motion.span>
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(springX, [0, 1], ['-5%', '5%']);
  const bgY = useTransform(springY, [0, 1], ['-5%', '5%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col min-h-[calc(100vh-80px)] pt-32 pb-20 items-center overflow-hidden grid-bg"
      id="hero"
    >
      {/* Animated background glow */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute"
          style={{
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.28) 0%, rgba(79,70,229,0.12) 45%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '15%',
            left: '15%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '30%',
            right: '10%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.10) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Floating AI Tool Cost Cards */}
      <motion.div
        className="absolute left-[5%] top-[22%] hidden xl:block float-animation"
        style={{ animationDelay: '0s' }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="bg-[#0a0b14]/60 backdrop-blur-xl rounded-3xl p-5 w-56 shadow-2xl shadow-black/50 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-orange-500/20">C</div>
            <span className="text-sm font-medium text-gray-200">Cursor Pro</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight mb-1">$40<span className="text-sm text-gray-500 font-normal ml-1">/mo</span></div>
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="inline-flex items-center text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/10">
              ▲ 127% overpriced
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[5%] top-[28%] hidden xl:block float-animation"
        style={{ animationDelay: '2s' }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="bg-[#0a0b14]/60 backdrop-blur-xl rounded-3xl p-5 w-60 shadow-2xl shadow-black/50 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20">C</div>
            <span className="text-sm font-medium text-gray-200">Claude Team</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight mb-1">$90</div>
          <div className="text-sm text-gray-500 mb-4">/mo · 3 seats</div>
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/10">
              💡 Save $34/mo
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[7%] bottom-[25%] hidden xl:block float-animation"
        style={{ animationDelay: '1s' }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="bg-[#0a0b14]/60 backdrop-blur-xl rounded-3xl p-6 w-64 shadow-2xl shadow-black/50 border border-white/10">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-3">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Total AI Spend
          </div>
          <div className="text-4xl font-extrabold text-white stat-number tracking-tight mb-1">$847</div>
          <div className="text-sm text-gray-500 mb-5">/month · 12 tools</div>
          <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-violet-400">68% reducible</span>
            <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Waste</span>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="content-wrap--medium relative z-10 text-center pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-gray-300 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          Free AI Spend Audit · No credit card required
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          className="hero-headline text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8"
          style={{ letterSpacing: '-0.02em' }}
        >
          You&apos;re probably{' '}
          <span className="relative inline-block">
            <span className="gradient-text">overpaying</span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </span>{' '}
          for <RotatingWords />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          GetPriced audits your team&apos;s AI tool subscriptions in 60 seconds.
          We pinpoint waste, surface cheaper alternatives, and show you exactly
          how much you can save — <span className="text-white font-bold">for free</span>.
        </motion.p>

        {/* TOP SPACER (Adjust this height to push the CTA down) */}
        <div style={{ height: '80px' }} className="w-full" aria-hidden="true"></div>

        {/* CTA Block */}
        <motion.div
          id="cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
          className="relative w-full mx-auto group flex justify-center"
          style={{ maxWidth: '680px' }}
        >
          {/* Animated glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>

          {/* Container: rounded-full to ensure capsule shape */}
          <div 
            className="relative flex items-center bg-[#0a0b14]/90 border border-white/10 rounded-full gap-3 w-full shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20"
            style={{ padding: '12px 12px 12px 32px' }}
          >

            {/* Mail Icon Wrapper */}
            <div className="text-gray-500 group-focus-within:text-violet-400 transition-colors duration-300 flex-shrink-0 flex items-center">
              <Mail strokeWidth={2} className="w-7 h-7" />
            </div>

            {/* Input */}
            <input
              type="email"
              placeholder="Enter your work email..."
              className="flex-1 bg-transparent text-white placeholder:text-gray-500 text-lg border-0 focus:ring-0 outline-none w-full"
              style={{ padding: '16px 12px' }}
            />

            {/* Button */}
            <button 
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-full text-lg font-extrabold whitespace-nowrap flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] group/btn"
              style={{ padding: '20px 40px' }}
            >
              <Sparkles className="w-6 h-6 text-violet-600" />
              Get Free Audit
              <ArrowRight strokeWidth={2.5} className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* BOTTOM SPACER (Adjust this height to push the trust signals down) */}
        <div style={{ height: '100px' }} className="w-full" aria-hidden="true"></div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold"
        >
          <span className="flex items-center gap-2 text-gray-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            No credit card
          </span>
          <span className="flex items-center gap-2 text-gray-400">
            <Zap className="w-5 h-5 text-amber-400" />
            Results in 60 seconds
          </span>
          <span className="flex items-center gap-2 text-gray-400">
            <CheckCircle2 className="w-5 h-5 text-violet-400" />
            GDPR compliant
          </span>
          <span className="flex items-center gap-2 text-gray-400">
            <Users className="w-5 h-5 text-blue-400" />
            3,200+ startups audited
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-gray-600">Scroll to see your savings</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-4 h-6 rounded-full border border-gray-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}