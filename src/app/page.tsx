'use client';

import React from 'react';
import Link from 'next/link';
import { HeroDashboardPreview } from '@/components/HeroDashboardPreview';
import { AllInOneFeatures } from '@/components/AllInOneFeatures';
import { HospitalJourney } from '@/components/HospitalJourney';
import { DepartmentShowcase } from '@/components/DepartmentShowcase';
import { HospitalCalculator } from '@/components/HospitalCalculator';
import { ClinicianPerspectives } from '@/components/ClinicianPerspectives';
import { LiveTelemetryTicker } from '@/components/LiveTelemetryTicker';
import { useHospitalStore } from '@/lib/store';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  Play,
  Heart,
  SlidersHorizontal,
  Clock,
  BedDouble
} from 'lucide-react';

export default function HomePage() {
  const { setIsBookDemoOpen } = useHospitalStore();

  const trustLogos = [
    'CityCare Health',
    'Mercy Memorial',
    'St. Jude Clinical',
    'Apex Surgical Wing',
    'Novacare Pediatrics',
    'Metro Urgent Care'
  ];

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] selection:bg-[#FDEEE9] selection:text-[#E06D53]">
      {/* Real-time Hospital Operations Ticker */}
      <div className="pt-16 sm:pt-20">
        <LiveTelemetryTicker />
      </div>

      {/* ====================================================
          1. HERO SECTION
          ==================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center gap-10 overflow-hidden">
        {/* Soft Ambient Glow (Safe Inline Radial Gradient) */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none rounded-full -z-10 opacity-70"
          style={{
            background: 'radial-gradient(circle, #FDEEE9 0%, rgba(250, 212, 192, 0.4) 50%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        {/* Top Tag Pill with Shimmer & Horizontal Float */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F7D5CA] shimmer-badge shadow-warm-sm text-xs font-semibold text-[#E06D53] animate-float-x cursor-default">
          <Sparkles className="w-3.5 h-3.5 animate-heartbeat text-[#E06D53]" />
          <span className="font-mono uppercase tracking-wider text-[11px]">
            AI-Powered Hospital Operations Platform
          </span>
        </div>

        {/* Hero Editorial Headline */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2C1810] leading-[1.08]">
            Intelligent care.
            <span className="block font-serif italic font-normal text-[#E06D53]">
              Seamless operations.
            </span>
            Better outcomes.
          </h1>
          <p className="text-base sm:text-lg text-[#7A6258] max-w-2xl mx-auto leading-relaxed pt-2">
            Kairo connects clinical, operational, and administrative workflows in one intelligent platform—helping hospitals run more efficiently while keeping patient care at the center.
          </p>
        </div>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={() => setIsBookDemoOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs tracking-wide transition-all shadow-terracotta hover-lift active-press flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/app"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] font-semibold text-xs transition-all shadow-warm-sm hover-lift active-press flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#E06D53] fill-[#E06D53]" />
            <span>Explore Platform</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4 text-xs text-[#7A6258]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E06D53]" />
            <span className="font-semibold text-[#2C1810]">Clinical Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#E06D53]" />
            <span className="font-semibold text-[#2C1810]">AI Assisted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#2C1810]">Secure &amp; Reliable</span>
          </div>
        </div>

        {/* ====================================================
            2. HERO INTERACTIVE DASHBOARD PREVIEW
            ==================================================== */}
        <div className="w-full pt-6">
          <HeroDashboardPreview />
        </div>

        {/* Floating Accent Capsule (Horizontal Float Animation) */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-md text-xs text-[#2C1810] animate-float-x-reverse self-end -mt-8 mr-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono font-semibold">145 Active Beds • 98.4% Claim Rate</span>
        </div>

        {/* Trusted By Health Systems Strip */}
        <div className="w-full pt-16 flex flex-col items-center gap-6 border-t border-[#EFE5DC]">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A59288] font-bold">
            TRUSTED BY CLINICAL TEAMS NATIONWIDE (PORTFOLIO CONCEPT)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            {trustLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-bold text-sm text-[#7A6258] tracking-tight hover:text-[#E06D53] transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          3. ALL-IN-ONE HOSPITAL OS FEATURES (6 CARDS)
          ==================================================== */}
      <AllInOneFeatures />

      {/* ====================================================
          4. INTERACTIVE HOSPITAL CAPACITY & ROI CALCULATOR
          ==================================================== */}
      <HospitalCalculator />

      {/* ====================================================
          5. CONNECTED HOSPITAL JOURNEY (7 STAGES)
          ==================================================== */}
      <HospitalJourney />

      {/* ====================================================
          6. DEPARTMENT SHOWCASE (8 UNITS)
          ==================================================== */}
      <DepartmentShowcase />

      {/* ====================================================
          7. CLINICIAN PERSPECTIVES & CASE TRANSFORMATIONS
          ==================================================== */}
      <ClinicianPerspectives />

      {/* ====================================================
          8. BOTTOM CALL TO ACTION
          ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-br from-white via-[#FDEEE9]/60 to-white border border-[#EFE5DC] shadow-warm-lg flex flex-col items-center text-center gap-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
            JOIN MODERN HEALTHCARE FACILITIES
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810] max-w-3xl leading-tight">
            Elevate hospital operations.
            <span className="block font-serif italic font-normal text-[#E06D53]">
              Empower your clinical staff today.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#7A6258] max-w-xl leading-relaxed">
            Experience how Kairo unifies patient records, smart scheduling, ward beds, inventory, and billing into a single calm interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs tracking-wide transition-all shadow-terracotta hover-lift active-press flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule an Operations Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] font-semibold text-xs transition-all shadow-warm-sm hover-lift active-press flex items-center justify-center gap-2"
            >
              <span>Open Live App Workspace</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
