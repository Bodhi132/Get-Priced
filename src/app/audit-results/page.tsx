'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeft,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  BellRing,
  Bot,
  Code,
  Database,
  Wand2
} from 'lucide-react';
import Link from 'next/link';

// Custom CountUp Component using framer-motion
function CountUp({ to, duration = 2 }: { to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [to, duration]);

  return <span ref={nodeRef} />;
}

interface ToolBreakdown {
  tool_name: string;
  current_estimated_monthly_spend: number;
  recommended_action: string;
  estimated_monthly_savings: number;
  reasoning: string;
}

interface AuditData {
  per_tool_breakdown: ToolBreakdown[];
  total_monthly_savings: number;
  total_annual_savings: number;
  strategic_summary: string;
}

export default function AuditResultsPage() {
  const [data, setData] = useState<AuditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = sessionStorage.getItem('lastAuditResult');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (err) {
        console.error('Failed to parse audit results', err);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#51bc8f] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Finalizing analysis...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-400">
            <BellRing className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No results found</h1>
          <p className="text-gray-500 mb-8">Please complete the audit process to see your stack optimization report.</p>
          <Link 
            href="/audit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#51bc8f] text-white rounded-xl font-bold hover:bg-[#3da17a] transition-all"
          >
            Start New Audit
          </Link>
        </div>
      </div>
    );
  }

  const { total_monthly_savings, total_annual_savings, per_tool_breakdown, strategic_summary } = data;
  const isHighSavings = total_monthly_savings >= 500;
  const isOptimal = total_monthly_savings < 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-600 selection:bg-[#51bc8f]/30 selection:text-[#2d7a5a] pb-32">
      {/* Navigation Header */}
      <nav className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <Link href="/audit" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#51bc8f] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">getPriced</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10">
        
        {/* ─── SECTION A: Hero ─── */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 relative"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#51bc8f]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-gray-500 font-semibold tracking-wider uppercase text-sm mb-4">Total Annual Savings Identified</h2>
          <div className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-6 flex justify-center items-baseline gap-2 relative z-10">
            <span className="text-[#51bc8f]">$</span>
            <span className="font-mono text-[#51bc8f]"><CountUp to={total_annual_savings} duration={2.5} /></span>
          </div>
          <p className="text-xl text-gray-500 relative z-10">
            That translates to <span className="text-gray-900 font-mono font-semibold">${total_monthly_savings.toLocaleString()}/mo</span> returning to your runway.
          </p>
        </motion.section>

        {/* ─── SECTION B: The Fractional CFO Summary ─── */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-20"
        >
          <div className="relative bg-indigo-50 border border-indigo-100 rounded-3xl p-8 overflow-hidden shadow-sm group hover:border-indigo-200 transition-colors">
            {/* Inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-indigo-900 font-bold tracking-wide uppercase text-xs">Fractional CFO Summary</h3>
                <p className="text-indigo-500 text-sm font-medium">Powered by AI Analysis</p>
              </div>
            </div>
            <p className="text-xl leading-relaxed text-indigo-950 relative z-10 font-medium">
              "{strategic_summary}"
            </p>
          </div>
        </motion.section>

        {/* ─── SECTION C: Per-Tool Breakdown ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Stack Breakdown</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6"
          >
            {per_tool_breakdown.map((tool) => {
              // Map tool names to appropriate images
              const toolNameLower = tool.tool_name.toLowerCase();
              let iconSrc = '';
              if (toolNameLower.includes('cursor')) iconSrc = '/ai-icons/cursor.png';
              else if (toolNameLower.includes('copilot')) iconSrc = '/ai-icons/co-pilot.png';
              else if (toolNameLower.includes('claude')) iconSrc = '/ai-icons/claude.svg';
              else if (toolNameLower.includes('anthropic')) iconSrc = '/ai-icons/anthropic.svg';
              else if (toolNameLower.includes('chatgpt') || toolNameLower.includes('openai')) iconSrc = '/ai-icons/ChatGPT_logo.svg.png';
              else if (toolNameLower.includes('gemini')) iconSrc = '/ai-icons/google-gemini.png';
              else if (toolNameLower.includes('windsurf')) iconSrc = '/ai-icons/Windsurf-black-symbol.png';

              return (
                <motion.div 
                  key={tool.tool_name}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
                >
                  <div className="flex flex-col gap-6">
                    {/* Top Section: Tool & Reason */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-[#51bc8f]/10 group-hover:border-[#51bc8f]/20 transition-colors">
                          {iconSrc ? (
                            <img src={iconSrc} alt={tool.tool_name} className="w-6 h-6 object-contain" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-[#51bc8f] transition-colors" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-xl">{tool.tool_name}</h4>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
                            Spend: <span className="font-mono text-gray-900">${tool.current_estimated_monthly_spend}/mo</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-[15px]">
                        {tool.reasoning}
                      </p>
                    </div>

                    {/* Bottom Section: Action & Savings */}
                    <div className="flex flex-col items-start text-left border-t border-gray-100 pt-6">
                      <div className="text-xs font-bold text-[#51bc8f] uppercase tracking-widest mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Recommended Action
                      </div>
                      <div className="text-gray-900 font-bold mb-6 text-lg">
                        {tool.recommended_action}
                      </div>
                      
                      {tool.estimated_monthly_savings > 0 ? (
                        <div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Monthly Savings
                          </div>
                          <div className="text-3xl font-black text-[#51bc8f] font-mono">
                            +${tool.estimated_monthly_savings}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Status
                          </div>
                          <div className="text-lg font-bold text-gray-500 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-gray-400" /> Already Optimized
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ─── SECTION D: Conditional CTA ─── */}
        <section>
          <AnimatePresence mode="wait">
            {isHighSavings ? (
              <motion.div 
                key="credex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-3xl p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#51bc8f]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4 text-[#51bc8f]">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-mono font-bold tracking-wider uppercase text-xs">Credex Integration</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Don't leave cash on the table.</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                      We've identified <strong className="text-gray-900 font-mono">${total_monthly_savings}/mo</strong> in immediate waste. Most of these can be resolved instantly via <strong>Credex Startup Credits</strong>. We'll handle the negotiation and paperwork.
                    </p>
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center gap-3 shadow-lg shadow-gray-900/20">
                      Claim Your Credits
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : isOptimal ? (
              <motion.div 
                key="optimal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Highly Optimized Stack</h2>
                <p className="text-gray-500 mb-8 max-w-lg mx-auto font-medium">
                  Your current architecture is operating efficiently. We didn't find any significant waste based on your team size and usage.
                </p>
                <div className="max-w-md mx-auto relative flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <input 
                    type="email" 
                    placeholder="Enter email for future alerts" 
                    className="w-full bg-transparent text-gray-900 px-5 py-3 focus:outline-none font-medium placeholder:text-gray-400"
                  />
                  <button className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors text-sm">
                    Notify Me
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}
