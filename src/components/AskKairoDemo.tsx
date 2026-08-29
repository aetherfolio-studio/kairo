'use client';

import React, { useState } from 'react';
import { PRESET_AI_PROMPTS } from '@/lib/mockData';
import { Sparkles, Bot, User, CheckCircle2, ArrowRight } from 'lucide-react';

export function AskKairoDemo() {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [activeQuery, setActiveQuery] = useState(PRESET_AI_PROMPTS[0].prompt);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentPreset = PRESET_AI_PROMPTS[selectedPromptIndex];

  const handleSelectPrompt = (index: number) => {
    setSelectedPromptIndex(index);
    setActiveQuery(PRESET_AI_PROMPTS[index].prompt);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-zinc-950 border border-white/15 p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Interactive AI Workspace Demo
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
          Ask questions in plain English. Get synthesis, not hallucinations.
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESET_AI_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPrompt(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedPromptIndex === idx
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-white/5'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-white/10 rounded-xl">
        <User className="w-4 h-4 text-zinc-400 shrink-0" />
        <span className="text-xs sm:text-sm text-zinc-200 flex-1 truncate">{activeQuery}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
          Enter
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-zinc-200">
              Kairo Intelligence Response
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Latency: 38ms</span>
        </div>

        {isSimulating ? (
          <div className="py-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
            <span>Scanning project workspace graph...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-zinc-100">{currentPreset.response.title}</h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {currentPreset.response.summary}
            </p>

            {currentPreset.response.nextSteps.length > 0 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Actionable Deliverables:
                </span>
                <div className="flex flex-col gap-1.5">
                  {currentPreset.response.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
