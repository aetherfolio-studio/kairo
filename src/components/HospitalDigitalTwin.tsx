'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Building2,
  Activity,
  BedDouble,
  Clock,
  Sparkles,
  Users,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Layers,
  Eye,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { EcgWaveform } from './EcgWaveform';

export function HospitalDigitalTwin() {
  const { addToast } = useHospitalStore();
  const [selectedWing, setSelectedWing] = useState<'wingA' | 'wingB' | 'wingC' | 'wingD'>('wingA');
  const [inboundTriggered, setInboundTriggered] = useState(false);

  const wingsData = {
    wingA: {
      id: 'wingA',
      name: 'Wing A — Emergency & Level 1 Trauma',
      floor: 'Floor 1 (Ground Level Direct Ambulance Bay)',
      capacity: '18 / 20 Acute Beds Occupied (90%)',
      status: 'High Influx Buffer Active',
      statusColor: 'text-[#EF4444] bg-[#FEF2F2] border-[#FEE2E2]',
      lead: 'Dr. Marcus Vance, MD (Emergency Director)',
      waitTime: '18 mins avg door-to-doctor',
      rooms: [
        { name: 'Trauma Bay 1 (Resuscitation)', status: 'Occupied', patient: 'PT-8942 (Cardiac Event)', vitals: 'HR 118 • SpO2 94%' },
        { name: 'Trauma Bay 2 (Rapid Triage)', status: 'Occupied', patient: 'PT-8831 (Acute Trauma)', vitals: 'HR 92 • BP 130/85' },
        { name: 'Rapid Assessment 03', status: 'Available', patient: 'Sanitized & Ready', vitals: 'Standby Buffer' },
        { name: 'Pediatric ER Suite 04', status: 'Occupied', patient: 'PT-8710 (Asthma Exacerbation)', vitals: 'HR 88 • SpO2 98%' },
      ],
      insight: 'Ambulance dispatch suggests pre-activating 2 swing beds in West Corridors.'
    },
    wingB: {
      id: 'wingB',
      name: 'Wing B — Intensive Care (ICU) & Cardiology',
      floor: 'Floor 3 (Telemetry Critical Care Pods)',
      capacity: '24 / 30 ICU Beds Occupied (80%)',
      status: 'Optimal Telemetry Monitoring',
      statusColor: 'text-[#065F46] bg-[#E8F8F0] border-[#A7F3D0]',
      lead: 'Dr. Sarah Chen, MD (Chief Medical Officer)',
      waitTime: '0 mins (Direct Physician Transfer)',
      rooms: [
        { name: 'ICU Pod 301 (Post-Op Cardiac)', status: 'Occupied', patient: 'PT-8821 (Valve Replacement)', vitals: 'HR 74 • SpO2 99%' },
        { name: 'ICU Pod 302 (Neuro Monitoring)', status: 'Occupied', patient: 'PT-8902 (Craniotomy Post-Op)', vitals: 'ICP 12 mmHg' },
        { name: 'ICU Pod 303 (Isolation Negative Pressure)', status: 'Available', patient: 'Sterile Sanitized', vitals: 'Ready for Admission' },
        { name: 'Step-Down Cardiac 304', status: 'Occupied', patient: 'PT-8611 (Telemetry Stable)', vitals: 'HR 68 • BP 120/80' },
      ],
      insight: '2 stable cardiac patients qualify for afternoon step-down transfer.'
    },
    wingC: {
      id: 'wingC',
      name: 'Wing C — Operating Pavilion & Hybrid OR Suites',
      floor: 'Floor 2 (Sterile Surgical Core)',
      capacity: '6 / 8 OR Theaters In Procedure',
      status: 'Active Surgical Roster',
      statusColor: 'text-[#92400E] bg-[#FEF3C7] border-[#FDE68A]',
      lead: 'Dr. Michael Chang, MD (Chief of Surgery)',
      waitTime: 'On Schedule (Zero Overruns)',
      rooms: [
        { name: 'OR Suite 1 (Cardiothoracic)', status: 'In Procedure', patient: 'CABG Bypass (Dr. Chang)', vitals: 'Stage: Anastomosis' },
        { name: 'OR Suite 2 (Orthopedic Robotics)', status: 'In Procedure', patient: 'Total Hip Arthroplasty', vitals: 'Stage: Implant Seating' },
        { name: 'OR Suite 3 (Laparoscopic General)', status: 'Turnover', patient: 'Sterile Cleaning Cycle', vitals: 'Next: 14:15 PM' },
        { name: 'Hybrid Cath Lab 4', status: 'In Procedure', patient: 'Coronary Angioplasty', vitals: 'Fluoroscopy Active' },
      ],
      insight: 'Sterile turnover time down 14% via automated sanitization dispatch.'
    },
    wingD: {
      id: 'wingD',
      name: 'Wing D — Diagnostic Imaging & Central Pharmacy',
      floor: 'Floor 1 (Sub-level Diagnostic Wing)',
      capacity: '3,420 Pharmaceutical Units Stocked',
      status: 'Automated Dispensing Active',
      statusColor: 'text-[#3730A3] bg-[#EEF2FF] border-[#C7D2FE]',
      lead: 'Dr. David Kim, PharmD (Chief Pharmacist)',
      waitTime: '8 min imaging turnaround',
      rooms: [
        { name: '3T High-Field MRI Scanner A', status: 'Scanning', patient: 'PT-8940 (Brain Protocol)', vitals: 'Time Remaining: 6m' },
        { name: 'Dual-Source 256-Slice CT', status: 'Standby', patient: 'Scheduled Stroke Screen', vitals: 'Contrast Loaded' },
        { name: 'Robotic Pharmacy Carousel', status: 'Dispensing', patient: 'Batch 404 IV Infusions', vitals: 'Automated Barcode' },
        { name: 'Cleanroom Compounding Unit', status: 'Sterile', patient: 'Oncology Chemotherapy Prep', vitals: 'Laminar Flow Active' },
      ],
      insight: 'Omniscan MRI contrast supply replenished to 98% par level.'
    }
  };

  const currentWing = wingsData[selectedWing];

  const handleSimulateAmbulance = () => {
    setInboundTriggered(true);
    addToast({
      title: '🚨 INBOUND TRAUMA DISPATCH (ETA: 4 MINS)',
      description: 'Emergency Trauma Bay 3 reserved. Paged on-call vascular team & blood bank.',
      type: 'warning'
    });
    setTimeout(() => setInboundTriggered(false), 5000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14" id="digital-twin">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          HOSPITAL DIGITAL TWIN
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Interactive facility digital twin.
          <span className="block font-serif italic font-normal text-[#E06D53]">
            Real-time architectural telemetry.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          Navigate CityCare Hospital&apos;s physical wings in real time. Inspect active beds, surgeon rosters, and bedside telemetry waveforms across all 4 operational pods.
        </p>
      </div>

      {/* Main Digital Twin Interactive Frame */}
      <div className="rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Interactive Wing Selector & Blueprint (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FAF6F2] border-r border-[#EFE5DC] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-blip"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2C1810]">
                  CityCare Hospital Blueprint Model 4.2
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#A59288] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E06D53] animate-ping" />
                <span>Live 3D-Feel SVG Map</span>
              </span>
            </div>

            {/* Wing Switcher Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'wingA' as const, label: 'Wing A: Emergency', badge: 'ER / Trauma' },
                { id: 'wingB' as const, label: 'Wing B: ICU & Cardio', badge: 'Critical' },
                { id: 'wingC' as const, label: 'Wing C: Surgery / OR', badge: '6 OR Suites' },
                { id: 'wingD' as const, label: 'Wing D: Imaging', badge: 'Pharmacy' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWing(w.id)}
                  className={`p-2.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer active:scale-95 flex flex-col gap-1 hover-lift ${
                    selectedWing === w.id
                      ? 'bg-white border-[#E06D53] text-[#2C1810] shadow-warm-md -translate-y-1 animate-glow'
                      : 'bg-[#FFFDFC] border-[#EFE5DC] text-[#7A6258] hover:border-[#E06D53]/40'
                  }`}
                >
                  <span className="text-xs font-bold truncate">{w.label}</span>
                  <span className="text-[10px] font-mono text-[#E06D53] font-semibold">{w.badge}</span>
                </button>
              ))}
            </div>

            {/* Visual Isometric Architectural SVG Map */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-white border border-[#EFE5DC] p-4 flex items-center justify-center overflow-hidden shadow-warm-sm">
              <svg viewBox="0 0 500 240" className="w-full h-full">
                <defs>
                  <linearGradient id="blueprintGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FDEEE9" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFDFC" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Central Corridor Hub */}
                <polygon
                  points="250,30 390,100 250,170 110,100"
                  fill="url(#blueprintGrad)"
                  stroke="#EFE5DC"
                  strokeWidth="2"
                />
                <text x="250" y="105" textAnchor="middle" fill="#7A6258" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  CENTRAL MEDICAL ATRIUM
                </text>

                {/* Wing A: Emergency (Bottom Left) */}
                <g
                  onClick={() => setSelectedWing('wingA')}
                  className="cursor-pointer group"
                >
                  <polygon
                    points="110,100 250,170 180,210 40,140"
                    fill={selectedWing === 'wingA' ? '#FDEEE9' : '#FFFDFC'}
                    stroke={selectedWing === 'wingA' ? '#E06D53' : '#E2D3C7'}
                    strokeWidth={selectedWing === 'wingA' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <circle cx="140" cy="155" r="4" fill={selectedWing === 'wingA' ? '#E06D53' : '#A59288'} />
                  {selectedWing === 'wingA' && (
                    <circle cx="140" cy="155" r="10" fill="#E06D53" fillOpacity="0.25" className="animate-beacon" />
                  )}
                  <text x="140" y="175" textAnchor="middle" fill={selectedWing === 'wingA' ? '#E06D53' : '#7A6258'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                    WING A (ER)
                  </text>
                </g>

                {/* Wing B: ICU & Cardio (Top Right) */}
                <g
                  onClick={() => setSelectedWing('wingB')}
                  className="cursor-pointer group"
                >
                  <polygon
                    points="250,30 390,100 460,65 320,-5"
                    fill={selectedWing === 'wingB' ? '#FDEEE9' : '#FFFDFC'}
                    stroke={selectedWing === 'wingB' ? '#E06D53' : '#E2D3C7'}
                    strokeWidth={selectedWing === 'wingB' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <circle cx="355" cy="50" r="4" fill={selectedWing === 'wingB' ? '#E06D53' : '#A59288'} />
                  {selectedWing === 'wingB' && (
                    <circle cx="355" cy="50" r="10" fill="#E06D53" fillOpacity="0.25" className="animate-beacon" />
                  )}
                  <text x="355" y="70" textAnchor="middle" fill={selectedWing === 'wingB' ? '#E06D53' : '#7A6258'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                    WING B (ICU)
                  </text>
                </g>

                {/* Wing C: Surgery OR (Bottom Right) */}
                <g
                  onClick={() => setSelectedWing('wingC')}
                  className="cursor-pointer group"
                >
                  <polygon
                    points="250,170 390,100 460,140 320,210"
                    fill={selectedWing === 'wingC' ? '#FDEEE9' : '#FFFDFC'}
                    stroke={selectedWing === 'wingC' ? '#E06D53' : '#E2D3C7'}
                    strokeWidth={selectedWing === 'wingC' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <circle cx="355" cy="155" r="4" fill={selectedWing === 'wingC' ? '#E06D53' : '#A59288'} />
                  {selectedWing === 'wingC' && (
                    <circle cx="355" cy="155" r="10" fill="#E06D53" fillOpacity="0.25" className="animate-beacon" />
                  )}
                  <text x="355" y="175" textAnchor="middle" fill={selectedWing === 'wingC' ? '#E06D53' : '#7A6258'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                    WING C (OR)
                  </text>
                </g>

                {/* Wing D: Imaging & Pharmacy (Top Left) */}
                <g
                  onClick={() => setSelectedWing('wingD')}
                  className="cursor-pointer group"
                >
                  <polygon
                    points="110,100 250,30 180,-5 40,65"
                    fill={selectedWing === 'wingD' ? '#FDEEE9' : '#FFFDFC'}
                    stroke={selectedWing === 'wingD' ? '#E06D53' : '#E2D3C7'}
                    strokeWidth={selectedWing === 'wingD' ? '2.5' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <circle cx="140" cy="50" r="4" fill={selectedWing === 'wingD' ? '#E06D53' : '#A59288'} />
                  {selectedWing === 'wingD' && (
                    <circle cx="140" cy="50" r="10" fill="#E06D53" fillOpacity="0.25" className="animate-beacon" />
                  )}
                  <text x="140" y="70" textAnchor="middle" fill={selectedWing === 'wingD' ? '#E06D53' : '#7A6258'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                    WING D (PACS)
                  </text>
                </g>

                {/* Simulated Inbound Ambulance Trajectory with stream animation */}
                {inboundTriggered && (
                  <g className="animate-in fade-in">
                    <line x1="10" y1="200" x2="110" y2="150" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="6 6" className="animate-data-stream" />
                    <circle cx="110" cy="150" r="8" fill="#EF4444" className="animate-ping" />
                    <text x="60" y="165" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold" className="animate-strobe">
                      INBOUND RESCUE
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Simulation Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EFE5DC]">
            <div className="flex items-center gap-2 text-xs text-[#7A6258]">
              <Radio className="w-3.5 h-3.5 text-[#E06D53] animate-pulse" />
              <span>Interactive Telemetry: Click any wing to explore rooms.</span>
            </div>

            <button
              onClick={handleSimulateAmbulance}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FDEEE9] text-[#E06D53] border border-[#F7D5CA] text-xs font-bold font-mono shadow-warm-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 hover-lift hover-glow"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] animate-strobe" />
              <span>Simulate Inbound Ambulance</span>
            </button>
          </div>
        </div>

        {/* Right Active Wing Deep Telemetry Stream (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col gap-5">
            {/* Header info */}
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#EFE5DC]">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentWing.statusColor}`}>
                  {currentWing.status}
                </span>
                <span className="text-xs font-mono text-[#7A6258]">{currentWing.floor}</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C1810] leading-snug">{currentWing.name}</h3>
              <span className="text-xs text-[#7A6258]">Unit Director: {currentWing.lead}</span>
            </div>

            {/* Continuous Live ECG Telemetry Ribbon */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col gap-1.5 shadow-warm-sm">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#E06D53] font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-heartbeat text-[#E06D53]" />
                  <span>Bedside Telemetry Channel 01</span>
                </span>
                <span className="text-[#065F46] font-bold">HR 74 bpm • Sinus Normal</span>
              </div>
              <EcgWaveform className="h-8 w-full" strokeColor="#E06D53" />
            </div>

            {/* Live Room / Pod Matrix */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A59288] font-bold">
                Active Ward Pods &amp; Procedure Rooms
              </span>
              <div className="flex flex-col gap-2">
                {currentWing.rooms.map((room, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm flex items-center justify-between gap-2 text-xs transition-all duration-200 hover:translate-x-1"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[#2C1810] truncate">{room.name}</span>
                      <span className="text-[11px] text-[#7A6258] truncate">{room.patient}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        room.status === 'Occupied' || room.status === 'In Procedure' || room.status === 'Scanning'
                          ? 'bg-[#FDEEE9] text-[#E06D53]'
                          : room.status === 'Available' || room.status === 'Sterile'
                          ? 'bg-[#E8F8F0] text-[#065F46]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}>
                        {room.status}
                      </span>
                      <span className="text-[9px] font-mono text-[#A59288] mt-0.5">{room.vitals}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Operational Recommendation Callout */}
          <div className="p-3.5 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-start gap-2.5 text-xs shadow-warm-sm animate-float">
            <Sparkles className="w-4 h-4 text-[#E06D53] shrink-0 mt-0.5 animate-heartbeat" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#E06D53] font-mono uppercase text-[10px]">
                Predictive Telemetry Recommendation
              </span>
              <p className="text-[#2C1810] text-[11px] leading-relaxed">
                {currentWing.insight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
