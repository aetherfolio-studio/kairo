'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Activity,
  BedDouble,
  Receipt,
  Package,
  Scissors,
  Radio,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function HospitalNeuralGraph() {
  const [activeNode, setActiveNode] = useState<'er' | 'icu' | 'or' | 'pharmacy' | 'billing'>('icu');

  const nodeDetails = {
    er: {
      title: 'Emergency Triage & Patient Intake Node',
      metric: '18 min Door-to-Doctor • 90% Capacity',
      aiAction: 'Pre-allocating 4 swing beds in Ward 2A to buffer anticipated weekend respiratory surge.',
      signals: ['Acuity Score 2 Resuscitation Active', 'Ambulance GPS Telemetry Connected', 'Fast-track Triage Bay 3 Standby']
    },
    icu: {
      title: 'Intensive Care (ICU) & Telemetry Node',
      metric: '24 / 30 Beds Occupied (80%)',
      aiAction: 'Identified 2 post-op CABG patients meeting stable criteria for 14:00 step-down transfer.',
      signals: ['Continuous SpO2 & Arterial Line Sync', 'Negative Pressure Pod 303 Sanitized', 'Automated Nurse Handoff Report Ready']
    },
    or: {
      title: 'Operating Pavilion & Surgical Matrix Node',
      metric: '6 / 8 Theaters In Procedure',
      aiAction: 'Turnover between CABG and Orthopedic cases optimized to 18 mins with automated sterile prep.',
      signals: ['Anesthesia Sevoflurane Vaporizer Synced', 'MAKO Robotics Calibration Verified', 'Blood Bank 4-Unit Reserve Allocated']
    },
    pharmacy: {
      title: 'Pharmacy & Sterile Supply Chain Node',
      metric: '3,420 Units In Stock • 1 Restock Trigger',
      aiAction: 'Automated supplier reorder dispatched for Omniscan MRI Contrast Agent before stockout threshold.',
      signals: ['Robotic Dispensing Carousel Online', 'Controlled Substance Double-Sign Logged', 'Cleanroom Compounding HVAC Optimal']
    },
    billing: {
      title: 'Revenue Cycle & Claims Automation Node',
      metric: '$24,560 Billed Today • 98.4% Acceptance',
      aiAction: 'Auto-coded itemized procedure consumables during wound closure for instant discharge invoicing.',
      signals: ['ICD-10 Code Cross-Validation Clear', 'Pre-authorization Insurance Ping: Approved', 'Real-time Ledger Reconciliation Done']
    }
  };

  const current = nodeDetails[activeNode];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14" id="neural-graph">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          NEURAL OPERATIONS CORE
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          The intelligent hospital nervous system.
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          Kairo synthesizes data across emergency, surgery, wards, pharmacy, and billing into one interconnected operational graph.
        </p>
      </div>

      {/* Main Neural Graph Frame */}
      <div className="p-6 sm:p-12 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Interactive Visual Graph (7 cols) */}
        <div className="lg:col-span-7 relative h-80 sm:h-96 w-full rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] p-4 flex items-center justify-center overflow-hidden shadow-warm-sm">
          {/* Background Ambient Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#E2D3C7_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* SVG Connection Lines & Active Streaming Particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320">
            {/* Marching dashed data stream lines */}
            <line x1="200" y1="160" x2="80" y2="70" stroke={activeNode === 'er' ? '#E06D53' : '#E2D3C7'} strokeWidth={activeNode === 'er' ? '3' : '1.5'} strokeDasharray="6 6" className="animate-data-stream" />
            <line x1="200" y1="160" x2="320" y2="70" stroke={activeNode === 'icu' ? '#E06D53' : '#E2D3C7'} strokeWidth={activeNode === 'icu' ? '3' : '1.5'} strokeDasharray="6 6" className="animate-data-stream" />
            <line x1="200" y1="160" x2="330" y2="250" stroke={activeNode === 'or' ? '#E06D53' : '#E2D3C7'} strokeWidth={activeNode === 'or' ? '3' : '1.5'} strokeDasharray="6 6" className="animate-data-stream" />
            <line x1="200" y1="160" x2="70" y2="250" stroke={activeNode === 'pharmacy' ? '#E06D53' : '#E2D3C7'} strokeWidth={activeNode === 'pharmacy' ? '3' : '1.5'} strokeDasharray="6 6" className="animate-data-stream" />
            <line x1="200" y1="160" x2="200" y2="280" stroke={activeNode === 'billing' ? '#E06D53' : '#E2D3C7'} strokeWidth={activeNode === 'billing' ? '3' : '1.5'} strokeDasharray="6 6" className="animate-data-stream" />

            {/* Radar Scan Circle in Background */}
            <circle cx="200" cy="160" r="70" fill="none" stroke="#F7D5CA" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="160" r="115" fill="none" stroke="#EFE5DC" strokeWidth="1" />
          </svg>

          {/* Center Pulsating Kairo Core Node with concentric beacons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="relative">
              <span className="absolute -inset-2 rounded-3xl bg-[#E06D53]/20 animate-beacon pointer-events-none" />
              <div className="w-16 h-16 rounded-3xl bg-[#FDEEE9] border-2 border-[#E06D53] flex items-center justify-center text-[#E06D53] shadow-terracotta animate-heartbeat">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#2C1810] mt-2 bg-white/95 px-2.5 py-0.5 rounded-full border border-[#EFE5DC] shadow-warm-sm animate-float">
              KAIRO CORE
            </span>
          </div>

          {/* Node 1: Emergency (Top Left) */}
          <button
            onClick={() => setActiveNode('er')}
            className={`absolute top-4 left-4 sm:top-8 sm:left-8 p-3 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2 hover-lift ${
              activeNode === 'er'
                ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-terracotta scale-105 animate-glow'
                : 'bg-white text-[#2C1810] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
            }`}
          >
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold">Emergency (ER)</span>
          </button>

          {/* Node 2: ICU & Cardio (Top Right) */}
          <button
            onClick={() => setActiveNode('icu')}
            className={`absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2 hover-lift ${
              activeNode === 'icu'
                ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-terracotta scale-105 animate-glow'
                : 'bg-white text-[#2C1810] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span className="text-xs font-bold">ICU Telemetry</span>
          </button>

          {/* Node 3: Operating Theater (Bottom Right) */}
          <button
            onClick={() => setActiveNode('or')}
            className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 p-3 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2 hover-lift ${
              activeNode === 'or'
                ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-terracotta scale-105 animate-glow'
                : 'bg-white text-[#2C1810] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span className="text-xs font-bold">Surgical Suites</span>
          </button>

          {/* Node 4: Pharmacy (Bottom Left) */}
          <button
            onClick={() => setActiveNode('pharmacy')}
            className={`absolute bottom-4 left-4 sm:bottom-8 sm:left-8 p-3 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2 hover-lift ${
              activeNode === 'pharmacy'
                ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-terracotta scale-105 animate-glow'
                : 'bg-white text-[#2C1810] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-xs font-bold">Pharmacy Supply</span>
          </button>

          {/* Node 5: Billing (Bottom Center) */}
          <button
            onClick={() => setActiveNode('billing')}
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-1.5 hover-lift ${
              activeNode === 'billing'
                ? 'bg-[#E06D53] text-white border-[#E06D53] shadow-terracotta scale-105 animate-glow'
                : 'bg-white text-[#2C1810] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">Revenue Cycle</span>
          </button>
        </div>

        {/* Right Active Node Live Intelligence Log (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E06D53] px-2.5 py-0.5 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
                Live Connected Stream
              </span>
              <span className="text-xs font-mono text-[#7A6258] flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="font-bold text-emerald-700">Synchronized</span>
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#2C1810]">{current.title}</h3>
              <p className="text-xs font-mono text-[#E06D53] font-bold">{current.metric}</p>
            </div>

            {/* AI Reasoning Log */}
            <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col gap-2 shadow-warm-sm">
              <span className="text-[10px] font-mono font-bold text-[#7A6258] uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E06D53] animate-heartbeat" />
                <span>Active Algorithmic Optimization</span>
              </span>
              <p className="text-xs text-[#2C1810] leading-relaxed">
                {current.aiAction}
              </p>
            </div>

            {/* Live Signals List */}
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A59288] font-bold">
                Synchronized Clinical Signals
              </span>
              {current.signals.map((sig, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#2C1810] hover:translate-x-1 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFDFC] border border-[#EFE5DC] flex items-center justify-between text-xs text-[#7A6258] shadow-warm-sm">
            <span className="font-mono text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-blip" />
              <span>Telemetry Latency: &lt; 28ms</span>
            </span>
            <span className="text-[#E06D53] font-bold font-mono">Zero EHR Silos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
