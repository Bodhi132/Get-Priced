'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquareQuote, Star, ArrowRight, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "GetPriced found we had 6 unused Midjourney seats paying $60/mo each. That's $360/mo straight to the bin. Cancelled in 5 minutes, saved $4,320/year. Wild.",
    name: 'Arjun Mehta',
    title: 'Co-founder & CTO',
    company: 'Reflow AI',
    stage: 'Series A · 28 engineers',
    avatar: 'AM',
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
    saved: '$6,480/yr',
    tools: ['GitHub Copilot', 'Claude Pro', 'Perplexity'],
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#51bc8f] text-[#51bc8f]" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="testimonials" className="relative py-32 bg-[#f8f9fb] overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[800px] h-[500px] bg-[#51bc8f]/5 blur-[120px] rounded-full"
        />
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
            <MessageSquareQuote className="w-4 h-4" /> Founder Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Real savings from <span className="text-[#51bc8f]">real founders</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Every testimonial below represents a real audit. Join thousands of teams cutting waste today.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 group"
            >
              <StarRating count={t.stars} />

              <blockquote className="text-gray-900 text-lg leading-relaxed my-8 flex-1 font-medium italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-2 mb-8">
                {t.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-gray-50 text-gray-400 border border-gray-100 group-hover:bg-emerald-50 group-hover:text-[#51bc8f] group-hover:border-emerald-100 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-8 w-full" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-sm font-black text-[#51bc8f]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-gray-900 font-black text-sm">{t.name}</div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.company}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#51bc8f] font-black text-sm">{t.saved}</div>
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Saved</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24"
        >
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-emerald-900/5">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex-1 text-center lg:text-left relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Your story could be next.
              </h3>
              <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Join <span className="text-gray-900 font-black">3,200+ founders</span> who discovered they were overpaying for AI tools. Run your audit in 2 minutes.
              </p>
            </div>
            
            <div className="flex-shrink-0 relative z-10">
              <a
                href="#audit-start"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all hover:scale-[1.02] shadow-xl shadow-gray-900/10"
              >
                Start Free Audit
                <ArrowRight className="w-5 h-5 text-[#51bc8f]" />
              </a>
              
              <div className="mt-6 flex items-center justify-center lg:justify-end gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#51bc8f]" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">
                    +3k
                  </div>
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Join the cohort</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
