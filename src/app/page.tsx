import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Zap,
  FolderKanban,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Clock,
  Terminal,
  Activity,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { InteractiveHeroPreview } from '@/components/InteractiveHeroPreview';
import { AskKairoDemo } from '@/components/AskKairoDemo';
import { InteractiveWorkflowBuilder } from '@/components/InteractiveWorkflowBuilder';

export default function HomePage() {
  const highlights = [
    {
      title: 'Context-Aware AI Assistant',
      description: 'Ask Kairo questions about roadmaps, past decisions, and sprint blockers. The model already understands your full workspace graph.',
      icon: Sparkles,
      tag: 'Neural Context'
    },
    {
      title: 'Real-Time Project Graph',
      description: 'Unify tasks, design files, code PRs, and meeting summaries into interconnected interactive roadmaps with sub-50ms query speeds.',
      icon: FolderKanban,
      tag: 'Graph Engine'
    },
    {
      title: 'Autonomous Workflow Rules',
      description: 'Set natural logic to triage incoming bug reports, summarize sprint retrospectives, and notify team leads of emerging blockers.',
      icon: Zap,
      tag: 'Zero-Code Automations'
    },
    {
      title: 'Focus-First Precision UI',
      description: 'Engineered with strict visual restraint, fluid animations, OLED dark theme, and keyboard-first spotlight palette for rapid execution.',
      icon: Layers,
      tag: 'Craft & Speed'
    }
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Capture & Ingest',
      desc: 'Connect calendar notes, GitHub repositories, and design links into a continuous unified workspace graph.'
    },
    {
      num: '02',
      title: 'Synthesize with AI',
      desc: 'Ambient background agents recognize intent, auto-generate sprint tickets, and eliminate manual triage.'
    },
    {
      num: '03',
      title: 'Execute in Flow',
      desc: 'Work through customizable Kanban boards, list views, and command palette triggers with zero latency.'
    },
    {
      num: '04',
      title: 'Automate & Learn',
      desc: 'Continuous rules escalate blockers, compile weekly release notes, and keep all stakeholders aligned.'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-zinc-300 backdrop-blur-md hover:border-white/20 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Kairo 2.0 is now live</span>
            <span className="text-zinc-500">•</span>
            <span className="text-blue-400 font-medium flex items-center gap-0.5">
              Explore interactive preview <ChevronRight className="w-3 h-3" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.1] max-w-3xl">
            AI workspace for modern teams.
          </h1>

          {/* Tagline & Value Prop */}
          <p className="text-lg sm:text-xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Turn ideas into progress. An intelligent workspace that brings projects, tasks, conversations, and automated workflows together.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Open Web Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>See AI in action</span>
            </Link>
          </div>
        </div>

        {/* Live Interactive Hero Workspace Mockup */}
        <div className="w-full mt-14 relative z-10" id="preview">
          <InteractiveHeroPreview />
        </div>
      </section>

      {/* 2. CATEGORY CREDIBILITY STRIP */}
      <section className="py-12 border-y border-white/[0.06] bg-zinc-950/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <span className="uppercase tracking-wider text-zinc-400">Architected for high-velocity teams in:</span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-zinc-400">
            <span className="hover:text-zinc-200 transition-colors">AI & Machine Learning</span>
            <span className="hover:text-zinc-200 transition-colors">Frontend & Systems</span>
            <span className="hover:text-zinc-200 transition-colors">Design Engineering</span>
            <span className="hover:text-zinc-200 transition-colors">Product Strategy</span>
          </div>
        </div>
      </section>

      {/* 3. CORE HIGHLIGHTS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-16" id="product">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
            Product Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Everything your team needs to ship faster with clarity.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Eliminate context switching between scattered wikis, chat feeds, and passive task boards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-6 group hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Explore feature in app</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE ASK KAIRO DEMO SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-white/[0.06]" id="demo">
        <AskKairoDemo />
      </section>

      {/* 5. 4-STEP HOW IT WORKS WORKFLOW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            From raw conversation to executed deliverables.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 flex flex-col gap-3 relative"
            >
              <span className="text-2xl font-extrabold font-mono text-zinc-600">
                {step.num}
              </span>
              <h4 className="text-base font-bold text-zinc-100">{step.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE AUTOMATION BUILDER DEMO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-white/[0.06]">
        <InteractiveWorkflowBuilder />
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            Turn your team&apos;s ideas into continuous progress.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Join hundreds of designers, engineers, and product leads using Kairo to build faster with zero friction.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/app"
            className="px-8 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-xl shadow-white/10 flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Web App Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            View Pricing Plans
          </Link>
        </div>
      </section>
    </div>
  );
}
