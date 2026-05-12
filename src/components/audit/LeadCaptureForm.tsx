'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Building2,
  UserCircle2,
  Users2,
  CalendarDays,
  Sparkles
} from 'lucide-react';

interface LeadCaptureFormProps {
  totalMonthlySavings: number;
}

export default function LeadCaptureForm({ totalMonthlySavings }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    role: '',
    teamSize: '',
    honeypot: '' // Anti-spam field
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isHighSavings = totalMonthlySavings >= 500;
  const isOptimal = totalMonthlySavings < 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          savingsAmount: totalMonthlySavings
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Lead capture error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl shadow-gray-200/50"
      >
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#51bc8f]" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Report Scheduled!</h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed font-medium">
          We've sent a confirmation email to <span className="text-gray-900 font-bold">{formData.email}</span>.
          {isHighSavings ? " A Credex consultant will reach out shortly." : " We'll keep you updated on new optimization opportunities."}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#51bc8f] font-bold hover:text-[#3da17a] transition-colors flex items-center gap-2 mx-auto"
        >
          Submit another response <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">

      {/* Left Column: Form */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/40">
        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3 tracking-tight">
          {isOptimal ? (
            <>
              <Sparkles className="w-5 h-5 text-[#51bc8f]" />
              Stay Optimized
            </>
          ) : (
            <>
              <Mail className="w-5 h-5 text-[#51bc8f]" />
              Claim Your Report
            </>
          )}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            autoComplete="off"
          />

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51bc8f] transition-colors" />
              <input
                required
                type="email"
                placeholder="Work Email *"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:ring-4 focus:ring-[#51bc8f]/10 focus:border-[#51bc8f] outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51bc8f] transition-colors" />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:ring-4 focus:ring-[#51bc8f]/10 focus:border-[#51bc8f] outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51bc8f] transition-colors" />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:ring-4 focus:ring-[#51bc8f]/10 focus:border-[#51bc8f] outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400 text-sm"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51bc8f] transition-colors" />
                <select
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:ring-4 focus:ring-[#51bc8f]/10 focus:border-[#51bc8f] outline-none transition-all font-bold text-gray-900 text-sm appearance-none cursor-pointer"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                >
                  <option value="">Team Size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 leading-tight px-1 font-bold uppercase tracking-wider">
            By submitting, you agree to receive your audit report and savings opportunities follow-up.
          </p>

          <button
            disabled={status === 'loading'}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isOptimal ? 'Notify Me' : 'Get Full Report'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-xs font-bold text-center mt-2">{errorMessage}</p>
          )}
        </form>
      </div>

      {/* Right Column: Context/CTA */}
      <div className="flex flex-col gap-6">
        {isHighSavings ? (
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-emerald-900/10 flex-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#51bc8f]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[#51bc8f] text-[10px] font-black tracking-widest uppercase mb-6">
                  <CalendarDays className="w-3.5 h-3.5" /> Priority Consultation
                </div>
                <h3 className="text-3xl font-black mb-4 leading-tight tracking-tight">
                  High Savings <br />Identified.
                </h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
                  Your stack waste of <strong className="text-white font-black">${totalMonthlySavings.toLocaleString()}/mo</strong> qualifies for our managed savings program.
                </p>
              </div>
              <button className="w-full py-4 bg-[#51bc8f] text-white rounded-2xl font-black hover:bg-[#3da17a] transition-all hover:scale-[1.01] flex items-center justify-center gap-3 shadow-xl shadow-[#51bc8f]/20">
                Book a Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
              {isOptimal ? 'Great work!' : 'Next steps.'}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8">
              {isOptimal
                ? "Your stack is highly optimized. Sign up to get notified when new tools or cheaper alternatives are released."
                : "Receive the full audit breakdown, including our step-by-step optimization roadmap."
              }
            </p>
            <div className="space-y-4">
              {[
                "Full PDF Audit Breakdown",
                "Tool-by-tool savings roadmap",
                "Alternative tool recommendations",
                "Monthly spend monitoring"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#51bc8f]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
