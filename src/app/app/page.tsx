'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKairoStore } from '@/lib/store';
import {
  Sparkles,
  FolderKanban,
  CheckCircle2,
  Circle,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { NewTaskModal } from '@/components/Modals';

export default function AppOverviewPage() {
  const { tasks, projects, toggleTaskStatus, completedTasksCount, totalTasksCount } = useKairoStore();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const activeProjects = projects.slice(0, 3);
  const pendingTasks = tasks.filter((t) => t.status !== 'done').slice(0, 5);

  const activities = [
    { user: 'Marcus Chen', action: 'merged PR #142 into', target: 'kairo-web / main', time: '12m ago' },
    { user: 'Elena Rostova', action: 'completed task', target: 'Design tokens WCAG AAA audit', time: '45m ago' },
    { user: 'AI Context Agent', action: 'auto-summarized', target: 'Sprint 14 Planning Digest', time: '2h ago' },
    { user: 'David Park', action: 'updated vector index latency spec on', target: 'AI Graph Engine', time: '4h ago' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Welcome & Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-white/10 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">
              Good morning, Elena
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-[10px] font-mono">
              Sprint 14 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            You have <strong className="text-zinc-200">{pendingTasks.length} high-priority tasks</strong> due this week across 3 active projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/ai"
            className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Ask Kairo AI</span>
          </Link>
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 2. Key Productivity Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">
            {completedTasksCount} <span className="text-xs font-normal text-zinc-500">/ {totalTasksCount}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((completedTasksCount / (totalTasksCount || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Sprint Velocity</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">92.4%</div>
          <span className="text-[11px] text-emerald-400 font-mono">+8.1% vs previous sprint</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Active Projects</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">{projects.length}</div>
          <span className="text-[11px] text-zinc-400 font-mono">4 departments linked</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Autonomous Rules</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">4 Active</div>
          <span className="text-[11px] text-amber-400 font-mono">142 automated actions</span>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's High-Priority Deliverables */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-zinc-100">Today&apos;s Focus Tasks</h2>
              <span className="text-xs font-mono text-zinc-500">({pendingTasks.length} remaining)</span>
            </div>
            <Link
              href="/app/tasks"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              View all tasks →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {pendingTasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-zinc-900/30 border border-white/5 text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <p className="text-sm text-zinc-300 font-medium">All tasks completed for today!</p>
                <p className="text-xs text-zinc-500">Enjoy the calm or create new sprint deliverables.</p>
              </div>
            ) : (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskStatus(task.id)}
                  className="p-3.5 rounded-2xl bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Circle className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-zinc-200 truncate group-hover:text-white">
                        {task.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 truncate">
                        {task.projectName} • Due {task.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {task.aiGenerated && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/20">
                        AI Generated
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        task.priority === 'urgent'
                          ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                          : task.priority === 'high'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* AI Workload Insight Card */}
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3 mt-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-blue-300 font-mono">
                AI Capacity Recommendation
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                David Park delivered 3 AI query tasks early. Recommending shifting the mobile gesture audit to Marcus to maintain sprint balance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Active Roadmaps & Activity */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-100">Active Roadmaps</h2>
              <Link href="/app/projects" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                All projects →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {activeProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/app/projects/${project.id}`}
                  className="p-4 rounded-2xl bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <h4 className="text-xs font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{project.category} • Target {project.dueDate}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Stream */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-zinc-100">Live Team Stream</h2>
            <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
              {activities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <p className="leading-relaxed">
                    <strong className="text-zinc-200">{act.user}</strong> {act.action}{' '}
                    <span className="text-zinc-300 font-mono">{act.target}</span>
                  </p>
                  <span className="ml-auto text-[10px] text-zinc-500 shrink-0 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
    </div>
  );
}
