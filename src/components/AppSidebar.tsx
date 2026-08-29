'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useKairoStore } from '@/lib/store';
import {
  LayoutDashboard,
  Inbox,
  CheckSquare,
  FolderKanban,
  Zap,
  Sparkles,
  Users,
  Settings,
  PlusCircle,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface AppSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onOpenNewTask: () => void;
}

export function AppSidebar({ mobileOpen, setMobileOpen, onOpenNewTask }: AppSidebarProps) {
  const pathname = usePathname();
  const { tasks, projects, automations } = useKairoStore();

  const pendingTasksCount = tasks.filter((t) => t.status !== 'done').length;
  const activeAutomationsCount = automations.filter((a) => a.enabled).length;

  const mainNavigation = [
    { name: 'Overview', href: '/app', icon: LayoutDashboard },
    { name: 'Inbox', href: '/app/inbox', icon: Inbox, badge: '3' },
    { name: 'My Tasks', href: '/app/tasks', icon: CheckSquare, badge: pendingTasksCount ? String(pendingTasksCount) : undefined },
    { name: 'Projects', href: '/app/projects', icon: FolderKanban, badge: String(projects.length) },
    { name: 'Automations', href: '/app/automations', icon: Zap, badge: String(activeAutomationsCount) },
    { name: 'Ask Kairo AI', href: '/app/ai', icon: Sparkles, highlight: true },
    { name: 'Team', href: '/app/team', icon: Users },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <>
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl shrink-0 h-screen sticky top-0 z-30 select-none">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showWordmark={false} href="/app" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-100 flex items-center gap-1">
                Kairo Studio
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Growth Team • Pro</span>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3">
          <button
            onClick={onOpenNewTask}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-white/15 text-zinc-100 rounded-xl text-xs font-semibold border border-white/10 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>New Task</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      item.highlight
                        ? 'text-blue-400'
                        : isActive
                        ? 'text-zinc-100'
                        : 'text-zinc-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      item.highlight
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Home</span>
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-xl flex">
          <div className="w-72 bg-zinc-950 border-r border-white/10 h-full flex flex-col p-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Logo size="md" href="/app" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenNewTask();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>New Task</span>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/10">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 py-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Back to Public Site</span>
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)}></div>
        </div>
      )}
    </>
  );
}
