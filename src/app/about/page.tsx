import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass, Feather, Layers, Cpu } from 'lucide-react';

export const metadata = {
  title: 'About Kairo — Product Philosophy & Craft',
  description: 'Learn why we built Kairo: our philosophy of calm software, connected context, and high-precision craft.'
};

export default function AboutPage() {
  const principles = [
    {
      title: 'Clarity Over Noise',
      desc: 'Most modern tools bombard teams with gamified confetti and noisy badges. Kairo is engineered with deliberate visual restraint, giving your mind space for deep, sustained problem-solving.',
      icon: Compass
    },
    {
      title: 'Intelligent Automation',
      desc: 'Automation should not require configuring complex spaghetti logic. Kairo continuously maps intent in the background, drafting summaries and linking tasks before you even ask.',
      icon: Cpu
    },
    {
      title: 'Preserve Connected Context',
      desc: 'When an engineer opens a task, they should see the original meeting recording, the designer’s Figma token link, and the customer’s exact rationale in a single unified graph view.',
      icon: Layers
    },
    {
      title: 'Software That Feels Effortless',
      desc: 'Sub-50ms interaction latency, keyboard-first command palettes, and fluid spring animations make Kairo feel like a precision instrument in your hands.',
      icon: Feather
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
            Product Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
            We build software for teams who take their craft seriously.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Kairo was born from a fundamental frustration: modern knowledge workers spend more time updating project trackers than actually inventing, coding, and designing.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-zinc-100">The Kairo Thesis</h2>
          <div className="flex flex-col gap-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
            <p>
              Over the last decade, workplace software fractured into a dozen disconnected silos. Product briefs live in one wiki, active tickets live on a board, sprint banter happens in chat, and code reviews live on Git.
            </p>
            <p>
              When context is fragmented, knowledge debt explodes. Engineers write code without knowing why a decision was made. Designers update mockups disconnected from technical blockers.
            </p>
            <p className="text-white font-medium">
              Kairo rebuilds the workspace around an ambient neural graph—where discussions, decisions, and tasks naturally converge into one calm, coherent view.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Our Pillars
            </span>
            <h2 className="text-3xl font-bold text-zinc-100">How we design Kairo</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950/40 via-zinc-900/60 to-zinc-950 border border-blue-500/20 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">Experience Kairo Today</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Explore the live interactive application dashboard, Kanban boards, and AI assistant.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-all shadow-lg"
          >
            <span>Open Application Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
