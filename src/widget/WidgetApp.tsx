'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const AI_TOOLS = [
  { id: 'cursor', name: 'Cursor', defaultCost: 20 },
  { id: 'claude', name: 'Claude', defaultCost: 20 },
  { id: 'chatgpt', name: 'ChatGPT', defaultCost: 20 },
  { id: 'copilot', name: 'GitHub Copilot', defaultCost: 10 },
];

export default function WidgetApp() {
  const [step, setStep] = useState<'audit' | 'loading' | 'results'>('audit');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolData, setToolData] = useState<Record<string, { spend: number }>>({});
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleTool = (id: string) => {
    setSelectedTools(prev => {
      if (prev.includes(id)) {
        return prev.filter(t => t !== id);
      }
      return [...prev, id];
    });
    if (!toolData[id]) {
      const tool = AI_TOOLS.find(t => t.id === id);
      setToolData(prev => ({ ...prev, [id]: { spend: tool?.defaultCost || 20 } }));
    }
  };

  const handleSpendChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setToolData(prev => ({ ...prev, [id]: { spend: num } }));
  };

  const runAudit = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (selectedTools.length === 0) {
      setError('Select at least one tool');
      return;
    }

    setStep('loading');
    setError(null);

    const payload = selectedTools.map(id => {
      const tool = AI_TOOLS.find(t => t.id === id);
      return {
        name: tool?.name,
        plan: 'Standard',
        usersCount: 1,
        planCost: toolData[id].spend,
        customCost: 0,
        processingMode: 'Standard',
        useCase: 'General'
      };
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tools: payload }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Audit failed');

      setResults(result.data);
      
      // Also capture lead
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          companyName: 'Widget User',
          role: 'Inferred',
          teamSize: '1-10',
          savingsAmount: result.data.total_monthly_savings
        }),
      });

      setStep('results');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStep('audit');
    }
  };

  if (step === 'loading') {
    return (
      <div className="gp-widget-container">
        <div className="gp-loader">
          <Loader2 className="gp-spin" />
          <p>Analyzing your spend...</p>
        </div>
      </div>
    );
  }

  if (step === 'results' && results) {
    return (
      <div className="gp-widget-container">
        <div className="gp-results">
          <CheckCircle2 className="gp-success-icon" />
          <h3>Audit Complete!</h3>
          <div className="gp-savings-banner">
            <span className="gp-label">Estimated Monthly Savings</span>
            <span className="gp-amount">${results.total_monthly_savings}</span>
          </div>
          <p>{results.strategic_summary}</p>
          <button onClick={() => setStep('audit')} className="gp-btn-secondary">Run New Audit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gp-widget-container">
      <div className="gp-header">
        <Sparkles className="gp-logo-icon" />
        <h2>GetPriced Audit</h2>
      </div>

      <div className="gp-tool-grid">
        {AI_TOOLS.map(tool => (
          <div 
            key={tool.id} 
            className={`gp-tool-card ${selectedTools.includes(tool.id) ? 'active' : ''}`}
            onClick={() => toggleTool(tool.id)}
          >
            <span>{tool.name}</span>
            {selectedTools.includes(tool.id) && (
              <input 
                type="number" 
                value={toolData[tool.id]?.spend} 
                onChange={(e) => {
                  e.stopPropagation();
                  handleSpendChange(tool.id, e.target.value);
                }}
                className="gp-spend-input"
              />
            )}
          </div>
        ))}
      </div>

      <div className="gp-footer">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="gp-email-input"
        />
        <button onClick={runAudit} className="gp-btn-primary">
          Run Free Audit
          <ArrowRight />
        </button>
      </div>

      {error && (
        <div className="gp-error">
          <AlertCircle />
          <span>{error}</span>
        </div>
      )}

      <style>{`
        .gp-widget-container {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 2rem;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          max-width: 420px;
          margin: 0 auto;
          color: #111827;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .gp-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .gp-header h2 {
          font-size: 1.5rem;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.025em;
        }
        .gp-logo-icon {
          color: #10b981;
          width: 1.75rem;
          height: 1.75rem;
        }
        .gp-tool-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .gp-tool-card {
          padding: 1rem;
          border: 1px solid #f3f4f6;
          background: #f9fafb;
          border-radius: 1.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
        }
        .gp-tool-card:hover {
          border-color: #10b981;
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
        }
        .gp-tool-card.active {
          border-color: #10b981;
          background: #ecfdf5;
          box-shadow: inset 0 0 0 1px #10b981;
        }
        .gp-tool-card span {
          font-size: 0.9rem;
          font-weight: 700;
          color: #374151;
        }
        .gp-spend-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #059669;
          background: white;
          outline: none;
          transition: all 0.2s;
        }
        .gp-spend-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        .gp-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .gp-email-input {
          padding: 1rem 1.25rem;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 1rem;
          outline: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .gp-email-input:focus {
          border-color: #10b981;
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .gp-btn-primary {
          background: #111827;
          color: white;
          padding: 1.125rem;
          border-radius: 1.125rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }
        .gp-btn-primary:hover {
          background: #000;
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
        .gp-btn-primary svg {
          width: 1.25rem;
          height: 1.25rem;
          color: #10b981;
        }
        .gp-loader, .gp-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 0;
          min-height: 350px;
        }
        .gp-loader p {
          font-weight: 700;
          color: #4b5563;
          margin-top: 1.5rem;
        }
        .gp-spin {
          animation: spin 1s linear infinite;
          color: #10b981;
          width: 3rem;
          height: 3rem;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .gp-success-icon {
          color: #10b981;
          width: 4rem;
          height: 4rem;
          margin-bottom: 1.5rem;
        }
        .gp-savings-banner {
          background: #ecfdf5;
          padding: 1.5rem;
          border-radius: 1.5rem;
          margin: 1.5rem 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #d1fae5;
        }
        .gp-amount {
          font-size: 2.75rem;
          font-weight: 950;
          color: #059669;
          letter-spacing: -0.05em;
        }
        .gp-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #065f46;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .gp-results p {
          color: #4b5563;
          line-height: 1.6;
          font-size: 1rem;
          font-weight: 500;
        }
        .gp-btn-secondary {
          background: #f3f4f6;
          color: #374151;
          padding: 0.875rem 1.5rem;
          border-radius: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          margin-top: 2rem;
          transition: all 0.2s;
        }
        .gp-btn-secondary:hover {
          background: #e5e7eb;
        }
        .gp-error {
          margin-top: 1.5rem;
          color: #b91c1c;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #fef2f2;
          padding: 0.875rem;
          border-radius: 1rem;
          border: 1px solid #fee2e2;
        }
      `}</style>
    </div>
  );
}
