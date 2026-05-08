'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Check } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
  iconSrc?: string;
}

interface ToolSelectionProps {
  tools: Tool[];
  selectedTools: string[];
  onToggle: (id: string) => void;
}

export default function ToolSelection({ tools, selectedTools, onToggle }: ToolSelectionProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      // 1. Force a strict vertical layout with a gap between sections
      className="flex flex-col gap-10"
    >
      {/* Heading Section */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-[#51bc8f] uppercase tracking-widest">
          Step 1 of 4
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Which AI tools does your team use?
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed">
          Select every tool you&apos;re currently paying for — we&apos;ll find the overlaps and savings.
        </p>
      </div>

      {/* 2. Tool Grid Section (Wraps both the counter and the grid) */}
      <div className="flex flex-col gap-4">
        {/* Selection count — wrapped in a fixed-height div so the grid below doesn't jump */}
        <div className="min-h-[24px]">
          <AnimatePresence>
            {selectedTools.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-semibold text-[#51bc8f] m-0"
              >
                {selectedTools.length} tool{selectedTools.length > 1 ? 's' : ''} selected
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tools.map((tool, i) => {
            const selected = selectedTools.includes(tool.id);
            const Icon = tool.icon;

            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onToggle(tool.id)}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 focus:outline-none ${selected
                    ? 'bg-white shadow-md shadow-[#51bc8f]/10 ring-2 ring-[#51bc8f]'
                    : 'bg-white shadow-sm hover:shadow-md ring-1 ring-gray-100 hover:ring-gray-200'
                  }`}
              >
                {/* Selected check badge */}
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#51bc8f] flex items-center justify-center z-10"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon — image if available, else Lucide fallback */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 overflow-hidden ${tool.iconSrc
                      ? 'bg-white p-1'
                      : selected
                        ? 'bg-[#51bc8f] text-white'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                >
                  {tool.iconSrc ? (
                    <Image
                      src={tool.iconSrc}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Name */}
                <span
                  className={`text-xs font-semibold leading-snug transition-colors ${selected ? 'text-gray-800' : 'text-gray-500'
                    }`}
                >
                  {tool.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}