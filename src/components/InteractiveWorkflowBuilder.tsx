'use client';

import React, { useState } from 'react';
import { Zap, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export function InteractiveWorkflowBuilder() {
  const [trigger, setTrigger] = useState('Meeting Ends');
  const [condition, setCondition] = useState('Contains Action Items');
  const [action, setAction] = useState('Create & Assign Sprint Tasks');
  const [testing, setTesting] = useState(false);
  const [testedSuccess, setTestedSuccess] = useState(false);

  const triggers = ['Meeting Ends', 'GitHub PR Merged', 'Customer Feedback Submitted', 'Task Overdue > 24h'];
  const conditions = ['Contains Action Items', 'Affects Design Tokens', 'Urgent Severity', 'No Blocker Assigned'];
  const actions = ['Create & Assign Sprint Tasks', 'Post Release Notes in Slack', 'Auto-triage to Backlog', 'Escalate to Engineering Lead'];

  const handleTestRun = () => {
    setTesting(true);
    setTestedSuccess(false);
    setTimeout(() => {
      setTesting(false);
      setTestedSuccess(true);
      setTimeout(() => setTestedSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-zinc-950 border border-white/15 shadow-2xl flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Autonomous Workflow Builder
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Design continuous automations with zero code.
          </h3>
        </div>

        <button
          onClick={handleTestRun}
          disabled={testing}
          className="px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{testing ? 'Simulating...' : 'Test Run Rule'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">1. WHEN (TRIGGER)</span>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/30"
          >
            {triggers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">2. AND (CONDITION)</span>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/30"
          >
            {conditions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">3. THEN (ACTION)</span>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/30"
          >
            {actions.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-zinc-300">
          <span className="text-zinc-500">Live logic:</span>
          <span>When <strong>{trigger}</strong> and <strong>{condition}</strong> ➔ Execute <strong>{action}</strong></span>
        </div>

        {testedSuccess && (
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Workflow validated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}
