'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  CheckCircle2,
  Circle,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';

export function InteractiveHeroPreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'ai'>('overview');
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    't-1': true,
    't-2': false,
    't-3': false
  });
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSummaryGenerated, setAiSummaryGenerated] = useState(false);

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerateAiDigest = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setAiSummaryGenerated(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-zinc-950 border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-3 text-xs font-mono text-zinc-400 font-medium">
            kairo.workspace / brand-relaunch
          </span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-950/80 border border-white/10 p-0.5 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeTab === 'tasks'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1 text-xs rounded-md font-medium flex items-center gap-1 transition-all ${
              activeTab === 'ai'
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>AI Assist</span>
          </button>
        </div>

        <Link
          href="/app"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white text-xs font-medium rounded-lg border border-white/10 transition-all"
        >
          <span>Open Full App</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
        <div className="hidden md:flex md:col-span-3 flex-col border-r border-white/10 p-4 bg-zinc-950/60 gap-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold px-2">
            Active Projects
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10">
              <span className="truncate">Website Redesign</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] text-xs transition-colors">
              <span className="truncate">AI Graph Engine</span>
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] text-xs transition-colors">
              <span className="truncate">Mobile iOS App</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          <div className="mt-auto p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-Sprint Digest</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              3 tasks auto-completed this week via git sync.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-9 p-5 md:p-6 flex flex-col gap-6 bg-zinc-950/40">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Sprint Velocity</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-bold text-zinc-100">84%</div>
                  <span className="text-[10px] text-emerald-400">+12% vs last cycle</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Tasks Completed</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-xl font-bold text-zinc-100">13 / 18</div>
                  <span className="text-[10px] text-zinc-400">5 pending review</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Days to Launch</span>
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-xl font-bold text-zinc-100">14 Days</div>
                  <span className="text-[10px] text-zinc-400">On scheduled track</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Today&apos;s High Priority Tasks
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">Click to toggle</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div
                    onClick={() => toggleTask('t-1')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedTasks['t-1']
                        ? 'bg-zinc-900/30 border-white/5 text-zinc-500'
                        : 'bg-zinc-900/70 border-white/10 text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {checkedTasks['t-1'] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-500" />
                      )}
                      <span className={`text-xs font-medium ${checkedTasks['t-1'] ? 'line-through' : ''}`}>
                        Finalize dark-mode contrast tokens in Figma
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      Design
                    </span>
                  </div>

                  <div
                    onClick={() => toggleTask('t-2')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedTasks['t-2']
                        ? 'bg-zinc-900/30 border-white/5 text-zinc-500'
                        : 'bg-zinc-900/70 border-white/10 text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {checkedTasks['t-2'] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-500" />
                      )}
                      <span className={`text-xs font-medium ${checkedTasks['t-2'] ? 'line-through' : ''}`}>
                        Implement vector embedding cache for query engine
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/20">
                      AI Generated
                    </span>
                  </div>

                  <div
                    onClick={() => toggleTask('t-3')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedTasks['t-3']
                        ? 'bg-zinc-900/30 border-white/5 text-zinc-500'
                        : 'bg-zinc-900/70 border-white/10 text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {checkedTasks['t-3'] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-500" />
                      )}
                      <span className={`text-xs font-medium ${checkedTasks['t-3'] ? 'line-through' : ''}`}>
                        Benchmark client-side render speed on mobile
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      Performance
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tasks' && (
            <div className="flex flex-col gap-3 py-2">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs font-semibold text-zinc-200">Sprint 14 Kanban View</span>
                <span className="text-xs text-zinc-400">4 columns • 18 items</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">In Progress (2)</div>
                  <div className="p-2.5 rounded-lg bg-zinc-800/70 border border-white/10 text-xs text-zinc-200">
                    Vector query latency optimization
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-800/70 border border-white/10 text-xs text-zinc-200">
                    Mobile drawer touch gesture tuning
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Completed (13)</div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-emerald-500/20 text-xs text-zinc-400 line-through">
                    Figma tokens verification
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-emerald-500/20 text-xs text-zinc-400 line-through">
                    Interactive preview components
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="flex flex-col gap-4 py-2">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Kairo Context Summary</span>
                  </div>
                  <button
                    onClick={handleGenerateAiDigest}
                    disabled={aiGenerating}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    {aiGenerating ? 'Analyzing...' : 'Refresh Digest'}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {aiSummaryGenerated
                    ? 'Sprint velocity is up 12%. No open blockers detected. The team is on track for the September 15th staging deployment.'
                    : 'Click Refresh Digest to run an instant AI context scan across active project conversations, PRs, and tickets.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
