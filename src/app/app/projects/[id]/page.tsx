'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useKairoStore } from '@/lib/store';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Users,
  Layers,
  Plus,
  TrendingUp,
  FileText
} from 'lucide-react';
import { NewTaskModal } from '@/components/Modals';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { projects, tasks, toggleTaskStatus } = useKairoStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'overview' | 'activity'>('tasks');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  if (!project) {
    return (
      <div className="p-12 text-center flex flex-col items-center gap-4">
        <p className="text-zinc-400 text-sm">Roadmap not found.</p>
        <Link href="/app/projects" className="text-xs text-blue-400 hover:underline">
          Return to projects directory
        </Link>
      </div>
    );
  }

  const completedCount = projectTasks.filter((t) => t.status === 'done').length;

  return (
    <div className="flex flex-col gap-8">
      {/* Back button */}
      <Link
        href="/app/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      {/* Project Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Due {project.dueDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">{project.name}</h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Deliverable</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Progress: {completedCount} / {projectTasks.length} Deliverables</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-950 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {(['tasks', 'overview', 'activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'tasks' && (
        <div className="flex flex-col gap-3">
          {projectTasks.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 rounded-2xl bg-zinc-900/30 border border-white/5">
              No tasks assigned to this project yet.
            </div>
          ) : (
            projectTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTaskStatus(t.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
                  t.status === 'done'
                    ? 'bg-zinc-900/30 border-white/5 text-zinc-500'
                    : 'bg-zinc-900/70 hover:bg-zinc-900 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  {t.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  )}
                  <div className="flex flex-col">
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        t.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {t.title}
                    </span>
                    <span className="text-[11px] text-zinc-500">Due {t.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-zinc-800 text-zinc-400">
                    {t.priority}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.assignee.avatar}
                    alt={t.assignee.name}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-zinc-100">Key Milestone Objectives</h3>
            <div className="flex flex-col gap-2">
              {project.keyGoals.map((g, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-zinc-100">Assigned Team Members</h3>
            <div className="flex flex-col gap-3">
              {project.members.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-xl object-cover" />
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-zinc-200">{m.name}</span>
                    <span className="text-[11px] text-zinc-500">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Elena Rostova updated deliverable status to Completed (2h ago)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>AI context graph synthesized 3 GitHub PRs into milestone overview (4h ago)</span>
          </div>
        </div>
      )}

      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
    </div>
  );
}
