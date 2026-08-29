'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  Users,
  Receipt,
  Package,
  Quote,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

export function ClinicianPerspectives() {
  const [activeRole, setActiveRole] = useState(0);

  const perspectives = [
    {
      role: 'Chief Medical Officer',
      name: 'Dr. Sarah Chen, MD',
      hospital: 'Metro Health Memorial (320 Beds)',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      icon: Stethoscope,
      quote: 'Before Kairo, our clinical rounds were bogged down by four different legacy software logins. Now our physicians review vitals, schedule buffer slots, and sign off on step-down transfers in seconds without cognitive fatigue.',
      before: 'Physicians spent 2.5 hours per shift wrestling with fragmented EHR tabs.',
      after: 'Unified patient stream reduced chart review latency to under 30 seconds.',
      metric: '38% less clinician burnout'
    },
    {
      role: 'Nurse Supervisor & Bed Director',
      name: 'Elena Rostova, RN, BSN',
      hospital: 'CityCare Surgical Pavilion (180 Beds)',
      avatar: 'https://images.unsplash.com/photo-1594824813576-8509c2a688eb?w=150&auto=format&fit=crop&q=80',
      icon: Users,
      quote: 'The real-time bed telemetry and instant sanitization dispatch completely eliminated the chaos during shift changes. We always know which beds are open, reserved, or being sterilized across all 8 wards.',
      before: 'Used physical whiteboards and phone calls to find available beds.',
      after: 'Sub-second digital telemetry with automatic step-down checklists.',
      metric: '35 min average bed turnover'
    },
    {
      role: 'Hospital CFO & Operations Lead',
      name: 'Marcus Vance, MBA',
      hospital: 'Summit Health Network (4 Campuses)',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      icon: Receipt,
      quote: 'Itemized billing and real-time ICD-10 cross-referencing gave our revenue cycle team 98% first-pass claim acceptance. We recovered hundreds of thousands in unbilled procedural consumables.',
      before: 'Claims backlog took 45 days of manual audits to reconcile.',
      after: 'Real-time ledger sync generates verified claims at discharge.',
      metric: '98.4% first-pass claim rate'
    },
    {
      role: 'Chief Pharmacy Officer',
      name: 'Dr. David Kim, PharmD',
      hospital: 'Apex Regional Medical Center',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      icon: Package,
      quote: 'Automated threshold triggers ensure sterile surgical implants and high-demand pharmaceuticals are re-ordered before stockouts occur, while preventing expired medication waste.',
      before: 'Manual clipboards led to emergency stock runs and expired lot write-offs.',
      after: 'Predictive consumption modeling alerts our buyers automatically.',
      metric: 'Zero sterile supply stockouts'
    }
  ];

  const current = perspectives[activeRole];
  const Icon = current.icon;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-14">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          CLINICIAN PERSPECTIVES
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Built with clinicians.
          <span className="block font-serif italic font-normal text-[#E06D53]">
            Validated in the ward.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          See how hospital leaders, physicians, and nurse coordinators experience the transition to calm operational software.
        </p>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {perspectives.map((p, idx) => {
          const isSelected = activeRole === idx;
          const TabIcon = p.icon;
          return (
            <button
              key={p.role}
              onClick={() => setActiveRole(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-[#E06D53] text-white shadow-terracotta'
                  : 'bg-white text-[#7A6258] hover:text-[#2C1810] border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{p.role}</span>
            </button>
          );
        })}
      </div>

      {/* Testimonial & Comparison Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
        {/* Left Testimonial (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-10 h-10 rounded-2xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
            <Quote className="w-5 h-5" />
          </div>

          <blockquote className="text-lg sm:text-xl font-medium text-[#2C1810] leading-relaxed">
            &quot;{current.quote}&quot;
          </blockquote>

          <div className="flex items-center gap-4 pt-4 border-t border-[#EFE5DC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.avatar}
              alt={current.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#EFE5DC]"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#2C1810]">{current.name}</span>
              <span className="text-xs text-[#E06D53] font-semibold">{current.role}</span>
              <span className="text-[11px] text-[#7A6258]">{current.hospital}</span>
            </div>
          </div>
        </div>

        {/* Right Before vs After Matrix (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 p-6 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC]">
          <span className="text-xs font-mono uppercase tracking-wider text-[#A59288] font-bold">
            Operational Transformation
          </span>

          <div className="flex flex-col gap-3">
            {/* Before */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EFE5DC] flex flex-col gap-1 shadow-warm-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#991B1B]">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Legacy Operational Status</span>
              </div>
              <p className="text-xs text-[#7A6258] leading-relaxed">
                {current.before}
              </p>
            </div>

            {/* After */}
            <div className="p-3.5 rounded-xl bg-[#E8F8F0] border border-[#A7F3D0] flex flex-col gap-1 shadow-warm-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#065F46]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>With Kairo Hospital OS</span>
              </div>
              <p className="text-xs text-[#065F46]/90 leading-relaxed">
                {current.after}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#EFE5DC] flex items-center justify-between text-xs font-mono font-bold text-[#2C1810]">
            <span className="text-[#7A6258]">Key Result:</span>
            <span className="text-[#E06D53]">{current.metric}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
