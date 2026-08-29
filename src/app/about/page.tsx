'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart, ShieldCheck, Stethoscope, Compass, Activity, Feather } from 'lucide-react';
import { useHospitalStore } from '@/lib/store';

export default function AboutPage() {
  const { setIsBookDemoOpen } = useHospitalStore();

  const principles = [
    {
      title: 'Calm Software for High-Stakes Environments',
      desc: 'Hospital wards are already loud, sensory-intense environments. Software should never add to cognitive fatigue with harsh neons, frantic alarms, or cluttered toolbars.',
      icon: Feather
    },
    {
      title: 'Connected Clinical Context',
      desc: 'When a doctor opens a patient’s record, they should see their latest bedside vitals, active medications, pending imaging scans, and nursing notes in one unified stream.',
      icon: Activity
    },
    {
      title: 'Operational Assistance Over Hype',
      desc: 'We do not believe in replacing doctors with black-box AI. We believe in empowering hospital administrators with predictive capacity tools that solve real bottlenecks.',
      icon: Compass
    },
    {
      title: 'Built with Uncompromising Reliability',
      desc: 'Every millisecond of latency in healthcare operations matters. Kairo is built on high-performance architecture with sub-50ms data queries and strict record integrity.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] self-start">
            PRODUCT PHILOSOPHY & CRAFT
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2C1810] leading-tight">
            We build software for teams who hold lives in their hands.
          </h1>
          <p className="text-base sm:text-lg text-[#7A6258] leading-relaxed max-w-2xl">
            Kairo was conceived to solve a critical crisis in healthcare: clinicians and hospital administrators spend more time fighting clunky legacy software than focusing on patient recovery.
          </p>
        </div>

        {/* The Thesis Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#2C1810]">The Kairo Hospital OS Thesis</h2>
          <div className="flex flex-col gap-4 text-sm sm:text-base text-[#7A6258] leading-relaxed">
            <p>
              Over the past two decades, hospital IT systems fractured into dozens of disconnected, uncommunicative silos. A patient’s arrival is tracked in one legacy system, their surgical notes in another, bed capacity on a physical whiteboard, and billing on an outdated mainframe.
            </p>
            <p>
              When operational data is fragmented, administrative friction mounts. Nurses spend hours manually cross-checking prescriptions, and critical ICU beds sit empty awaiting multi-step discharge approvals.
            </p>
            <p className="text-[#2C1810] font-semibold">
              Kairo reconnects the operational nervous system of the hospital. By bringing patients, appointments, wards, inventory, and billing into one intelligent operating system, healthcare teams gain the calm and clarity they deserve.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold">
              Our Design Pillars
            </span>
            <h2 className="text-3xl font-bold text-[#2C1810]">How we engineer Kairo</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#2C1810]">{item.title}</h3>
                  <p className="text-xs text-[#7A6258] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-[#FDEEE9]/50 to-white border border-[#EFE5DC] text-center flex flex-col items-center gap-6 shadow-warm-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C1810]">Experience Kairo Hospital OS</h2>
          <p className="text-xs sm:text-sm text-[#7A6258] max-w-md">
            Explore our interactive hospital dashboard, patient directory, and clinical scheduling.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold transition-all shadow-terracotta cursor-pointer"
          >
            <span>Open Application Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
