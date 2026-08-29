'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { NewTaskModal } from '@/components/Modals';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenNewTask={() => setNewTaskOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AppHeader
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenNewTask={() => setNewTaskOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Global New Task Modal */}
      <NewTaskModal isOpen={newTaskOpen} onClose={() => setNewTaskOpen(false)} />
    </div>
  );
}
