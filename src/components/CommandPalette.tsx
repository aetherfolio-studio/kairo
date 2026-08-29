'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useKairoStore } from '@/lib/store';
import {
  Search,
  CheckCircle2,
  FolderKanban,
  Zap,
  Sparkles,
  ArrowRight,
  FileText,
  User,
  X
} from 'lucide-react';

interface CommandItem {
  label: string;
  category: string;
  href: string;
  icon: any;
  subtitle?: string;
}

export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, tasks, projects } = useKairoStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  const quickNav: CommandItem[] = [
    { label: 'Overview Dashboard', category: 'Navigation', href: '/app', icon: FolderKanban, subtitle: 'Main metrics & focus' },
    { label: 'My Sprint Tasks', category: 'Navigation', href: '/app/tasks', icon: CheckCircle2, subtitle: 'Kanban & list view' },
    { label: 'Active Projects', category: 'Navigation', href: '/app/projects', icon: FolderKanban, subtitle: 'Roadmaps & milestones' },
    { label: 'Workflow Automations', category: 'Navigation', href: '/app/automations', icon: Zap, subtitle: 'Autonomous rules' },
    { label: 'Ask Kairo AI', category: 'AI', href: '/app/ai', icon: Sparkles, subtitle: 'Workspace neural query' },
    { label: 'Team Directory', category: 'Team', href: '/app/team', icon: User, subtitle: 'Collaborators & status' },
    { label: 'Editorial Resources', category: 'Resources', href: '/resources', icon: FileText, subtitle: 'Essays & philosophy' },
  ];

  const filteredTasks: CommandItem[] = tasks
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    .map((t) => ({
      label: t.title,
      category: 'Task',
      href: '/app/tasks',
      icon: CheckCircle2,
      subtitle: `${t.projectName} • ${t.priority} priority`
    }));

  const filteredProjects: CommandItem[] = projects
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .map((p) => ({
      label: p.name,
      category: 'Project',
      href: `/app/projects/${p.id}`,
      icon: FolderKanban,
      subtitle: `${p.category} • ${p.progress}% progress`
    }));

  const combinedItems: CommandItem[] = query.trim() === ''
    ? quickNav
    : [
        ...quickNav.filter((n) => n.label.toLowerCase().includes(query.toLowerCase())),
        ...filteredProjects,
        ...filteredTasks,
      ];

  const handleSelect = (href: string) => {
    setIsCommandPaletteOpen(false);
    router.push(href);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (combinedItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + combinedItems.length) % (combinedItems.length || 1));
      } else if (e.key === 'Enter' && combinedItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(combinedItems[selectedIndex].href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, combinedItems]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-zinc-950 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, search projects, or jump to tasks..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-0.5">
          {combinedItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            combinedItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : 'text-zinc-400'
                      }`}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.subtitle && (
                        <span
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-blue-100' : 'text-zinc-500'
                          }`}
                        >
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-white' : 'text-zinc-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-zinc-900/80 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Kairo Spotlight</span>
        </div>
      </div>
    </div>
  );
}
