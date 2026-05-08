'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon, Check } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
  iconSrc?: string;
}

interface Detail {
  useCases: string[];
}

interface UseCase {
  id: string;
  label: string;
  emoji: string;
}

interface UseCaseConfigProps {
  selectedTools: string[];
  aiTools: Tool[];
  toolDetails: Record<string, Detail>;
  useCases: UseCase[];
  toolUseCases: Record<string, string[]>;
  onUpdate: (id: string, field: 'useCase', value: string) => void;
}

export default function UseCaseConfig({ selectedTools, aiTools, toolDetails, useCases, toolUseCases, onUpdate }: UseCaseConfigProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col gap-12"
    >
      {/* Heading Section */}
      <div className="flex flex-col gap-4">
        <p className="text-xs font-bold text-[#51bc8f] uppercase tracking-widest">
          Step 3 of 4
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Primary use cases
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          How does your team primarily use each tool? You can select multiple workflows.
        </p>
      </div>

      {/* Tool configuration cards */}
      <div className="flex flex-col gap-6">
        {selectedTools.map((id, idx) => {
          const tool = aiTools.find(t => t.id === id)!;
          const detail = toolDetails[id];
          const Icon = tool.icon;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.28 }}
              className="bg-white rounded-3xl shadow-sm hover:shadow-md ring-1 ring-gray-100 p-6 sm:p-8 transition-shadow duration-200"
            >
              {/* Tool header row */}
              <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden ${
                  tool.iconSrc ? 'bg-white p-1 ring-1 ring-gray-100' : 'bg-[#51bc8f]/10 text-[#51bc8f]'
                }`}>
                  {tool.iconSrc ? (
                    <Image
                      src={tool.iconSrc}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span className="text-xl font-extrabold text-gray-800">{tool.name}</span>
              </div>

              {/* Use case grid */}
              <div className="w-full">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Workflows
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {useCases
                    .filter(uc => toolUseCases[id]?.includes(uc.id))
                    .map(uc => {
                      const active = detail.useCases.includes(uc.id);
                      return (
                        <button
                          key={uc.id}
                          onClick={() => onUpdate(id, 'useCase', uc.id)}
                          className={`relative flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none min-h-[100px] ${
                            active
                              ? 'bg-[#51bc8f] text-white shadow-md shadow-[#51bc8f]/20 ring-2 ring-[#51bc8f] ring-offset-2'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 ring-1 ring-gray-200 shadow-sm'
                          }`}
                        >
                          {active && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                          )}
                          <span className="text-2xl leading-none mb-1">{uc.emoji}</span>
                          <span className="text-center">{uc.label}</span>
                        </button>
                      );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
