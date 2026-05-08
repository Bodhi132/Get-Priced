'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { ScanSearch, Zap, PieChart, ShieldCheck, Mailbox, Share2 } from 'lucide-react';

const FEATURES = [
  {
    icon: ScanSearch,
    iconGrad: 'from-violet-500 to-purple-600',
    title: 'Instant AI Stack Audit',
    description:
      'Connect your billing emails or manually list tools. GetPriced maps every subscription, seat count, and tier in seconds.',
    tag: 'Core Feature',
    tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Zap,
    iconGrad: 'from-amber-400 to-orange-500',
    title: 'Smarter Alternatives',
    description:
      'We surface free tiers, cheaper plans, and open-source swaps — tailored to your team size and actual usage patterns.',
    tag: 'AI-Powered',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: PieChart,
    iconGrad: 'from-blue-400 to-cyan-500',
    title: 'Per-Seat Cost Breakdown',
    description:
      'Understand your true cost per engineer. See where budget is concentrated and which tools see zero usage.',
    tag: 'Analytics',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: ShieldCheck,
    iconGrad: 'from-emerald-400 to-teal-500',
    title: 'Plan Downgrade Safety',
    description:
      "We don't just suggest cheaper — we verify feature parity so your team doesn't lose capabilities they depend on.",
    tag: 'Risk-Free',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Mailbox,
    iconGrad: 'from-pink-400 to-rose-500',
    title: 'Monthly Savings Digest',
    description:
      'Get a recurring email digest as AI tool pricing changes. Stay ahead of price hikes before the invoice hits.',
    tag: 'Proactive',
    tagColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Share2,
    iconGrad: 'from-indigo-400 to-violet-500',
    title: 'Team & Slack Export',
    description:
      'Share your audit report with your CFO or engineering leadership in one click — Slack, PDF, or email ready.',
    tag: 'Collaboration',
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="features" className="centered-section relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(79,70,229,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="content-wrap relative z-10 flex flex-col gap-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 badge-pill rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <span>✨</span> Everything you need to cut AI costs
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>
            Built for <span className="gradient-text">founders who ship</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto text-center">
            Not another dashboard you&apos;ll never open. GetPriced gives you actionable cuts, not reports.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_OUT }}
                className="glass-card rounded-3xl group hover:border-violet-500/30 transition-all duration-300 cursor-default flex flex-col items-start text-left shadow-xl shadow-black/20"
                style={{ padding: '40px' }}
              >
                <div className="flex items-center justify-between w-full mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.iconGrad} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-gray-900 drop-shadow-md" strokeWidth={2.5} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border ${f.tagColor}`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-gray-900 font-extrabold text-xl mb-3 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="rounded-3xl p-px"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(79,70,229,0.3), rgba(37,99,235,0.3))' }}
        >
          <div className="rounded-3xl bg-[#0e0f1a] p-10 md:p-14 flex flex-col items-center justify-center gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ letterSpacing: '-0.02em' }}>
                Average team saves <span className="gradient-text">$1,240/year</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Based on a 5-person engineering team using 4–8 AI tools.
              </p>
            </div>
            <a
              href="#cta"
              className="btn-primary px-10 py-4 rounded-xl font-bold text-gray-900 text-base whitespace-nowrap shadow-lg shadow-violet-500/20 hover:-translate-y-1 transition-transform"
            >
              Get My Number →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
