'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon, Minus, Plus, Check } from 'lucide-react';

interface ToolPlan {
  name: string;
  cost: number;
  isCustom?: boolean;
}

interface Tool {
  id: string;
  name: string;
  plans: ToolPlan[];
  icon: LucideIcon;
  iconSrc?: string;
}

interface SelectedPlan {
  name: string;
  users: number;
  customCost: number;
  processingMode?: string;
}

interface Detail {
  plans: SelectedPlan[];
  useCases: string[];
}

interface PlanConfigProps {
  selectedTools: string[];
  aiTools: Tool[];
  toolDetails: Record<string, Detail>;
  onTogglePlan: (toolId: string, planName: string) => void;
  onUpdatePlan: (toolId: string, planName: string, field: 'users' | 'customCost' | 'processingMode', value: number | string) => void;
}

export default function PlanConfig({ selectedTools, aiTools, toolDetails, onTogglePlan, onUpdatePlan }: PlanConfigProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col gap-12"
    >
      {/* Heading Section */}
      <div className="flex flex-col gap-4">
        <p className="text-xs font-bold text-[#51bc8f] uppercase tracking-widest">
          Step 2 of 4
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Plans & team size
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Select all active plans for each tool and configure their seats and spend.
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

              <div className="flex flex-col gap-8">
                {/* Multi-Select Plan Pills */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Active Plans
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {tool.plans.map(plan => {
                      const isActive = detail?.plans.some(p => p.name === plan.name);
                      return (
                        <button
                          key={plan.name}
                          onClick={() => onTogglePlan(id, plan.name)}
                          className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none ${
                            isActive
                              ? 'bg-[#51bc8f] text-white shadow-md shadow-[#51bc8f]/20 ring-2 ring-[#51bc8f] ring-offset-2'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 ring-1 ring-gray-200 shadow-sm'
                          }`}
                        >
                          {isActive && <Check className="w-4 h-4" strokeWidth={3} />}
                          {plan.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Render configuration for EACH selected plan */}
                {detail?.plans.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                      Configure Usage
                    </p>
                    {detail.plans.map(selectedPlan => {
                      const activePlanInfo = tool.plans.find(p => p.name === selectedPlan.name);
                      const isCustom = activePlanInfo?.isCustom;

                      return (
                        <div key={selectedPlan.name} className="flex flex-col gap-6 p-5 rounded-2xl bg-[#f8f9fb] ring-1 ring-gray-100/80">
                          {/* Row Top: Plan Label */}
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-base font-extrabold text-gray-800">{selectedPlan.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                {isCustom ? 'Custom API' : 'Subscription'}
                              </p>
                            </div>
                            {/* Optional: Add a small tag or remove button here if needed */}
                          </div>

                          {/* Row Bottom: Controls */}
                          <div className="flex flex-wrap items-end gap-x-8 gap-y-6">
                            {/* 1. Seats Stepper */}
                            <div className="w-full sm:w-36 shrink-0 flex flex-col gap-3">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Total Seats
                              </p>
                              <div className="flex items-center bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-[#51bc8f] focus-within:ring-offset-1 h-11">
                                <button
                                  onClick={() => onUpdatePlan(id, selectedPlan.name, 'users', Math.max(1, selectedPlan.users - 1))}
                                  className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-[#51bc8f] hover:bg-gray-50 transition-colors focus:outline-none border-r border-gray-100 shrink-0"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={selectedPlan.users}
                                  onChange={e => onUpdatePlan(id, selectedPlan.name, 'users', Math.max(1, parseInt(e.target.value) || 1))}
                                  className="flex-1 h-full w-full text-center text-sm font-bold text-gray-800 bg-transparent border-none outline-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none min-w-0"
                                />
                                <button
                                  onClick={() => onUpdatePlan(id, selectedPlan.name, 'users', selectedPlan.users + 1)}
                                  className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-[#51bc8f] hover:bg-gray-50 transition-colors focus:outline-none border-l border-gray-100 shrink-0"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* 2. Custom Cost Input */}
                            {isCustom && (
                              <div className="w-full sm:w-36 shrink-0 flex flex-col gap-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                  Monthly Cost
                                </p>
                                <div className="flex items-center bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-[#51bc8f] focus-within:ring-offset-1 px-3 h-11">
                                  <span className="text-gray-400 font-bold text-base mr-1">$</span>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={selectedPlan.customCost || ''}
                                    onChange={e => onUpdatePlan(id, selectedPlan.name, 'customCost', Math.max(0, parseInt(e.target.value) || 0))}
                                    className="flex-1 h-full w-full text-left text-sm font-bold text-gray-800 bg-transparent border-none outline-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none p-0 min-w-0"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 3. Processing Mode (OpenAI Only) */}
                            {id === 'openai_api' && (
                              <div className="w-full sm:w-auto min-w-[280px] shrink-0 flex flex-col gap-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                  Processing Mode
                                </p>
                                <div className="flex bg-white rounded-xl ring-1 ring-gray-200 p-1 h-11">
                                  {['Standard', 'Batch', 'Data Residency'].map(mode => (
                                    <button
                                      key={mode}
                                      onClick={() => onUpdatePlan(id, selectedPlan.name, 'processingMode', mode)}
                                      className={`flex-1 px-2 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${
                                        selectedPlan.processingMode === mode
                                          ? 'bg-[#51bc8f] text-white shadow-sm'
                                          : 'text-gray-400 hover:text-gray-600'
                                      }`}
                                    >
                                      {mode}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}