'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Users,
  Activity,
  Heart,
  Play,
  CheckCircle2,
  Lock,
  Stethoscope,
  Clock
} from 'lucide-react';
import { HeroDashboardPreview } from '@/components/HeroDashboardPreview';
import { AllInOneFeatures } from '@/components/AllInOneFeatures';
import { HospitalJourney } from '@/components/HospitalJourney';
import { DepartmentShowcase } from '@/components/DepartmentShowcase';
import { useHospitalStore } from '@/lib/store';

export default function HomePage() {
  const { setIsBookDemoOpen } = useHospitalStore();

  const trustPartners = [
    { name: 'CityCare Hospital', type: 'Tertiary Medical Center' },
    { name: 'Greenview Medical Center', type: 'Regional Healthcare' },
    { name: 'Lifeline Clinics', type: 'Outpatient Network' },
    { name: 'Sunrise Hospitals', type: 'Specialty Orthopedic' },
    { name: 'HealthPlus Network', type: 'Integrated Health' }
  ];

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810]">
      {/* ====================================================
          1. HERO SECTION
          ==================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle Ambient Warm Glow behind Hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#FDEEE9] via-[#FAD4C0]/40 to-transparent blur-[140px] pointer-events-none rounded-full -z-10"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] text-xs font-mono text-[#E06D53] font-semibold shadow-warm-sm">
            <span className="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span>AI-POWERED HOSPITAL MANAGEMENT</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2C1810] leading-[1.08] max-w-3xl">
            Intelligent care.
            <span className="block">Seamless operations.</span>
            <span className="font-serif italic font-normal text-[#E06D53]">
              Better outcomes.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#7A6258] font-normal max-w-2xl leading-relaxed">
            Kairo connects clinical, operational, and administrative workflows in one intelligent platform—helping hospitals run more efficiently while keeping care at the center.
          </p>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full sm:w-auto">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-terracotta hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF6F2] text-[#2C1810] font-semibold text-xs sm:text-sm border border-[#EFE5DC] transition-all duration-200 shadow-warm-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#E06D53] fill-[#E06D53]" />
              <span>Explore Platform</span>
            </Link>
          </div>

          {/* Sub Trust & Product Quality Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-medium text-[#7A6258]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EFE5DC] shadow-warm-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E06D53]" />
              <span>Clinical Operations</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EFE5DC] shadow-warm-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E06D53]" />
              <span>AI Assisted</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EFE5DC] shadow-warm-sm">
              <Lock className="w-3.5 h-3.5 text-[#E06D53]" />
              <span>Secure & Reliable</span>
            </div>
          </div>

          {/* Trust Caption */}
          <div className="flex items-center gap-3 pt-2 text-xs text-[#7A6258]">
            <div className="flex -space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&auto=format&fit=crop&q=80" alt="Doctor" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&auto=format&fit=crop&q=80" alt="Doctor" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=80&auto=format&fit=crop&q=80" alt="Doctor" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
            </div>
            <span>Trusted by leading healthcare teams & clinics across the country (concept)</span>
          </div>
        </div>

        {/* ====================================================
            2. HERO PRODUCT DASHBOARD VISUAL
            ==================================================== */}
        <div className="w-full mt-14 relative z-10" id="preview">
          <HeroDashboardPreview />
        </div>
      </section>

      {/* ====================================================
          3. TRUSTED HEALTHCARE PROVIDERS STRIP
          ==================================================== */}
      <section className="py-10 border-y border-[#EFE5DC] bg-[#FAF6F2] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7A6258]">
          <span className="font-mono uppercase tracking-wider font-semibold text-[#A59288] shrink-0">
            TRUSTED BY MODERN HEALTHCARE TEAMS:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 font-semibold text-[#2C1810]">
            {trustPartners.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2 hover:text-[#E06D53] transition-colors">
                <Building2 className="w-4 h-4 text-[#E06D53]" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          4. ALL-IN-ONE HOSPITAL OS FEATURES
          ==================================================== */}
      <AllInOneFeatures />

      {/* ====================================================
          5. CONNECTED PATIENT JOURNEY FLOW
          ==================================================== */}
      <HospitalJourney />

      {/* ====================================================
          6. CLINICAL DEPARTMENTS BREAKDOWN
          ==================================================== */}
      <DepartmentShowcase />

      {/* ====================================================
          7. BOTTOM CALL TO ACTION
          ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#FFFDFC] via-[#FDEEE9]/60 to-[#FFFDFC] border border-[#EFE5DC] shadow-warm-lg flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E06D53] flex items-center justify-center text-white shadow-terracotta">
            <Stethoscope className="w-6 h-6" />
          </div>

          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2C1810]">
              Ready to modernize your hospital&apos;s operational core?
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6258] leading-relaxed">
              Experience the clarity, calm, and efficiency of Kairo Hospital OS. Explore the live web application or schedule a demo walkthrough.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="px-7 py-3.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs sm:text-sm transition-all shadow-terracotta cursor-pointer"
            >
              Book a Facility Demo
            </button>
            <Link
              href="/app"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF6F2] text-[#2C1810] font-semibold text-xs sm:text-sm border border-[#EFE5DC] transition-all shadow-warm-sm"
            >
              Launch Live App Workspace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
