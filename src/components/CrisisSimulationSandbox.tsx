'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  AlertTriangle,
  Zap,
  CheckCircle2,
  BedDouble,
  Users,
  Activity,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export function CrisisSimulationSandbox() {
  const { addToast } = useHospitalStore();
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: 'Mass Casualty Respiratory Surge',
      severity: 'Level 1 Code Yellow',
      description: 'Incoming multi-vehicle collision + seasonal surge brings +35 acute admissions to Emergency within 45 minutes.',
      initialBottleneck: 'Emergency ER capacity exceeds 105%. Triage wait projected to spike to 65 minutes.',
      kairoMitigation: [
        'Automatically re-allocates 6 ambulatory bays in Ward 2A into monitored trauma step-down.',
        'Dispatches automated push paging to on-call trauma surgeons and respiratory therapists.',
        'Notifies regional health network transfer hub to route non-critical EMS to secondary campus.'
      ],
      resultMetric: 'Average ER wait stabilized at 21 minutes. Zero patient diversions.'
    },
    {
      id: 2,
      title: 'ICU Critical Saturation Lockout',
      severity: 'Code ICU Saturation',
      description: 'All 30 ICU beds reach 100% occupancy with 2 scheduled high-risk post-op transfers pending.',
      initialBottleneck: 'Surgical suites paused due to lack of post-operative intensive care beds.',
      kairoMitigation: [
        'Scans EHR telemetry graph to identify 3 stable post-op CABG patients meeting safe step-down criteria.',
        'Generates digital step-down sign-off packet for Dr. Chen and dispatches rapid sanitization team.',
        'Frees 3 ICU pods in 35 minutes, allowing scheduled surgeries to proceed without delay.'
      ],
      resultMetric: '0 surgical delays. 35 min average bed turnover achieved.'
    },
    {
      id: 3,
      title: 'Sterile Supply Chain Alert',
      severity: 'Supply Threshold Alert',
      description: 'Emergency trauma consumption exhausts par-level stock of sterile vascular graft kits.',
      initialBottleneck: 'Vascular surgery at risk of postponement awaiting sterile kit restocking.',
      kairoMitigation: [
        'Detects inventory depletion at incision milestone and alerts Central Sterile Supply instantly.',
        'Coordinates emergency drone/courier transfer of 8 kits from sister campus 4 miles away.',
        'Automatically replenishes sterile cleanroom registry upon barcode scan reception.'
      ],
      resultMetric: 'Kits delivered in 14 minutes. Zero procedural cancellations.'
    }
  ];

  const handleTrigger = (idx: number) => {
    setActiveScenario(idx);
    setResolving(true);
    setResolved(false);

    addToast({
      title: `🚨 CRISIS SIMULATION: ${scenarios[idx].title}`,
      description: 'Kairo algorithmic mitigation protocol engaged.',
      type: 'warning'
    });

    setTimeout(() => {
      setResolving(false);
      setResolved(true);
      addToast({
        title: `✅ Incident Resolved Successfully`,
        description: scenarios[idx].resultMetric,
        type: 'success'
      });
    }, 1200);
  };

  const handleReset = () => {
    setActiveScenario(null);
    setResolving(false);
    setResolved(false);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14" id="crisis-sandbox">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          CRITICAL RESILIENCE SANDBOX
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Tested under extreme hospital pressure.
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          Simulate real emergency scenarios and see how Kairo&apos;s ambient intelligence resolves bottlenecks before patient safety is compromised.
        </p>
      </div>

      {/* Main Sandbox Frame */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg flex flex-col gap-8">
        {/* Scenario Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((sc, idx) => {
            const isSelected = activeScenario === idx;
            return (
              <div
                key={sc.id}
                onClick={() => handleTrigger(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#FFFDFC] border-[#E06D53] shadow-warm-md -translate-y-1'
                    : 'bg-[#FAF6F2] border-[#EFE5DC] hover:border-[#E06D53]/50'
                }`}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2]">
                      {sc.severity}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E06D53]">Scenario {sc.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#2C1810] leading-snug">{sc.title}</h3>
                  <p className="text-xs text-[#7A6258] leading-relaxed">
                    {sc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE5DC] flex items-center justify-between text-xs font-bold text-[#E06D53]">
                  <span>{isSelected ? 'Simulating...' : 'Run Simulation'}</span>
                  <Zap className={`w-3.5 h-3.5 ${isSelected ? 'animate-bounce' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Simulation Resolution Display */}
        {activeScenario !== null && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE5DC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#EF4444] animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2C1810]">{scenarios[activeScenario].title}</h4>
                  <span className="text-xs text-[#EF4444] font-mono font-bold">
                    Bottleneck: {scenarios[activeScenario].initialBottleneck}
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] rounded-xl text-xs font-semibold shadow-warm-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Sandbox</span>
              </button>
            </div>

            {/* Step-by-Step Kairo Resolution */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#E06D53] font-bold">
                Kairo Automated Algorithmic Response:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scenarios[activeScenario].kairoMitigation.map((step, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2 transition-all ${
                      resolving ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2C1810]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Phase 0{i + 1} Mitigation</span>
                    </div>
                    <p className="text-xs text-[#7A6258] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Result Badge */}
            {resolved && (
              <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-[#A7F3D0] flex items-center justify-between gap-4 text-xs font-mono animate-in zoom-in-95">
                <span className="font-bold text-[#065F46] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#065F46]" />
                  <span>SIMULATION OUTCOME: {scenarios[activeScenario].resultMetric}</span>
                </span>
                <span className="text-[#065F46] font-bold">Protocol Passed</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
