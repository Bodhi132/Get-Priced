'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface EmailSubmitProps {
  email: string;
  onEmailChange: (v: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  selectedToolsCount: number;
}

export default function EmailSubmit({ email, onEmailChange, onSubmit, isSubmitting, selectedToolsCount }: EmailSubmitProps) {
  const valid = email.includes('@') && email.includes('.');

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      {/* Heading */}
      <div className="mb-10 max-w-md">
        <p className="text-xs font-bold text-[#51bc8f] uppercase tracking-widest mb-3">Final step</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-3">
          Get your free savings report
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          We&apos;ll analyse your{' '}
          <span className="font-semibold text-gray-600">{selectedToolsCount} tool{selectedToolsCount !== 1 ? 's' : ''}</span>{' '}
          and email you a personalised breakdown instantly.
        </p>
      </div>

      {/* Email card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 space-y-5"
      >
        {/* Green top accent */}
        <div className="h-1 -mx-8 -mt-8 mb-6 rounded-t-2xl bg-gradient-to-r from-[#51bc8f] to-[#3da17a]" />

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            Work email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={e => onEmailChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && valid && !isSubmitting && onSubmit()}
              placeholder="you@company.com"
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 text-gray-800 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#51bc8f]/40 focus:bg-white transition-all"
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={!valid || isSubmitting}
          className="w-full h-12 rounded-xl bg-[#51bc8f] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm shadow-[#51bc8f]/25 hover:bg-[#3da17a] hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-[#51bc8f]/30"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analysing your stack…</>
          ) : (
            <>Reveal my savings <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-300 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          We never share your data. Unsubscribe anytime.
        </p>
      </motion.div>
    </motion.div>
  );
}
