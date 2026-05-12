'use client';
import Link from 'next/link';
import { ArrowRight, Shield, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-gray-100 pt-32 pb-16">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#51bc8f]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 lg:gap-12 mb-24">
          {/* Logo & Vision Block */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
                <Image 
                  src="/gpLogo.png" 
                  alt="getPriced Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-black text-3xl text-gray-900 tracking-tighter">
                getPriced
              </span>
            </Link>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md font-medium">
              Stop overpaying for AI. We help high-performance teams audit their SaaS stack and recover thousands in wasted subscriptions.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 group cursor-default">
                <Shield className="w-4 h-4 text-[#51bc8f]" />
                <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">Privacy First</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 group cursor-default">
                <Globe className="w-4 h-4 text-[#51bc8f]" />
                <span className="text-[10px] uppercase tracking-widest font-black group-hover:text-gray-900 transition-colors">Global DB</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-gray-900 font-black text-xs uppercase tracking-widest">Product</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#features" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Audit Features</a></li>
              <li><a href="#social-proof" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Savings Data</a></li>
              <li><a href="#testimonials" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Founder Stories</a></li>
              <li><a href="#faq" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Common Questions</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-gray-900 font-black text-xs uppercase tracking-widest">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="mailto:hello@getpriced.ai" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> Support</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#51bc8f] transition-colors font-bold text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Final Action */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col gap-6">
              <p className="text-gray-900 font-black text-sm">Ready to optimize?</p>
              <Link href="/audit">
                <button className="w-full bg-[#51bc8f] text-white py-4 rounded-xl font-black text-sm hover:bg-[#3da17a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10">
                  Run Free Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © {year} getPriced • Built for Founders
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-[#51bc8f] animate-pulse" />
              <span className="text-[#51bc8f] text-[10px] font-black tracking-widest uppercase">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
