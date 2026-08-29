'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { useHospitalStore } from '@/lib/store';

export default function PricingPage() {
  const { setIsBookDemoOpen } = useHospitalStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Specialty Clinic',
      description: 'For private practices, ambulatory clinics, and outpatient diagnostic centers.',
      priceMonthly: '$450',
      priceYearly: '$380',
      period: 'per clinic / month',
      highlighted: false,
      badge: 'Up to 25 Beds',
      ctaText: 'Start Clinic Pilot',
      features: [
        'Up to 3 clinical departments',
        'Smart patient appointment scheduling',
        'Electronic patient charts & vitals',
        'Basic billing & claims generation',
        'Standard email & chat support'
      ]
    },
    {
      name: 'Community Hospital',
      description: 'For general hospitals seeking seamless departmental and bed capacity coordination.',
      priceMonthly: '$1,450',
      priceYearly: '$1,200',
      period: 'per hospital / month',
      highlighted: true,
      badge: 'Most Popular',
      ctaText: 'Book Facility Demo',
      features: [
        'Unlimited clinical departments & wards',
        'Real-time bed & ICU capacity management',
        'Kairo Intelligence operational AI assistant',
        'Automated pharmacy & supply inventory alerts',
        'Integrated lab diagnostic and radiology flow',
        'Priority 24/7 technical operations support'
      ]
    },
    {
      name: 'Health Network',
      description: 'For regional healthcare networks and multi-campus enterprise health systems.',
      priceMonthly: '$3,800',
      priceYearly: '$3,200',
      period: 'per network / month',
      highlighted: false,
      badge: 'Multi-Campus',
      ctaText: 'Contact Health Systems Team',
      features: [
        'Everything in Community Hospital',
        'Multi-facility inter-hospital transfer hub',
        'Custom EHR & laboratory API integrations',
        'Dedicated isolated vector tenant & SLA guarantees',
        'Custom clinician onboarding & workflow audit',
        'Executive Clinical Account Director'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Is this real commercial pricing or concept demonstration?',
      a: 'This website is an original portfolio concept design. All pricing figures, tiers, and plans shown here are purely illustrative demo concepts.'
    },
    {
      q: 'How does Kairo integrate with existing laboratory or imaging systems?',
      a: 'Kairo is architected as an ambient operational layer that synchronizes DICOM image viewers, LIS lab results, and pharmacy registries into one unified patient chart graph.'
    },
    {
      q: 'How does Kairo Intelligence protect clinical safety?',
      a: 'Kairo AI focuses strictly on operational assistance—predicting bed bottlenecks, scheduling buffers, and inventory supply thresholds. It never makes automated medical treatment or diagnostic decisions.'
    },
    {
      q: 'Can hospital departments customize their own intake workflows?',
      a: 'Yes. Department directors in Emergency, Cardiology, Pediatrics, and ICU can configure custom triage scoring, bed turnover checklists, and physician paging rules.'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA]">
            TRANSPARENT HEALTHCARE TIERS
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2C1810] leading-tight">
            Predictable plans for modern healthcare facilities.
          </h1>
          <p className="text-base sm:text-lg text-[#7A6258] leading-relaxed">
            Scalable hospital operating software with no hidden seat penalties.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center gap-3 p-1 rounded-full bg-white border border-[#EFE5DC] shadow-warm-sm mt-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810]'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810]'
              }`}
            >
              <span>Annual billing</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-[#FFFDFC] border-2 border-[#E06D53] shadow-warm-lg -translate-y-2'
                  : 'bg-white border border-[#EFE5DC] shadow-warm-sm hover:border-[#E06D53]/40'
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A6258]">
                    {plan.badge}
                  </span>
                  {plan.highlighted && (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FDEEE9] text-[#E06D53] border border-[#F7D5CA] flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" /> Recommended
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#2C1810]">{plan.name}</h3>
                  <p className="text-xs text-[#7A6258] leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-[#EFE5DC]">
                  <span className="text-4xl font-extrabold text-[#2C1810]">
                    {billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-[#7A6258] font-mono">/{plan.period}</span>
                </div>

                <button
                  onClick={() => setIsBookDemoOpen(true)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-[#E06D53] hover:bg-[#D25C42] text-white shadow-terracotta'
                      : 'bg-[#FAF6F2] hover:bg-[#F6EFE9] text-[#2C1810] border border-[#EFE5DC]'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col gap-3 pt-6 border-t border-[#EFE5DC]">
                  <span className="text-xs font-bold text-[#2C1810] font-mono uppercase tracking-wider">
                    Included capabilities:
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#7A6258]">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex items-center justify-center gap-2 text-xs text-[#7A6258] text-center max-w-2xl mx-auto">
          <ShieldCheck className="w-4 h-4 text-[#E06D53] shrink-0" />
          <span><strong>Portfolio Demonstration Notice:</strong> Pricing figures are conceptual models illustrating hospital software procurement.</span>
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pt-12 border-t border-[#EFE5DC]">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold text-[#2C1810]">
              Everything you need to know about Kairo Hospital OS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2.5"
              >
                <h4 className="text-sm font-bold text-[#2C1810] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#E06D53] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-[#7A6258] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
