'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { Link } from 'lucide-react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

const STATS: Stat[] = [
  {
    value: 847,
    suffix: 'K',
    label: 'Saved This Month',
    sublabel: 'Across all audited startups',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    value: 3200,
    suffix: '+',
    label: 'Startups Audited',
    sublabel: 'Seed to Series B',
    color: 'from-violet-400 to-indigo-500',
  },
  {
    value: 62,
    suffix: '%',
    label: 'Average Savings',
    sublabel: 'On AI tool subscriptions',
    color: 'from-amber-400 to-orange-500',
  },
  {
    value: 60,
    suffix: 's',
    label: 'Time to Results',
    sublabel: 'Instant audit, no setup',
    color: 'from-blue-400 to-cyan-500',
  },
];

const TOOL_COMPARISONS = [
  {
    tool: 'Cursor Pro',
    current: '$40/seat/mo',
    alternative: 'VS Code + Codeium',
    savings: '$30/seat',
    icon: '⚡',
    iconBg: 'from-amber-400 to-orange-500',
  },
  {
    tool: 'ChatGPT Plus',
    current: '$20/mo/person',
    alternative: 'Claude Haiku API',
    savings: '$14/mo',
    icon: '🤖',
    iconBg: 'from-green-400 to-emerald-500',
  },
  {
    tool: 'GitHub Copilot',
    current: '$19/seat/mo',
    alternative: 'Tabnine (Free)',
    savings: '$19/seat',
    icon: '🐙',
    iconBg: 'from-gray-400 to-gray-600',
  },
  {
    tool: 'Midjourney Pro',
    current: '$60/mo',
    alternative: 'DALL-E API + credits',
    savings: '$35/mo',
    icon: '🎨',
    iconBg: 'from-pink-400 to-rose-500',
  },
  {
    tool: 'Perplexity Pro',
    current: '$20/mo',
    alternative: 'Free tier sufficient',
    savings: '$20/mo',
    icon: '🔍',
    iconBg: 'from-teal-400 to-cyan-500',
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="counter-value">
      {current.toLocaleString()}{suffix}
    </span>
  );
}

export default function SocialProofSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: EASE_OUT },
    }),
  };

  return (
    <section ref={ref} id="social-proof" className="centered-section relative py-24 overflow-hidden">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="content-wrap relative z-10 flex flex-col gap-24">
        {/* Section header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 badge-pill rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <span className="text-amber-400">💰</span>
            Real Savings, Real Data
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>
            The numbers don&apos;t lie.
            <br />
            <span className="gradient-text">Your team is overspending.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center">
            We&apos;ve analyzed AI spending from 3,200+ startups. Here&apos;s what we found.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass-card rounded-2xl p-6 text-center group cursor-default transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2 stat-number">
                <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
              </div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Table & Disclaimer Group */}
        <div className="flex flex-col gap-8 w-full">

          {/* Tool comparison table */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass-card rounded-2xl overflow-hidden border border-white/[0.08]"
          >
            {/* Browser bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
              </div>
              <span className="text-xs font-mono text-gray-500 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                getpriced.ai/audit — AI Spend Analysis Report
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pb-2">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-widest pl-8 md:pl-12 pr-6 py-6 whitespace-nowrap">
                      Tool
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-widest px-6 py-6 whitespace-nowrap">
                      What you pay
                    </th>
                    <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-widest px-6 py-6 whitespace-nowrap">
                      Alternative found
                    </th>
                    <th className="text-right text-[11px] font-medium text-gray-500 uppercase tracking-widest pl-6 pr-8 md:pr-12 py-6 whitespace-nowrap">
                      Monthly savings
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {TOOL_COMPARISONS.map((row, i) => (
                    <motion.tr
                      key={row.tool}
                      custom={i + 6}
                      variants={fadeUp}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      className="border-b border-white/[0.04] last:border-none hover:bg-white/[0.02] transition-colors duration-150"
                    >
                      {/* Tool */}
                      <td className="pl-8 md:pl-12 pr-6 py-7">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${row.iconBg} flex items-center justify-center text-lg flex-shrink-0 shadow-sm`}
                          >
                            {row.icon}
                          </div>
                          <span className="text-base font-semibold text-white whitespace-nowrap">{row.tool}</span>
                        </div>
                      </td>

                      {/* Current price */}
                      <td className="px-6 py-7 whitespace-nowrap">
                        <span className="text-base font-medium text-red-400">{row.current}</span>
                      </td>

                      {/* Alternative */}
                      <td className="px-6 py-7 whitespace-nowrap">
                        <span className="text-base text-gray-300">{row.alternative}</span>
                      </td>

                      {/* Savings badge */}
                      <td className="pl-6 pr-8 md:pr-12 py-7 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/20">
                          ↓ {row.savings}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>

                {/* Footer total */}
                <tfoot>
                  <tr className="border-t border-white/[0.06] bg-white/[0.02]">
                    <td colSpan={3} className="pl-8 md:pl-12 pr-6 py-8">
                      <span className="text-base font-semibold text-gray-400 whitespace-nowrap">
                        Total potential savings per month
                      </span>
                    </td>
                    <td className="pl-6 pr-8 md:pr-12 py-8 text-right whitespace-nowrap">
                      <span className="text-3xl font-extrabold text-emerald-400">
                        ↓ $118
                        <span className="text-lg font-bold text-emerald-500/60 ml-1">/mo</span>
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          {/* Bottom CTA nudge */}
          <motion.div
            custom={11}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col items-center gap-4 text-center"
          >
            <p className="text-xs text-gray-600">
              The above is an example audit. Your actual savings may be higher.
            </p>
            <Link
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-semibold hover:-translate-y-0.5 hover:bg-gray-100 transition-all duration-150"
            >
              Run my free audit
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}