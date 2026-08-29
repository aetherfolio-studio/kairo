'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter',
      description: 'For individuals and solo founders seeking a high-focus personal workspace.',
      priceMonthly: '$0',
      priceYearly: '$0',
      period: 'forever free',
      highlighted: false,
      badge: 'Free Tier',
      ctaText: 'Get started free',
      ctaHref: '/app',
      features: [
        'Up to 3 active project roadmaps',
        'Personal Kanban task board',
        'Standard search (< 100ms)',
        'Basic AI summaries (50 queries/mo)',
        'Community discord support'
      ]
    },
    {
      name: 'Pro Team',
      description: 'For fast-moving teams building products, shipping code, and designing systems.',
      priceMonthly: '$18',
      priceYearly: '$14',
      period: 'per member / month',
      highlighted: true,
      badge: 'Most Popular',
      ctaText: 'Start 14-day free trial',
      ctaHref: '/app',
      features: [
        'Unlimited active projects & roadmaps',
        'Unlimited Ask Kairo AI neural queries',
        'Autonomous workflow rules (10,000 runs/mo)',
        'Bi-directional GitHub & Figma sync',
        'Sub-50ms vector semantic search',
        'Team inbox & automated blocker triage',
        'Priority technical support'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For scaled organizations requiring custom data retention, SLA guarantees, and audit logs.',
      priceMonthly: '$45',
      priceYearly: '$36',
      period: 'per member / month',
      highlighted: false,
      badge: 'Custom Scale',
      ctaText: 'Contact enterprise',
      ctaHref: 'mailto:enterprise@kairo.design',
      features: [
        'Everything in Pro Team',
        'Dedicated isolated vector tenant',
        'Custom SSO / SAML & SCIM provisioning',
        'Unlimited autonomous rule executions',
        'Custom AI model weights fine-tuning',
        '99.99% uptime SLA guarantee',
        'Dedicated Solutions Architect'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Can I try Kairo without entering credit card information?',
      a: 'Yes. The Starter tier is completely free forever. You can also explore the fully interactive web app demo anytime.'
    },
    {
      q: 'How does Kairo differ from traditional project management tools?',
      a: 'Traditional tools are passive databases where users manually input tickets. Kairo is an ambient workspace: it listens to project context, automatically categorizes deliverables, detects blockers, and synthesizes updates in the background.'
    },
    {
      q: 'How is data protected and encrypted?',
      a: 'All data is encrypted in transit via TLS 1.3 and at rest with AES-256. Vector embeddings are isolated per workspace and are never used to train global public AI models.'
    },
    {
      q: 'Can I switch between monthly and annual billing at any time?',
      a: 'Yes, workspace owners can toggle billing intervals or adjust seat counts dynamically with prorated invoicing.'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
            Predictable pricing for ambitious teams.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            No hidden seat fees. Pick a tier that fits your speed, scale seamlessly as your team grows.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center gap-3 p-1 rounded-full bg-zinc-900 border border-white/10 mt-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Annual billing</span>
              <span className="text-[10px] bg-blue-400/20 text-blue-200 px-1.5 py-0.5 rounded-full border border-blue-400/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-950/40 via-zinc-900/80 to-zinc-950 border-2 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.15)] -translate-y-2'
                  : 'bg-zinc-900/50 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                    {plan.badge}
                  </span>
                  {plan.highlighted && (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-zinc-100">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-white/10">
                  <span className="text-4xl font-extrabold text-zinc-100">
                    {billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">/{plan.period}</span>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3 rounded-xl font-semibold text-xs text-center transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg shadow-white/10'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                  <span className="text-xs font-semibold text-zinc-300 font-mono uppercase tracking-wider">
                    Included capabilities:
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pt-12 border-t border-white/10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold text-zinc-100">
              Everything you need to know about Kairo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col gap-2.5"
              >
                <h4 className="text-sm font-semibold text-zinc-200 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6">
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
