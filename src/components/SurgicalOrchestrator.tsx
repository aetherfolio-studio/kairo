'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Scissors,
  Activity,
  Clock,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  Users,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export function SurgicalOrchestrator() {
  const { addToast } = useHospitalStore();
  const [emergencyOverride, setEmergencyOverride] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState(0);

  const suites = [
    {
      id: 'OR-01',
      name: 'OR Suite 1 — Cardiothoracic Core',
      specialty: 'Coronary Artery Bypass Graft (CABG)',
      surgeon: 'Dr. Michael Chang, MD',
      anesthesiologist: 'Dr. Elena Rostova, MD',
      phase: emergencyOverride && selectedSuite === 0 ? 'EMERGENCY TRAUMA RESCUE' : 'Active Coronary Anastomosis',
      progress: emergencyOverride && selectedSuite === 0 ? 15 : 68,
      status: emergencyOverride && selectedSuite === 0 ? 'Emergency Priority' : 'On Schedule',
      turnoverEta: 'Turnover in 45 min',
      anesthesia: 'Sevoflurane 1.8% • FiO2 60%',
      bloodUnits: '4 Units O-Neg Reserved',
      color: emergencyOverride && selectedSuite === 0 ? 'bg-[#EF4444]' : 'bg-[#E06D53]'
    },
    {
      id: 'OR-02',
      name: 'OR Suite 2 — Robotic Orthopedics',
      specialty: 'Total Knee Arthroplasty (MAKO Robot)',
      surgeon: 'Dr. James Wilson, MD',
      anesthesiologist: 'Dr. Sarah Jenkins, MD',
      phase: 'Bone Resection & Trial Component Fitting',
      progress: 42,
      status: 'On Schedule',
      turnoverEta: 'Turnover in 1h 15m',
      anesthesia: 'Spinal Bupivacaine Block',
      bloodUnits: 'Autologous Cell Saver Ready',
      color: 'bg-[#E06D53]'
    },
    {
      id: 'OR-03',
      name: 'OR Suite 3 — Laparoscopic General',
      specialty: 'Laparoscopic Cholecystectomy',
      surgeon: 'Dr. Marcus Vance, MD',
      anesthesiologist: 'Dr. David Kim, MD',
      phase: 'Port Insertion & Gallbladder Dissection',
      progress: 85,
      status: 'Closing Soon',
      turnoverEta: 'Turnover in 20 min',
      anesthesia: 'Propofol TIVA Infusion',
      bloodUnits: 'Standard Type & Screen',
      color: 'bg-emerald-600'
    },
    {
      id: 'OR-04',
      name: 'Hybrid Cath Lab 4 — Interventional Vascular',
      specialty: 'Endovascular Aortic Repair (EVAR)',
      surgeon: 'Dr. Sarah Chen, MD',
      anesthesiologist: 'Dr. Robert Miller, MD',
      phase: 'Stent Graft Fluoroscopy Deployment',
      progress: 55,
      status: 'On Schedule',
      turnoverEta: 'Turnover in 50 min',
      anesthesia: 'Conscious Sedation Protocol',
      bloodUnits: '2 Units Packed RBC Crossmatched',
      color: 'bg-[#E06D53]'
    }
  ];

  const currentSuite = suites[selectedSuite];

  const handleTriggerEmergency = () => {
    setEmergencyOverride(true);
    addToast({
      title: '⚠️ EMERGENCY SURGICAL OVERRIDE ACTIVATED',
      description: 'OR Suite 1 cleared for incoming aortic dissection. On-call vascular scrub nurse paged.',
      type: 'warning'
    });
  };

  const handleReset = () => {
    setEmergencyOverride(false);
    addToast({
      title: 'Surgical Schedule Normalized',
      description: 'Elective procedural timeline restored to standard baseline.',
      type: 'info'
    });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14" id="surgical-flow">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          SURGICAL SUITE ORCHESTRATOR
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Precision operating room flow.
          <span className="block font-serif italic font-normal text-[#E06D53]">
            Zero surgical delays. Zero idle theaters.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          Coordinate anesthesia induction, active surgical milestones, and sterile room turnover with sub-second synchronization.
        </p>
      </div>

      {/* Main Orchestrator Glass Frame */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg flex flex-col gap-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE5DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53]">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C1810]">Live Surgical Suite Timeline</h3>
              <p className="text-xs text-[#7A6258]">4 Active Operating Theaters • Sterile Turnover Buffer: 18m</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {emergencyOverride ? (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] text-xs font-semibold rounded-xl transition-all shadow-warm-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Schedule Baseline</span>
              </button>
            ) : (
              <button
                onClick={handleTriggerEmergency}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold font-mono rounded-xl transition-all shadow-warm-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 animate-pulse"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Emergency Trauma Override</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Surgical Suites Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suites.map((suite, idx) => {
            const isSelected = selectedSuite === idx;
            return (
              <div
                key={suite.id}
                onClick={() => setSelectedSuite(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFDFC] border-[#E06D53] shadow-warm-md -translate-y-1'
                    : 'bg-[#FAF6F2] border-[#EFE5DC] hover:border-[#E06D53]/40'
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E06D53]">{suite.id}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      suite.status.includes('Emergency')
                        ? 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2] animate-pulse'
                        : suite.status === 'Closing Soon'
                        ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                        : 'bg-[#FFFDFC] text-[#2C1810] border-[#EFE5DC]'
                    }`}>
                      {suite.status}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-[#2C1810] leading-snug">{suite.name}</h4>
                    <span className="text-[11px] text-[#7A6258] mt-0.5">{suite.specialty}</span>
                  </div>

                  {/* Stage Progress Bar */}
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#7A6258]">
                      <span>Progress</span>
                      <span className="font-bold text-[#2C1810]">{suite.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white border border-[#EFE5DC] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${suite.color}`}
                        style={{ width: `${suite.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EFE5DC] flex items-center justify-between text-[10px] font-mono text-[#7A6258]">
                  <span>Lead: {suite.surgeon.split(',')[0]}</span>
                  <span className="text-[#E06D53] font-bold">{suite.turnoverEta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Selected Theater Telemetry Monitor */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6F2] border border-[#EFE5DC] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A59288] font-bold">
              Active Milestone Monitor
            </span>
            <h3 className="text-lg font-bold text-[#2C1810]">{currentSuite.name}</h3>
            <p className="text-xs text-[#E06D53] font-semibold">{currentSuite.phase}</p>
          </div>

          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border border-[#EFE5DC] text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#7A6258]">Anesthesia Gas:</span>
              <span className="font-bold text-[#2C1810]">{currentSuite.anesthesia}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6258]">Blood Bank Status:</span>
              <span className="font-bold text-[#065F46]">{currentSuite.bloodUnits}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-[#7A6258] bg-white p-3.5 rounded-2xl border border-[#EFE5DC]">
            <span className="font-bold text-[#2C1810] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Surgical Quality Standard: Met</span>
            </span>
            <span className="text-[11px] leading-relaxed">
              Sterile checklist digitally signed by Anesthesia Lead {currentSuite.anesthesiologist}.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
