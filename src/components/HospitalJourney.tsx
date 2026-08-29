'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  Building2,
  Stethoscope,
  Receipt,
  LogOut,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function HospitalJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Patient Arrives',
      icon: UserCheck,
      desc: 'Self check-in kiosk or desk reception matches identity with digital health records instantly via photo or QR code.',
      metric: '< 45s Check-in'
    },
    {
      num: '02',
      title: 'Smart Appointment',
      icon: Calendar,
      desc: 'Predictive queue algorithm assigns optimal waiting room slot and updates the physician schedule buffer.',
      metric: 'Zero Overbooking'
    },
    {
      num: '03',
      title: 'Department Roster',
      icon: Building2,
      desc: 'Patient is routed to the designated ward or imaging suite with dynamic room and nurse station allocation.',
      metric: 'Auto-bed Routing'
    },
    {
      num: '04',
      title: 'Clinical Workflow',
      icon: Stethoscope,
      desc: 'Physician documents vitals, orders lab diagnostic panels, and enters clinical observations into a calm interface.',
      metric: 'No Duplicate Data'
    },
    {
      num: '05',
      title: 'Billing & Claims',
      icon: Receipt,
      desc: 'Real-time diagnosis coding auto-populates itemized insurance claims and copay invoices before patient departs.',
      metric: '98% First-pass Claims'
    },
    {
      num: '06',
      title: 'Safe Discharge',
      icon: LogOut,
      desc: 'Automated step-down checklist confirms medication reconciliations, discharges bed, and alerts sanitization staff.',
      metric: '35 min Turnover'
    },
    {
      num: '07',
      title: 'Care Follow-up',
      icon: PhoneCall,
      desc: 'Automated clinical follow-up surveys, medication reminders, and next appointment reminders keep outcomes high.',
      metric: '60% Fewer Readmissions'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA]">
          OPERATIONAL LIFECYCLE
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          The connected hospital journey.
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          From first reception to post-discharge recovery, Kairo connects every operational handoff so no patient or task falls through the cracks.
        </p>
      </div>

      {/* Horizontal Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;
          return (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer text-left ${
                isSelected
                  ? 'bg-white border-[#E06D53] shadow-warm-md -translate-y-1'
                  : 'bg-[#FFFDFC] border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#E06D53]' : 'text-[#A59288]'}`}>
                    {step.num}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#FDEEE9] text-[#E06D53]' : 'bg-[#FAF6F2] text-[#7A6258]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs font-bold text-[#2C1810] leading-snug">{step.title}</h4>
                <p className="text-[11px] text-[#7A6258] leading-relaxed line-clamp-3">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EFE5DC] text-[10px] font-mono text-[#E06D53] font-bold">
                {step.metric}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Showcase Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono font-bold text-[#E06D53] uppercase">
              Step {steps[activeStep].num} Deep-Dive
            </span>
            <h3 className="text-xl font-bold text-[#2C1810]">{steps[activeStep].title}</h3>
            <p className="text-xs sm:text-sm text-[#7A6258] max-w-2xl leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC]">
            Benchmark: <strong>{steps[activeStep].metric}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
