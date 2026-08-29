import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  Code2,
  Palette,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Zap
} from 'lucide-react';

export const metadata = {
  title: 'Solutions — Kairo for Startups, Product, Engineering & Studios',
  description: 'Discover how Kairo adapts to high-velocity startups, engineering teams, product squads, and creative studios.'
};

export default function SolutionsPage() {
  const personas = [
    {
      id: 'startups',
      title: 'For Fast-Moving Startups',
      badge: 'Seed to Series B',
      icon: Rocket,
      tagline: 'Move from whiteboard to shipped features in record time.',
      description: 'Startups cannot afford context silos between early engineers, founders, and designers. Kairo brings all project artifacts, pitch specs, and sprint boards into one coherent stream.',
      benefits: [
        'AI auto-converts messy meeting notes into ready-to-assign sprint issues',
        'Lightweight roadmap tracking without Jira enterprise bloat',
        'Instant customer feedback synthesis linked directly to code milestones'
      ],
      color: 'from-blue-500/20 to-indigo-500/10'
    },
    {
      id: 'engineering',
      title: 'For Engineering Teams',
      badge: 'Developers & Architects',
      icon: Code2,
      tagline: 'Less time in status standups, more time in flow state.',
      description: 'Deep two-way GitHub sync, automated release notes generation, and vector-backed PR summarization keep engineers focused on shipping high-leverage code.',
      benefits: [
        'Sub-50ms keyboard shortcut navigation and command palette',
        'Automated blocker detection and smart escalation',
        'Bi-directional sync between task state and Git branch activity'
      ],
      color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      id: 'product',
      title: 'For Product & Design Teams',
      badge: 'Product & Design',
      icon: Palette,
      tagline: 'Keep customer insights, specs, and design tokens perfectly synced.',
      description: 'Link Figma design frames, user research transcripts, and roadmap deliverables in a unified interactive graph.',
      benefits: [
        'Embedded live canvas and token previews',
        'Automatic cross-functional alignment briefs',
        'Clear milestone tracking with zero spreadsheet maintenance'
      ],
      color: 'from-purple-500/20 to-pink-500/10'
    },
    {
      id: 'studios',
      title: 'For Creative Studios & Agencies',
      badge: 'Client Delivery',
      icon: Briefcase,
      tagline: 'Deliver immaculate client outcomes with transparent calm.',
      description: 'Manage multiple concurrent client deliverables, review cycles, and automated status reports without messy email chains.',
      benefits: [
        'Multi-tenant workspace isolation with scoped permissions',
        'One-click client progress briefing digests',
        'Automated review approvals and milestone sign-offs'
      ],
      color: 'from-amber-500/20 to-orange-500/10'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
            Tailored Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
            Built for modern teams that value speed and clarity.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Whether you are a 3-person founding team or a 200-engineer organization, Kairo eliminates coordination overhead and accelerates execution.
          </p>
        </div>

        {/* Personas Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-8 group"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-950 border border-white/10 text-zinc-400">
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-zinc-100">{p.title}</h3>
                    <p className="text-sm font-medium text-blue-400">{p.tagline}</p>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                    {p.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-white group/btn"
                >
                  <span>Explore this workflow in app</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-white/10 flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            Ready to upgrade your team&apos;s productivity?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
            Experience the calm, high-precision workspace for yourself. No credit card required.
          </p>
          <Link
            href="/app"
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
          >
            <span>Launch Live App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
