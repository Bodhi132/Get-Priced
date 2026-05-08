'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const STEP_LABELS = ['Tools', 'Plans', 'Use Cases', 'Report'];

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  return (
    <div className="py-5">
      <div className="flex items-center">
        {STEP_LABELS.slice(0, totalSteps).map((label, i) => {
          const num     = i + 1;
          const isDone  = num < step;
          const isNow   = num === step;

          return (
            <div key={num} className="flex items-center flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor: isDone ? '#51bc8f' : isNow ? '#ffffff' : '#f3f4f6',
                    borderColor:     isDone || isNow ? '#51bc8f' : '#e5e7eb',
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                  style={{ boxShadow: isNow ? '0 0 0 4px rgba(81,188,143,0.12)' : 'none' }}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  ) : (
                    <span className={`text-xs font-bold ${isNow ? 'text-[#51bc8f]' : 'text-gray-400'}`}>
                      {num}
                    </span>
                  )}
                </motion.div>
                <span className={`hidden sm:block text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  isDone || isNow ? 'text-[#51bc8f]' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>

              {/* Connector */}
              {num < totalSteps && (
                <div className="flex-1 h-0.5 mx-3 mb-5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#51bc8f] rounded-full"
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}