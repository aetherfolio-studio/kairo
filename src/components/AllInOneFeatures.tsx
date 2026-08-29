'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Activity,
  Receipt,
  Package,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Stethoscope
} from 'lucide-react';

export function AllInOneFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      id: 'patients',
      title: 'Patient Management',
      icon: Users,
      tagline: 'Unified records & history',
      description: 'Unified electronic records, bedside vitals tracking, clinical history, and sub-second patient search.',
      href: '/app/patients',
      preview: {
        badge: 'PATIENT PROFILE',
        headline: 'Robert Johnson • PT-8942',
        sub: 'Cardiology • Room 4B-12',
        stat: 'Stable Vitals: 128/82 mmHg',
        indicator: 'Admitted'
      }
    },
    {
      id: 'appointments',
      title: 'Smart Appointments',
      icon: Calendar,
      tagline: 'Predictive clinical scheduling',
      description: 'Intelligent multi-physician scheduling that automatically predicts procedure buffer times and cuts no-shows.',
      href: '/app/appointments',
      preview: {
        badge: 'DYNAMIC SLOTS',
        headline: 'Elective OR Roster',
        sub: '8 Surgeries • 0 Bottlenecks',
        stat: 'Average Wait: 12 mins',
        indicator: 'Confirmed'
      }
    },
    {
      id: 'clinical',
      title: 'Clinical Operations',
      icon: Activity,
      tagline: 'Error-free care delivery',
      description: 'Streamline multidisciplinary nursing handoffs, laboratory test alerts, and medication administration workflows.',
      href: '/app/departments',
      preview: {
        badge: 'TRIAGE PROTOCOL',
        headline: 'Emergency Resuscitation',
        sub: 'Level 1 Trauma Ready',
        stat: 'Door-to-Doctor: 8 min',
        indicator: 'Active Roster'
      }
    },
    {
      id: 'billing',
      title: 'Billing & Finance',
      icon: Receipt,
      tagline: 'Automated claim cycles',
      description: 'Automate ICD-10 diagnostic coding cross-checks, patient invoices, insurance pre-authorizations, and copay claims.',
      href: '/app/billing',
      preview: {
        badge: 'REVENUE CYCLE',
        headline: 'Daily Claims Reconciliation',
        sub: '$24,560 Billed Today',
        stat: 'Claim Acceptance: 98.4%',
        indicator: 'Reconciled'
      }
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      tagline: 'Real-time supply tracking',
      description: 'Monitor pharmaceutical shelf life, surgical implants, sterile PPE stock, and automated supplier reordering.',
      href: '/app/inventory',
      preview: {
        badge: 'SUPPLY CHAIN',
        headline: 'Central Pharmacy Stock',
        sub: '3,420 Active Units',
        stat: 'Low-Stock Alerts: 1 Item',
        indicator: 'Optimal'
      }
    },
    {
      id: 'reports',
      title: 'Analytics & Reports',
      icon: BarChart3,
      tagline: 'Actionable healthcare data',
      description: 'Executive dashboards tracking bed turnover, average length of stay, clinical quality measures, and physician workloads.',
      href: '/app/reports',
      preview: {
        badge: 'HOSPITAL METRICS',
        headline: 'Bed Occupancy & Turnover',
        sub: '75% Capacity • 24/30 Beds',
        stat: 'Discharge Velocity: 4.2h',
        indicator: 'Weekly Goal Met'
      }
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-16" id="platform">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          ALL-IN-ONE HOSPITAL OS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Everything your hospital needs.
          <span className="block font-serif italic font-normal text-[#E06D53]">
            Connected in one platform.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          Replace fragmented legacy systems with a cohesive operational operating system designed specifically for healthcare teams.
        </p>
      </div>

      {/* 6 Grid Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={feat.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="p-6 rounded-3xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/60 shadow-warm-sm hover:shadow-warm-md hover-lift transition-all duration-300 flex flex-col justify-between gap-6 group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC] group-hover:border-[#E06D53]/30 transition-colors">
                    {feat.tagline}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#7A6258] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Embedded Mini UI Demonstration Widget */}
                <div className="p-3.5 rounded-2xl bg-[#FAF6F2] group-hover:bg-[#FDFBF9] border border-[#EFE5DC] group-hover:border-[#F7D5CA] flex flex-col gap-2 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#E06D53] uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E06D53] animate-pulse"></span>
                      {feat.preview.badge}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white text-[#2C1810] border border-[#EFE5DC] shadow-warm-sm">
                      {feat.preview.indicator}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#2C1810]">{feat.preview.headline}</span>
                    <span className="text-[11px] text-[#7A6258]">{feat.preview.sub}</span>
                  </div>
                  <div className="pt-1.5 border-t border-[#EFE5DC] flex items-center justify-between text-[10px] text-[#7A6258] font-mono">
                    <span className="text-emerald-700 font-semibold">{feat.preview.stat}</span>
                  </div>
                </div>
              </div>

              <Link
                href={feat.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E06D53] hover:text-[#C54E35] group/link active-press"
              >
                <span>Learn more in app</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
