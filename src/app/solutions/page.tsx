'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Stethoscope,
  Activity,
  Network,
  ArrowRight,
  CheckCircle2,
  Calendar,
  BedDouble,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useHospitalStore } from '@/lib/store';

export default function SolutionsPage() {
  const { setIsBookDemoOpen } = useHospitalStore();

  const solutions = [
    {
      id: 'hospitals',
      title: 'For General & Community Hospitals',
      badge: '50 to 500+ Beds',
      icon: Building2,
      tagline: 'Connect emergency triage, inpatient wards, and surgical suites.',
      description: 'Community hospitals juggle hundreds of inpatient admissions, variable ER surges, and multi-department transfers. Kairo unifies bed management, scheduling, and billing into one operational view.',
      benefits: [
        'Real-time bed turnover alerts between nursing and sanitization teams',
        'Predictive emergency room volume smoothing to prevent staff burnout',
        'Automated ICD-10 itemized billing reconciliation prior to patient discharge'
      ]
    },
    {
      id: 'clinics',
      title: 'For Specialty & Surgical Clinics',
      badge: 'Outpatient & Ambulatory',
      icon: Stethoscope,
      tagline: 'Maximize operating room utilization and eliminate consultation delays.',
      description: 'Specialty practices demand tight scheduling precision. Kairo dynamically calculates average procedure durations to prevent consultation overruns and reduce patient wait times.',
      benefits: [
        'Dynamic multi-physician schedule buffers that adapt to actual procedure times',
        'Automated patient SMS confirmations and digital pre-visit intake forms',
        'Unified imaging and lab diagnostics attached directly to patient appointment charts'
      ]
    },
    {
      id: 'emergency',
      title: 'For Emergency & Urgent Care Centers',
      badge: 'Acute Resuscitation',
      icon: Activity,
      tagline: 'Accelerate door-to-doctor times with intelligent triage queues.',
      description: 'In acute care environments, every second counts. Kairo prioritizes patient flow by acuity scoring, auto-alerts on-call specialists, and reserves critical care buffers.',
      benefits: [
        'Acuity-based triage queue tracking with sub-second status updates',
        'Automated trauma team and specialty surgeon paging triggers',
        'Seamless electronic step-up transfer protocols to intensive care units'
      ]
    },
    {
      id: 'networks',
      title: 'For Multi-Facility Healthcare Networks',
      badge: 'Enterprise Health Systems',
      icon: Network,
      tagline: 'Orchestrate bed capacity and clinical staff across multiple hospital campuses.',
      description: 'Regional health networks need high-level visibility across multiple physical hospitals. Kairo allows central operations centers to balance bed occupancy and staff across campuses.',
      benefits: [
        'Multi-facility bed occupancy dashboard with inter-hospital transfer coordination',
        'Centralized medical supply inventory monitors with inter-branch rebalancing',
        'Enterprise analytics tracking clinical quality metrics and physician efficiency'
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA]">
            TAILORED CLINICAL SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2C1810] leading-tight">
            Designed for the realities of modern healthcare.
          </h1>
          <p className="text-base sm:text-lg text-[#7A6258] leading-relaxed">
            Whether you operate an independent specialty clinic or a multi-campus hospital network, Kairo removes administrative friction so clinicians can focus on care.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.id}
                id={sol.id}
                className="p-8 rounded-3xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between gap-8 group"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                      {sol.badge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-bold text-[#2C1810]">{sol.title}</h3>
                    <p className="text-xs font-semibold text-[#E06D53]">{sol.tagline}</p>
                    <p className="text-xs sm:text-sm text-[#7A6258] leading-relaxed pt-2">
                      {sol.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-[#EFE5DC]">
                    {sol.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#2C1810]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E06D53] hover:text-[#C54E35] group/btn"
                >
                  <span>Explore this workflow in live app</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-[#FDEEE9]/50 to-white border border-[#EFE5DC] shadow-warm-md flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C1810]">
            Ready to see how Kairo fits your facility?
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6258] max-w-lg">
            Schedule an interactive demonstration with our healthcare solutions team.
          </p>
          <button
            onClick={() => setIsBookDemoOpen(true)}
            className="px-7 py-3.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs transition-all shadow-terracotta cursor-pointer"
          >
            Book a Demo Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
}
