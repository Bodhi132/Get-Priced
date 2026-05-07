'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { Mail, ArrowRight, Lock, ShieldCheck, Zap, Users, CheckCircle2 } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="final-cta" className="centered-section relative overflow-hidden" style={{ margin: '96px 0', padding: '64px 0' }}>
      {/* Orb glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, rgba(79,70,229,0.08) 50%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="content-wrap--medium relative z-10">
        {/* Bordered gradient card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(79,70,229,0.4) 50%, rgba(37,99,235,0.4) 100%)',
          }}
        >
          <div
            className="rounded-[23px] px-6 md:px-16 py-20 md:py-28 flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0b14 0%, #05050a 100%)' }}
          >
            {/* Lock / Security badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-gray-300 rounded-full px-5 py-2 text-sm font-semibold mb-10 backdrop-blur-md"
            >
              <Lock className="w-4 h-4 text-violet-400" />
              Secure, free forever, and zero spam
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 text-center tracking-tight"
              style={{ lineHeight: '1.1' }}
            >
              Stop bleeding money
              <br className="hidden md:block" />
              on <span className="gradient-text">AI tools you don&apos;t need.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Join 3,200+ founders who ran a free audit and recovered an average of{' '}
              <span className="text-white font-bold">$1,240/year</span> per team.
            </motion.p>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative flex justify-center w-full max-w-2xl mx-auto"
              style={{ marginTop: '64px', marginBottom: '80px' }}
            >
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>

              <div 
                className="relative flex flex-col sm:flex-row items-center bg-[#0a0b14] border border-white/10 rounded-3xl gap-4 w-full shadow-2xl backdrop-blur-xl"
                style={{ padding: '16px 24px' }}
              >
                <div className="hidden sm:flex pl-2 text-gray-500">
                  <Mail className="w-6 h-6" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  className="flex-1 w-full bg-transparent text-white placeholder:text-gray-500 text-lg py-4 rounded-xl border-0 focus:ring-0 outline-none"
                  style={{ paddingLeft: '8px', paddingRight: '16px' }}
                  id="cta-email-input"
                />
                <button
                  className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 transition-colors rounded-[20px] text-lg font-extrabold whitespace-nowrap flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  style={{ padding: '20px 40px' }}
                  id="cta-audit-btn"
                >
                  Get Free Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>No data sold. Ever.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>60-second audit</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-5 h-5 text-blue-400" />
                <span>3,200+ founders</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                <span>Free forever</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
