'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, Users, Briefcase, Sparkles } from 'lucide-react';

interface Plan {
  name: string;
  users: number;
  customCost: number;
  processingMode?: string;
}

interface ToolDetail {
  plans: Plan[];
  useCases: string[];
}

interface AuditSummaryProps {
  selectedTools: string[];
  aiTools: any[];
  toolDetails: Record<string, ToolDetail>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function AuditSummary({ 
  selectedTools, 
  aiTools, 
  toolDetails, 
  isSubmitting, 
  onSubmit 
}: AuditSummaryProps) {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#51bc8f]/10 text-[#2d7a5a] rounded-full text-sm font-bold mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Ready for Audit
        </motion.div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Review Your Stack</h2>
        <p className="text-gray-500 font-medium">Verify your tools and usage before we run the AI analysis.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 mb-10"
      >
        {selectedTools.map((toolId) => {
          const toolInfo = aiTools.find(t => t.id === toolId);
          const details = toolDetails[toolId];
          
          return (
            <motion.div 
              key={toolId}
              variants={item}
              className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-400 group-hover:bg-[#51bc8f]/10 group-hover:text-[#51bc8f] transition-all">
                    {toolInfo?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{toolInfo?.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {details.useCases.map(uc => (
                        <span key={uc} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 md:border-l border-gray-100 md:pl-8">
                  {details.plans.map((plan, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                        {plan.name}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-700 font-bold">
                          <Users className="w-4 h-4 text-gray-300" />
                          {plan.users}
                        </div>
                        <div className="flex items-center gap-1 text-[#51bc8f] font-black">
                          <DollarSign className="w-4 h-4" />
                          {plan.customCost > 0 ? plan.customCost : toolInfo.plans.find((p:any) => p.name === plan.name)?.cost || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full max-w-sm flex items-center justify-center gap-3 px-10 py-5 rounded-[1.5rem] text-white text-lg font-black shadow-xl transition-all duration-200 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-gray-900 shadow-gray-900/20 hover:bg-black hover:shadow-gray-900/40'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Running Analysis...
            </>
          ) : (
            <>
              Generate My Audit
              <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </motion.button>
        <p className="text-xs text-gray-400 font-medium">No email required. Results generated in ~10 seconds.</p>
      </div>
    </div>
  );
}
