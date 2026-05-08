'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuccessState({ email }: { email: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center text-center py-8"
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="relative mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-[#51bc8f]/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#51bc8f]" strokeWidth={1.5} />
        </div>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-[#51bc8f]/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="max-w-sm"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-4">
          Report on its way!
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-2">
          We&apos;re crunching the numbers on your AI stack.
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          Your report will land in{' '}
          <span className="font-semibold text-gray-700">{email}</span>{' '}
          within minutes.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-10 p-4 bg-[#51bc8f]/5 rounded-2xl">
          {[
            { value: '< 2 min',  label: 'Delivery' },
            { value: 'Free',     label: 'No cost'  },
            { value: '100%',     label: 'Actionable' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-lg font-extrabold text-[#51bc8f]">{s.value}</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <Link href="/">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition-all focus:outline-none">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
