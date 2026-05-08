'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Code, Database, Wand2, Sparkles } from 'lucide-react';
import Link from 'next/link';

import ProgressBar   from '@/components/audit/ProgressBar';
import ToolSelection from '@/components/audit/ToolSelection';
import PlanConfig    from '@/components/audit/PlanConfig';
import UseCaseConfig from '@/components/audit/UseCaseConfig';
import EmailSubmit   from '@/components/audit/EmailSubmit';
import SuccessState  from '@/components/audit/SuccessState';

const AI_TOOLS = [
  { id: 'cursor',        name: 'Cursor',         iconSrc: '/ai-icons/cursor.png',               icon: Code,
    plans: [
      { name: 'Hobby', cost: 0 },
      { name: 'Pro', cost: 20 },
      { name: 'Pro+', cost: 60 },
      { name: 'Ultra', cost: 200 },
      { name: 'Teams', cost: 40 },
      { name: 'Enterprise', cost: 0, isCustom: true }
    ]
  },
  { id: 'copilot',       name: 'GitHub Copilot', iconSrc: '/ai-icons/co-pilot.png',             icon: Code,
    plans: [
      { name: 'Free', cost: 0 },
      { name: 'Pro', cost: 10 },
      { name: 'Pro+', cost: 39 },
      { name: 'Business', cost: 19 },
      { name: 'Enterprise', cost: 39 }
    ]
  },
  { id: 'claude',        name: 'Claude',         iconSrc: '/ai-icons/claude.svg',               icon: Sparkles,
    plans: [
      { name: 'Free', cost: 0 },
      { name: 'Pro', cost: 20 },
      { name: 'Max 5x', cost: 100 },
      { name: 'Max 20x', cost: 0, isCustom: true },
      { name: 'Team Standard', cost: 25 },
      { name: 'Team Premium', cost: 125 },
      { name: 'Enterprise', cost: 0, isCustom: true }
    ]
  },
  { id: 'chatgpt',       name: 'ChatGPT',        iconSrc: '/ai-icons/ChatGPT_logo.svg.png',     icon: Wand2,
    plans: [
      { name: 'Free', cost: 0 },
      { name: 'Go', cost: 8 },
      { name: 'Plus', cost: 20 },
      { name: 'Pro ($100)', cost: 100 },
      { name: 'Pro ($200)', cost: 200 },
      { name: 'Business', cost: 25 },
      { name: 'Enterprise', cost: 0, isCustom: true }
    ]
  },
  { id: 'anthropic_api', name: 'Anthropic API',  iconSrc: '/ai-icons/anthropic.svg',            icon: Database,
    plans: [
      { name: 'Opus 4.7', cost: 0, isCustom: true },
      { name: 'Sonnet 4.6', cost: 0, isCustom: true },
      { name: 'Haiku 4.5', cost: 0, isCustom: true }
    ]
  },
  { id: 'openai_api',    name: 'OpenAI API',     iconSrc: '/ai-icons/ChatGPT_logo.svg.png',     icon: Database,
    plans: [
      { name: 'GPT-5.5', cost: 0, isCustom: true },
      { name: 'GPT-5.5 Pro', cost: 0, isCustom: true },
      { name: 'GPT-5.4', cost: 0, isCustom: true },
      { name: 'GPT-5.4 Mini', cost: 0, isCustom: true },
      { name: 'GPT-5.4 Nano', cost: 0, isCustom: true },
      { name: 'GPT-5.2 Codex', cost: 0, isCustom: true },
      { name: 'GPT-5', cost: 0, isCustom: true },
      { name: 'GPT-5 Mini', cost: 0, isCustom: true },
      { name: 'GPT-4o', cost: 0, isCustom: true },
      { name: 'GPT-4o Mini', cost: 0, isCustom: true },
      { name: 'o3 Pro', cost: 0, isCustom: true },
      { name: 'o3', cost: 0, isCustom: true },
      { name: 'o3 Mini', cost: 0, isCustom: true }
    ]
  },
  { id: 'gemini',        name: 'Gemini',         iconSrc: '/ai-icons/google-gemini.png',        icon: Sparkles,
    plans: [
      { name: 'Gemini 3.1 Pro', cost: 0, isCustom: true },
      { name: 'Gemini 3 Flash', cost: 0, isCustom: true },
      { name: 'Gemini 2.5 Pro', cost: 0, isCustom: true },
      { name: 'Gemini 2.5 Flash', cost: 0, isCustom: true },
      { name: 'Gemini 2.5 Flash-Lite', cost: 0, isCustom: true },
      { name: 'Gemini 2.0 Flash', cost: 0, isCustom: true }
    ]
  },
  { id: 'windsurf',      name: 'Windsurf',       iconSrc: '/ai-icons/Windsurf-black-symbol.png', icon: Code,
    plans: [
      { name: 'Free', cost: 0 },
      { name: 'Pro', cost: 15 },
      { name: 'Max', cost: 200 },
      { name: 'Teams', cost: 30 },
      { name: 'Enterprise', cost: 0, isCustom: true }
    ]
  },
];

const USE_CASES = [
  { id: 'coding',     label: 'Coding',     emoji: '💻' },
  { id: 'writing',    label: 'Writing',    emoji: '✍️'  },
  { id: 'data',       label: 'Data',       emoji: '📊' },
  { id: 'research',   label: 'Research',   emoji: '🔍' },
  { id: 'search',     label: 'Search',     emoji: '🌐' },
  { id: 'automation', label: 'Automation', emoji: '⚡' },
];

const TOOL_USE_CASES: Record<string, string[]> = {
  cursor: ['coding', 'automation'],
  copilot: ['coding', 'automation'],
  claude: ['writing', 'coding', 'data', 'research'],
  chatgpt: ['writing', 'research', 'search', 'data'],
  anthropic_api: ['coding', 'data', 'automation'],
  openai_api: ['coding', 'data', 'automation'],
  gemini: ['data', 'research', 'search'],
  windsurf: ['coding', 'automation']
};

const TOTAL_STEPS = 4;

export default function AuditPage() {
  const [step, setStep]                   = useState(1);
  const [email, setEmail]                 = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolDetails, setToolDetails]     = useState<Record<string, { plans: { name: string; users: number; customCost: number; processingMode?: string }[]; useCases: string[] }>>({});
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitted, setSubmitted]         = useState(false);

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolId)) {
        const d = { ...toolDetails };
        delete d[toolId];
        setToolDetails(d);
        return prev.filter(id => id !== toolId);
      }
      const info = AI_TOOLS.find(t => t.id === toolId);
      const validUseCases = TOOL_USE_CASES[toolId] || [];
      const defaultUseCase = validUseCases[0] || '';
      setToolDetails(d => ({ ...d, [toolId]: { plans: [{ name: info?.plans[0]?.name ?? '', users: 1, customCost: 0, processingMode: 'Standard' }], useCases: defaultUseCase ? [defaultUseCase] : [] } }));
      return [...prev, toolId];
    });
  };

  const toggleToolPlan = (toolId: string, planName: string) => {
    setToolDetails(prev => {
      const toolData = { ...prev[toolId] };
      const exists = toolData.plans.some(p => p.name === planName);
      if (exists) {
        if (toolData.plans.length > 1) {
          toolData.plans = toolData.plans.filter(p => p.name !== planName);
        }
      } else {
        toolData.plans = [...toolData.plans, { name: planName, users: 1, customCost: 0, processingMode: 'Standard' }];
      }
      return { ...prev, [toolId]: toolData };
    });
  };

  const updatePlanDetail = (toolId: string, planName: string, field: 'users' | 'customCost' | 'processingMode', value: number | string) => {
    setToolDetails(prev => {
      const toolData = { ...prev[toolId] };
      toolData.plans = toolData.plans.map(p => p.name === planName ? { ...p, [field]: value } : p);
      return { ...prev, [toolId]: toolData };
    });
  };

  const toggleUseCase = (toolId: string, _field: string, useCaseId: string) => {
    setToolDetails(prev => {
      const toolData = { ...prev[toolId] };
      const exists = toolData.useCases.includes(useCaseId);
      if (exists) {
        if (toolData.useCases.length > 1) {
          toolData.useCases = toolData.useCases.filter(id => id !== useCaseId);
        }
      } else {
        toolData.useCases = [...toolData.useCases, useCaseId];
      }
      return { ...prev, [toolId]: toolData };
    });
  };

  const nextStep    = () => { if (!canContinue) return; setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const prevStep    = () => setStep(s => Math.max(s - 1, 1));
  const canContinue = step === 1 ? selectedTools.length > 0 : true;

  const submitForm = async () => {
    if (!email) return;
    setIsSubmitting(true);
    const payload = selectedTools.flatMap(id => {
      const info = AI_TOOLS.find(t => t.id === id);
      const d    = toolDetails[id];
      return d.plans.map(selectedPlan => {
        const planInfo = info?.plans.find(p => p.name === selectedPlan.name);
        return { 
          name: info?.name, 
          plan: selectedPlan.name, 
          usersCount: selectedPlan.users, 
          customCost: selectedPlan.customCost, 
          planCost: planInfo?.cost || 0,
          processingMode: selectedPlan.processingMode || 'Standard',
          useCase: d.useCases.join(', ')
        };
      });
    });
    try {
      const res = await fetch('http://localhost:5000/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tools: payload }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) { console.error(err); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">

      {/* ─── Fixed Back Button (top-left) ─── */}
      <div className="fixed top-5 left-5 z-40">
        {step > 1 && !submitted ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white shadow-sm text-sm font-semibold text-gray-500 hover:text-gray-800 hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white shadow-sm text-sm font-semibold text-gray-500 hover:text-gray-800 hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        )}
      </div>

      {/* ─── Centered Content Column ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-24">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">

          {/* Progress Bar */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
            </motion.div>
          )}

          {/* Step Content */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <ToolSelection
                  key="s1"
                  tools={AI_TOOLS}
                  selectedTools={selectedTools}
                  onToggle={toggleTool}
                />
              )}
              {step === 2 && (
                <PlanConfig
                  key="s2"
                  selectedTools={selectedTools}
                  aiTools={AI_TOOLS}
                  toolDetails={toolDetails}
                  onTogglePlan={toggleToolPlan}
                  onUpdatePlan={updatePlanDetail}
                />
              )}
              {step === 3 && (
                <UseCaseConfig
                  key="s3"
                  selectedTools={selectedTools}
                  aiTools={AI_TOOLS}
                  toolDetails={toolDetails}
                  useCases={USE_CASES}
                  toolUseCases={TOOL_USE_CASES}
                  onUpdate={toggleUseCase}
                />
              )}
              {step === 4 && !submitted && (
                <EmailSubmit
                  key="s4"
                  email={email}
                  onEmailChange={setEmail}
                  onSubmit={submitForm}
                  isSubmitting={isSubmitting}
                  selectedToolsCount={selectedTools.length}
                />
              )}
              {submitted && <SuccessState key="success" email={email} />}
            </AnimatePresence>
          </div>

          {/* ─── Continue Button (below form, centered) ─── */}
          {!submitted && step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full mt-10 flex justify-center"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={nextStep}
                className={`flex items-center gap-3 px-14 py-4 rounded-2xl text-white text-base font-bold shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#51bc8f]/30 ${
                  canContinue
                    ? 'bg-[#51bc8f] shadow-[#51bc8f]/25 hover:bg-[#3da17a] hover:shadow-lg hover:shadow-[#51bc8f]/30 cursor-pointer'
                    : 'bg-[#51bc8f] opacity-40 cursor-not-allowed'
                }`}
              >
                {step === TOTAL_STEPS - 1 ? 'Almost done' : 'Continue'}
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Helper text when disabled */}
              {!canContinue && step === 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-xs text-gray-400 text-center absolute translate-y-12"
                >
                  Select at least one tool to continue
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Bottom spacing */}
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}
