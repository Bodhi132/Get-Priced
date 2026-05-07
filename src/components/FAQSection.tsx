'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { HelpCircle, Plus } from 'lucide-react';

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
    a: "We recommend quarterly audits, or whenever you onboard new team members or tools. AI pricing changes frequently — a tool that was good value 6 months ago may be overpriced today. Our monthly digest email alerts you to significant price changes automatically.",
  },
  {
    q: "Is my data safe?",
    a: "We take privacy seriously. Your audit data is used only to generate your report and is not sold or shared. We are GDPR compliant, and all data is encrypted in transit and at rest. You can request deletion at any time.",
  },
  {
    q: "We're a 2-person startup — is this still useful?",
    a: "Even more so. Small teams often pay for tools as individuals rather than teams, missing bulk discounts. GetPriced often finds savings of $50–200/month even for tiny teams — which matters a lot at the bootstrap stage.",
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
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-violet-500/30' : ''
        }`}
    >
      <button
        className="w-full flex items-center justify-between gap-6 text-left group"
        style={{ padding: '32px' }}
        onClick={onToggle}
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
      >
        <span className="text-white font-bold text-base md:text-lg pr-4 group-hover:text-violet-300 transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen
              ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
              : 'border-white/10 text-gray-500 group-hover:border-white/20'
            }`}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p
              className="text-gray-400 text-base leading-relaxed"
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
    <section ref={ref} id="faq" className="centered-section relative py-24">
      {/* BG accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(79,70,229,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="content-wrap--narrow relative z-10 flex flex-col gap-16 md:gap-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 badge-pill rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <HelpCircle className="w-4 h-4 text-violet-400" /> Common Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>
            Answers to your <span className="gradient-text">real questions</span>
          </h2>
          <p className="text-gray-400 text-lg text-center">
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
          className="text-center glass-card rounded-3xl p-10 mt-[-2rem]"
        >
          <p className="text-gray-400 text-base md:text-lg mb-3 font-medium">Still have questions?</p>
          <a
            href="mailto:hello@getpriced.ai"
            className="text-violet-400 hover:text-violet-300 text-base md:text-lg font-bold transition-colors underline underline-offset-4"
          >
            Email us at hello@getpriced.ai →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
