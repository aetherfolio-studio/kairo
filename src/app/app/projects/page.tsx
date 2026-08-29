'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKairoStore } from '@/lib/store';
import { FolderKanban, Plus, Search, CheckCircle2, ArrowRight, Layers, Clock, Users } from 'lucide-react';
import { NewProjectModal } from '@/components/Modals';

export default function ProjectsPage() {
  const { projects } = useKairoStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const categories = ['All', 'Product', 'Engineering', 'Design', 'Growth'];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Project Roadmaps</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            High-level milestones, team ownership, and real-time execution graphs.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectOpen(true)}
          className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Roadmap</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/app/projects/${project.id}`}
            className="p-6 rounded-3xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-6 group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-950 border border-white/10 text-zinc-400">
                  {project.category}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-200">
                  {project.progress}% Complete
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Target: {project.dueDate}</span>
              </div>

              <div className="flex -space-x-1.5">
                {project.members.map((m, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="w-6 h-6 rounded-full object-cover border border-zinc-900"
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <NewProjectModal isOpen={isNewProjectOpen} onClose={() => setIsNewProjectOpen(false)} />
    </div>
  );
}
