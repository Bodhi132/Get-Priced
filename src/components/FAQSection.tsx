'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { HelpCircle, Plus, Sparkles, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: "Is GetPriced actually free?",
    a: "Yes, 100% free. No credit card, no trial period, no catch. You get a full AI spend audit, alternative recommendations, and a savings report — completely free. We may offer a pro tier in the future for team management features, but the audit will always be free.",
  },
  {
    q: "What AI tools does GetPriced analyze?",
    a: "We cover 50+ AI tools including Cursor, Claude, ChatGPT, GitHub Copilot, Midjourney, Perplexity, Jasper, Copy.ai, Notion AI, Codeium, Tabnine, and many more. We update our database monthly as pricing changes.",
  },
  {
    q: "Do I need to connect my billing accounts?",
    a: "No. You can simply list your tools, team size, and plans manually — it takes less than 2 minutes. For a deeper audit, you can optionally forward billing emails to our secure parser, but this is never required.",
  },
  {
    q: "How do you determine 'alternatives'?",
    a: "Our AI compares tools on feature parity, pricing, team size fit, and integration compatibility. We only surface alternatives that match or exceed your current capabilities — never suggest a downgrade just to save money at the cost of productivity.",
  },
  {
    q: "Can I share the report with my team or CFO?",
    a: "Absolutely. Every audit generates a shareable PDF and a Slack-ready summary. One click to export, no login required for the recipient. Perfect for getting budget approval from leadership.",
  },
  {
    q: "How often should I run an audit?",
    a: "We recommend quarterly audits, or whenever you onboard new team members or tools. AI pricing changes frequently — a tool that was good value 6 months ago may be overpriced today.",
  },
  {
    q: "Is my data safe?",
    a: "We take privacy seriously. Your audit data is used only to generate your report and is not sold or shared. We are GDPR compliant, and all data is encrypted in transit and at rest.",
  },
  {
    q: "We're a 2-person startup — is this still useful?",
    a: "Even more so. Small teams often pay for tools as individuals rather than teams, missing bulk discounts. GetPriced often finds savings of $50–200/month even for tiny teams.",
  },
];

function FAQItem({ q, a, index, isOpen, onToggle }: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`bg-white border rounded-[1.5rem] overflow-hidden transition-all duration-500 ${isOpen ? 'border-[#51bc8f]/50 shadow-xl shadow-emerald-900/5' : 'border-gray-100 shadow-sm'
        }`}
    >
      <button
        className="w-full flex items-center justify-between gap-6 text-left group"
        style={{ padding: '24px 32px' }}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-bold text-lg transition-colors duration-500 ${isOpen ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
          {q}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-500 ${isOpen
              ? 'bg-[#51bc8f] border-[#51bc8f] text-white rotate-45'
              : 'border-gray-100 text-gray-400 group-hover:border-[#51bc8f] group-hover:text-[#51bc8f]'
            }`}
        >
          <Plus className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-gray-500 text-base leading-relaxed font-medium"
              style={{ padding: '0 32px 32px 32px' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="faq" className="relative py-32 bg-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col gap-16 md:gap-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[#51bc8f] text-xs font-bold tracking-widest uppercase mb-6">
            <HelpCircle className="w-4 h-4" /> Common Questions
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Answers to your <span className="text-[#51bc8f]">real questions</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
            Still skeptical? Good. We&apos;ll prove it.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 md:p-12 text-center shadow-sm"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <Sparkles className="w-6 h-6 text-[#51bc8f]" />
            </div>
            <div>
              <p className="text-gray-900 text-xl font-black mb-2 tracking-tight">Still have questions?</p>
              <p className="text-gray-500 font-medium mb-6">We're here to help you optimize your runway.</p>
              <a
                href="mailto:hello@getpriced.ai"
                className="inline-flex items-center gap-2 text-[#51bc8f] hover:text-[#3da17a] font-black text-lg transition-all group"
              >
                Email us at hello@getpriced.ai
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
