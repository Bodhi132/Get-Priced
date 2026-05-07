'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] py-16 md:py-24">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[400px] bg-violet-500/10 blur-[120px] pointer-events-none" />

      <div className="content-wrap relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
          {/* Logo & Tagline (Left Side) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9"/>
                  <path d="M8 4L11.5 6V10L8 12L4.5 10V6L8 4Z" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Get<span className="gradient-text">Priced</span>
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed pr-4">
              Stop overpaying for AI. Audit your SaaS stack in minutes and save thousands on overlapping tools.
            </p>
          </div>

          {/* Links (Right Side) */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-base mb-2">Product</h4>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</a>
              <a href="#social-proof" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Savings Data</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Founder Stories</a>
              <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">FAQ</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-base mb-2">Company</h4>
              <a href="mailto:hello@getpriced.ai" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h4 className="text-white font-semibold text-base mb-2">Ready to save?</h4>
              <a href="#cta" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-colors text-sm font-semibold text-white w-fit">
                Run Free Audit
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-medium">
          <p>© {year} GetPriced. All rights reserved.</p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.04]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-gray-400 text-xs tracking-wide">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
