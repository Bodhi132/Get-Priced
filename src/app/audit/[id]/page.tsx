import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  TrendingDown, 
  ShieldCheck, 
  BarChart3,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuditData {
  id: string;
  total_monthly_spend: string;
  total_monthly_savings: string;
  strategic_summary: string;
  per_tool_breakdown: Array<{
    tool_name: string;
    plan: string;
    users_count: number;
    estimated_monthly_savings: string;
    recommended_action: string;
  }>;
}

async function getAuditData(id: string): Promise<AuditData | null> {
  try {
    // Using 127.0.0.1 to avoid IPv6 resolution issues on some local setups
    const res = await fetch(`http://127.0.0.1:5000/api/audit/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getAuditData(id);
  
  if (!data) {
    return { title: 'Audit Not Found | GetPriced' };
  }

  const savings = parseFloat(data.total_monthly_savings).toLocaleString();
  
  return {
    title: `Save $${savings}/mo on AI Spend | GetPriced Audit`,
    description: `We just identified $${savings}/mo in potential savings for this AI stack. Run your own audit to see how much you can save.`,
    openGraph: {
      title: `🔥 $${savings}/mo Savings Identified`,
      description: `This stack is wasting $${savings} every single month. See the full breakdown and claim your own savings.`,
      images: ['/og-audit.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `🚀 Identified $${savings}/mo in AI Waste`,
      description: `Stop overpaying for AI. See how this stack was optimized and run your own audit for free.`,
    }
  };
}

export default async function PublicAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getAuditData(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Audit Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">This audit report may have expired or the link is incorrect.</p>
        <Link href="/" className="px-8 py-4 bg-[#51bc8f] text-white rounded-2xl font-black">
          Run New Audit
        </Link>
      </div>
    );
  }

  const monthlySavings = parseFloat(data.total_monthly_savings);
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ─── NAVIGATION ─── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#51bc8f] rounded-xl flex items-center justify-center shadow-lg shadow-[#51bc8f]/20 group-hover:rotate-6 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">GetPriced</span>
          </Link>
          <Link href="/" className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
            Run Free Audit
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* ─── HERO: PUBLIC SAVINGS ─── */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[#51bc8f] text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" /> Public Audit Results
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Identified <span className="text-[#51bc8f] underline decoration-emerald-100 decoration-8 underline-offset-8">${monthlySavings.toLocaleString()}</span> in monthly waste.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            This audit analyzes a specific AI stack and identifies immediate optimizations, 
            unused seats, and tiered credit opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-left">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Monthly Waste</p>
              <h2 className="text-4xl font-black text-red-500">${monthlySavings.toLocaleString()}</h2>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-left">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Yearly Savings</p>
              <h2 className="text-4xl font-black text-[#51bc8f]">${yearlySavings.toLocaleString()}</h2>
            </div>
          </div>
        </section>

        {/* ─── VIRAL CTA ─── */}
        <section className="mb-16">
          <Link href="/" className="block group">
            <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#51bc8f]/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-black text-white mb-6">How much is your team wasting?</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                  Most AI-first teams are overpaying by 32% due to overlapping subscriptions and ghost seats.
                </p>
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#51bc8f] text-white rounded-2xl font-black hover:bg-[#3da17a] transition-all hover:scale-[1.02]">
                  Run Your Own Audit
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ─── ANALYSIS BREAKDOWN ─── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-gray-900">Stack Analysis</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
              <BarChart3 className="w-4 h-4" /> {data.per_tool_breakdown.length} Tools Audited
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Tool</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Potential Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.per_tool_breakdown.map((tool, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-8">
                      <div className="font-black text-gray-900">{tool.tool_name}</div>
                      <div className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tighter">{tool.plan} Plan</div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-black">
                        {tool.recommended_action}
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="text-lg font-black text-[#51bc8f]">
                        +${parseFloat(tool.estimated_monthly_savings).toLocaleString()}
                        <span className="text-[10px] text-gray-400 ml-1">/mo</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── EXECUTIVE SUMMARY (MASKED) ─── */}
        <section className="mt-16 bg-white rounded-[2.5rem] p-10 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-gray-50">
            <TrendingDown className="w-32 h-32" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Audit Insights</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium italic">
              "{data.strategic_summary}"
            </p>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="mt-20 pt-10 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-sm font-medium">
            &copy; 2026 GetPriced. Secure SaaS Spend Management for Modern Teams.
          </p>
        </footer>

      </main>
    </div>
  );
}
