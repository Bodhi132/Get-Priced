'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { EASE_OUT } from '@/lib/easing';
import { MessageSquareQuote, Star, ArrowRight, Wand2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "GetPriced found we had 6 unused Midjourney seats paying $60/mo each. That's $360/mo straight to the bin. Cancelled in 5 minutes, saved $4,320/year. Wild.",
    name: 'Arjun Mehta',
    title: 'Co-founder & CTO',
    company: 'Reflow AI',
    stage: 'Series A · 28 engineers',
    avatar: 'AM',
    avatarGrad: 'from-violet-500 to-purple-600',
    saved: '$4,320/yr',
    tools: ['Midjourney', 'Cursor'],
    stars: 5,
  },
  {
    quote:
      "We were on ChatGPT Plus for every developer. GetPriced showed us we could switch to the API with a $50 credit ceiling and cut costs by 70%. Game changer for our burn rate.",
    name: 'Priya Nair',
    title: 'Founder & CEO',
    company: 'LayerKit',
    stage: 'Seed · 8 engineers',
    avatar: 'PN',
    avatarGrad: 'from-pink-500 to-rose-500',
    saved: '$1,680/yr',
    tools: ['ChatGPT Plus', 'GitHub Copilot'],
    stars: 5,
  },
  {
    quote:
      "I thought our AI stack was optimized. GetPriced disagreed — and showed receipts. We dropped 3 tools, downgraded 2 plans, and recovered $890/month without losing any capability.",
    name: 'Marcus Webb',
    title: 'Engineering Manager',
    company: 'Dispatch Cloud',
    stage: 'Series B · 55 engineers',
    avatar: 'MW',
    avatarGrad: 'from-blue-500 to-cyan-500',
    saved: '$10,680/yr',
    tools: ['Perplexity Pro', 'Claude Pro', 'Jasper'],
    stars: 5,
  },
  {
    quote:
      "The comparison table is insane. We saw side-by-side alternatives with feature parity and exact pricing. Our CFO loved the export — approved the changes same day.",
    name: 'Sofia Russo',
    title: 'Head of Product',
    company: 'Vanta Ops',
    stage: 'Seed · 12 engineers',
    avatar: 'SR',
    avatarGrad: 'from-amber-400 to-orange-500',
    saved: '$2,040/yr',
    tools: ['Notion AI', 'Cursor Pro'],
    stars: 5,
  },
  {
    quote:
      "5 minutes, free, no login with credit card. Audit showed we had 3 overlapping AI writing tools. Cut two of them the same afternoon. This tool should be mandatory for every engineering team.",
    name: 'Tomás García',
    title: 'Solo Founder',
    company: 'Skiper.dev',
    stage: 'Bootstrapped · 2 engineers',
    avatar: 'TG',
    avatarGrad: 'from-emerald-400 to-teal-500',
    saved: '$720/yr',
    tools: ['Jasper', 'Copy.ai'],
    stars: 5,
  },
  {
    quote:
      "GetPriced is the first tool that made me genuinely rethink my SaaS stack. The ROI calculator at the end sealed it — I shared the report in our team Slack and had buy-in in an hour.",
    name: 'Léa Fontaine',
    title: 'VP Engineering',
    company: 'Nimbus Data',
    stage: 'Series A · 34 engineers',
    avatar: 'LF',
    avatarGrad: 'from-indigo-400 to-violet-500',
    saved: '$6,480/yr',
    tools: ['GitHub Copilot', 'Claude Pro', 'Perplexity'],
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section ref={ref} id="testimonials" className="centered-section relative py-24 overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="content-wrap relative z-10 flex flex-col gap-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 badge-pill rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <MessageSquareQuote className="w-4 h-4 text-violet-400" /> Founder Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>
            Real savings from{' '}
            <span className="gradient-text">real founders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto text-center">
            Every testimonial below represents a real audit. Names and companies are from our beta cohort.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6, ease: EASE_OUT }}
              className="glass-card rounded-3xl group hover:border-violet-500/30 transition-all duration-300 cursor-default flex flex-col shadow-xl shadow-black/20"
              style={{ padding: '40px' }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <blockquote className="text-white text-base leading-relaxed my-6 flex-1 font-medium">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Tools mentioned */}
              <div className="flex flex-wrap gap-2 mb-6">
                {t.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-semibold text-gray-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.08] mb-6 w-full" />

              {/* Author */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-sm font-bold text-white shadow-md`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-base font-bold">{t.name}</div>
                    <div className="text-gray-400 text-xs font-medium mt-0.5">{t.title} · {t.company}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-base font-extrabold">{t.saved}</div>
                  <div className="text-gray-500 text-xs font-medium mt-0.5">{t.stage}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder CTA for more testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-[1px]"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(37,99,235,0.2))' }}
        >
          {/* Inner Glow */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.4) 0%, transparent 70%)' }}
          />
          
          <div 
            className="relative bg-[#0a0b14]/95 backdrop-blur-2xl rounded-[23px] flex flex-col lg:flex-row items-center justify-between gap-10"
            style={{ padding: '48px 56px' }}
          >
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Your story could be next.
              </h3>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Run your free audit and join <span className="text-white font-semibold">3,200+ founders</span> who discovered they were overpaying for AI tools.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-5">
              <a
                href="#cta"
                className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white text-lg hover:-translate-y-1 transition-transform shadow-xl shadow-violet-500/25"
              >
                Start My Free Audit <ArrowRight className="w-5 h-5" />
              </a>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 border-2 border-[#0a0b14]" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-[#0a0b14]" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-[#0a0b14]" />
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0a0b14] flex items-center justify-center text-[10px] font-bold text-white backdrop-blur-md">
                    +3k
                  </div>
                </div>
                <span className="text-gray-500 text-sm font-medium">Join the beta</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
