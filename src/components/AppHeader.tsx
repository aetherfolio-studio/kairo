'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useKairoStore } from '@/lib/store';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Command,
  HelpCircle,
  Plus
} from 'lucide-react';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenNewTask: () => void;
}

export function AppHeader({ onOpenMobileMenu, onOpenNewTask }: AppHeaderProps) {
  const pathname = usePathname();
  const { setIsCommandPaletteOpen } = useKairoStore();

  const getBreadcrumb = () => {
    if (pathname === '/app') return 'Overview';
    if (pathname.includes('/projects')) return 'Projects';
    if (pathname.includes('/tasks')) return 'My Tasks';
    if (pathname.includes('/automations')) return 'Automations';
    if (pathname.includes('/ai')) return 'Ask Kairo AI';
    if (pathname.includes('/team')) return 'Team Directory';
    if (pathname.includes('/inbox')) return 'Inbox';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Workspace';
  };

  return (
    <header className="h-14 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-zinc-500">Workspace</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 font-semibold">{getBreadcrumb()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 bg-zinc-900 border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search...</span>
          <kbd className="text-[10px] font-mono px-1 py-0.5 bg-zinc-800 border border-white/10 rounded text-zinc-400">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={onOpenNewTask}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>

        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Elena"
            className="w-7 h-7 rounded-lg object-cover border border-white/10"
          />
        </div>
      </div>
    </header>
  );
}
