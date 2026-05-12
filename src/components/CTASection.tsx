'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Lock, ShieldCheck, Zap, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="final-cta" className="relative py-32 px-6 overflow-hidden bg-white">
      {/* Ambient background glows for depth without a container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#51bc8f]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[#51bc8f] text-xs font-bold tracking-widest uppercase mb-10"
        >
          <Lock className="w-3.5 h-3.5" />
          Secure, free forever, and zero spam
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]"
        >
          Stop bleeding money on <span className="text-[#51bc8f]">AI tools.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
        >
          Join 3,200+ founders who ran a free audit and recovered an average of{' '}
          <span className="text-gray-900 font-black">$1,240/year</span> per team.
        </motion.p>

        {/* Single Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center w-full mb-20"
        >
          <Link href="/audit">
            <button className="px-12 py-6 bg-[#51bc8f] text-white rounded-[1.5rem] font-black text-xl hover:bg-[#3da17a] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-[#51bc8f]/30">
              Run Free Audit
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6"
        >
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <ShieldCheck className="w-4 h-4 text-[#51bc8f]" />
            <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">No data sold</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <Zap className="w-4 h-4 text-[#51bc8f]" />
            <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">60s Audit</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <Users className="w-4 h-4 text-[#51bc8f]" />
            <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">3,200+ founders</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 group cursor-default">
            <Sparkles className="w-4 h-4 text-[#51bc8f]" />
            <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">Free Forever</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
