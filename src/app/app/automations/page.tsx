'use client';

import React, { useState } from 'react';
import { useKairoStore } from '@/lib/store';
import {
  Zap,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Layers,
  Sliders,
  Trash2
} from 'lucide-react';
import { NewAutomationModal } from '@/components/Modals';

export default function AutomationsPage() {
  const { automations, toggleAutomation } = useKairoStore();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'AI', 'Review', 'Sync', 'Notify'];

  const filteredAutomations = automations.filter(
    (a) => categoryFilter === 'All' || a.category === categoryFilter
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Workflow Automations</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Autonomous rules that remove repetitive coordination and status updating from your team&apos;s day.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Automations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAutomations.map((auto) => (
          <div
            key={auto.id}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between gap-6 ${
              auto.enabled
                ? 'bg-zinc-900/70 border-white/10 hover:border-white/20'
                : 'bg-zinc-950 border-white/5 opacity-60'
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-950 border border-white/10 text-zinc-400">
                  {auto.category} Rule
                </span>

                {/* Toggle Switch */}
                <button
                  onClick={() => toggleAutomation(auto.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                    auto.enabled ? 'bg-blue-600' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      auto.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>

              <h3 className="text-base font-bold text-zinc-100">{auto.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{auto.description}</p>

              {/* Trigger & Action Visual Flow */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-indigo-400 font-bold uppercase text-[10px]">WHEN:</span>
                  <span className="truncate">{auto.trigger}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="text-blue-400 font-bold uppercase text-[10px]">THEN:</span>
                  <span className="truncate">{auto.action}</span>
                </div>
              </div>
            </div>

            {/* Automation Metrics Bar */}
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-3 border-t border-white/5">
              <span>{auto.executionsCount} triggers executed</span>
              <span>Last run: {auto.lastRun}</span>
            </div>
          </div>
        ))}
      </div>

      <NewAutomationModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
    </div>
  );
}
