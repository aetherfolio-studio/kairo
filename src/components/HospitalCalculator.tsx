'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  BedDouble,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function HospitalCalculator() {
  const { setIsBookDemoOpen } = useHospitalStore();
  const [beds, setBeds] = useState(120);
  const [encounters, setEncounters] = useState(35000);

  // Dynamic calculated formulas
  const hoursSavedPerNurse = Math.round((beds * 0.12 + 12) * 10) / 10;
  const turnoverGainPercent = Math.min(38, Math.round(20 + (beds / 500) * 15));
  const estimatedSavings = Math.round((beds * 2400 + encounters * 4.2) / 1000) * 1000;
  const waitReductionMins = Math.round(10 + (encounters / 150000) * 12);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14" id="calculator">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          INTERACTIVE ROI &amp; CAPACITY ESTIMATOR
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Estimate your facility&apos;s operational gains.
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          See how automating clinical scheduling, bed turnover, and itemized billing impacts your hospital&apos;s bottom line and clinician satisfaction.
        </p>
      </div>

      {/* Calculator Interactive Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Sliders Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider font-mono">
                Licensed Inpatient Beds
              </label>
              <span className="px-3 py-1 rounded-xl bg-[#FDEEE9] text-[#E06D53] font-mono font-bold text-sm border border-[#F7D5CA]">
                {beds} Beds
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={500}
              step={5}
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className="w-full accent-[#E06D53] cursor-pointer h-2 bg-[#FAF6F2] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A59288]">
              <span>25 (Clinic)</span>
              <span>250 (General)</span>
              <span>500+ (Regional)</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider font-mono">
                Annual Patient Encounters
              </label>
              <span className="px-3 py-1 rounded-xl bg-[#FDEEE9] text-[#E06D53] font-mono font-bold text-sm border border-[#F7D5CA]">
                {encounters.toLocaleString()} Visits
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={2500}
              value={encounters}
              onChange={(e) => setEncounters(Number(e.target.value))}
              className="w-full accent-[#E06D53] cursor-pointer h-2 bg-[#FAF6F2] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A59288]">
              <span>5k / yr</span>
              <span>75k / yr</span>
              <span>150k+ / yr</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] text-xs text-[#7A6258] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Based on empirical clinical time-motion benchmarks across 40+ acute care and specialty hospital departments.
            </p>
          </div>
        </div>

        {/* Right Output Dashboard Cards (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Hours Saved */}
            <div className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Admin Time Recovered</span>
                <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#2C1810] tracking-tight">
                  {hoursSavedPerNurse}
                </span>
                <span className="text-xs text-[#7A6258] font-mono">hrs / clinician / mo</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-mono font-medium">
                Eliminates repetitive EHR chart re-entry
              </span>
            </div>

            {/* 2. Bed Turnover */}
            <div className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Bed Turnover Velocity</span>
                <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <BedDouble className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#2C1810] tracking-tight">
                  +{turnoverGainPercent}%
                </span>
                <span className="text-xs text-[#7A6258] font-mono">faster discharge</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-mono font-medium">
                Automatic nurse &amp; sanitation alerts
              </span>
            </div>

            {/* 3. Estimated Savings */}
            <div className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Est. Operational Savings</span>
                <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#2C1810] tracking-tight">
                  ${estimatedSavings.toLocaleString()}
                </span>
                <span className="text-xs text-[#7A6258] font-mono">/ year</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-mono font-medium">
                Reduced billing leakage &amp; idle OR suites
              </span>
            </div>

            {/* 4. Door to doctor wait */}
            <div className="p-5 rounded-2xl bg-[#FFFDFC] border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Door-to-Doctor Reduction</span>
                <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#2C1810] tracking-tight">
                  -{waitReductionMins}m
                </span>
                <span className="text-xs text-[#7A6258] font-mono">average wait</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-mono font-medium">
                Dynamic predictive queue buffering
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA]">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E06D53] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2C1810]">
                  Get a detailed capacity breakdown for your hospital
                </span>
                <span className="text-[11px] text-[#7A6258]">
                  Our clinical team will simulate your department roster.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold shadow-terracotta transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Request Custom ROI Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
