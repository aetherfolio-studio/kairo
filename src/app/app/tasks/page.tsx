'use client';

import React, { useState } from 'react';
import { useKairoStore } from '@/lib/store';
import {
  CheckCircle2,
  Circle,
  Plus,
  Filter,
  Kanban,
  List,
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  User
} from 'lucide-react';
import { NewTaskModal } from '@/components/Modals';

export default function TasksPage() {
  const { tasks, toggleTaskStatus } = useKairoStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'review' | 'done'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [search, setSearch] = useState('');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.projectName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    { id: 'todo', label: 'To Do', color: 'bg-zinc-800' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
    { id: 'review', label: 'In Review', color: 'bg-amber-500' },
    { id: 'done', label: 'Completed', color: 'bg-emerald-500' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Sprint Tasks & Deliverables</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Real-time synchronization across all team members and connected Git repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-zinc-900 border border-white/10 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'board' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(['all', 'todo', 'in-progress', 'review', 'done'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-white/5'
              }`}
            >
              {st === 'all' ? 'All Tasks' : st.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Tasks View: List vs Board */}
      {viewMode === 'list' ? (
        <div className="flex flex-col gap-2.5">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-xs text-zinc-500 rounded-2xl bg-zinc-900/20 border border-white/5">
              No tasks found matching your filter criteria.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskStatus(task.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
                  task.status === 'done'
                    ? 'bg-zinc-900/30 border-white/5 text-zinc-500'
                    : 'bg-zinc-900/70 hover:bg-zinc-900 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {task.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        task.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-[11px] text-zinc-500 truncate">
                      {task.projectName} • Assigned to {task.assignee.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {task.aiGenerated && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/20">
                      AI Generated
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-zinc-800 text-zinc-400">
                    {task.status}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-white/10 min-h-[450px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                    <span className="text-xs font-semibold text-zinc-200">{col.label}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{colTasks.length}</span>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => toggleTaskStatus(t.id)}
                      className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2.5 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-zinc-200 group-hover:text-white leading-snug">
                          {t.title}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-zinc-500 font-mono">
                        <span>{t.dueDate}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.assignee.avatar}
                          alt={t.assignee.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <NewTaskModal isOpen={isNewTaskOpen} onClose={() => setIsNewTaskOpen(false)} />
    </div>
  );
}
