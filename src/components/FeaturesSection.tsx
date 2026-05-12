'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScanSearch, Zap, PieChart, ShieldCheck, Mailbox, Share2, ArrowRight, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: ScanSearch,
    title: 'Instant AI Stack Audit',
    description:
      'Connect your billing emails or manually list tools. GetPriced maps every subscription, seat count, and tier in seconds.',
    tag: 'Core Feature',
  },
  {
    icon: Zap,
    title: 'Smarter Alternatives',
    description:
      'We surface free tiers, cheaper plans, and open-source swaps — tailored to your team size and actual usage patterns.',
    tag: 'AI-Powered',
  },
  {
    icon: PieChart,
    title: 'Per-Seat Cost Breakdown',
    description:
      'Understand your true cost per engineer. See where budget is concentrated and which tools see zero usage.',
    tag: 'Analytics',
  },
  {
    icon: ShieldCheck,
    title: 'Plan Downgrade Safety',
    description:
      "We don't just suggest cheaper — we verify feature parity so your team doesn't lose capabilities they depend on.",
    tag: 'Risk-Free',
  },
  {
    icon: Mailbox,
    title: 'Monthly Savings Digest',
    description:
      'Get a recurring email digest as AI tool pricing changes. Stay ahead of price hikes before the invoice hits.',
    tag: 'Proactive',
  },
  {
    icon: Share2,
    title: 'Team & Slack Export',
    description:
      'Share your audit report with your CFO or engineering leadership in one click — Slack, PDF, or email ready.',
    tag: 'Collaboration',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="features" className="relative py-32 bg-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#51bc8f]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[#51bc8f] text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" /> Everything you need to cut AI costs
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Built for <span className="text-[#51bc8f]">founders who ship</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Not another dashboard you&apos;ll never open. GetPriced gives you actionable cuts, not just reports.
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
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-[#51bc8f]/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-emerald-900/5"
              >
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-[#51bc8f] transition-all duration-500 group-hover:rotate-6 shadow-sm">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100 group-hover:bg-emerald-50 group-hover:text-[#51bc8f] group-hover:border-emerald-100 transition-colors">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-gray-900 font-black text-xl mb-4 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner (Call to Action) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24"
        >
          <div className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            {/* Ambient background glow inside the dark card */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#51bc8f]/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Average team saves <span className="text-[#51bc8f] underline decoration-[#51bc8f]/30 decoration-8 underline-offset-8">$1,240/year</span>
              </h3>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                Based on a 5-person engineering team using 4–8 AI tools.
              </p>
              <a
                href="#audit-start"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#51bc8f] text-white rounded-2xl font-black text-lg hover:bg-[#3da17a] transition-all hover:scale-[1.02] shadow-lg shadow-[#51bc8f]/20"
              >
                Run Free Audit
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
