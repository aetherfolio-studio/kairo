'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  Sparkles,
  Plus,
  Menu
} from 'lucide-react';

interface AppBottomNavProps {
  onOpenMobileMenu: () => void;
  onOpenNewPatient: () => void;
}

export function AppBottomNav({ onOpenMobileMenu, onOpenNewPatient }: AppBottomNavProps) {
  const pathname = usePathname();

  const isOverview = pathname === '/app';
  const isPatients = pathname.startsWith('/app/patients');
  const isBeds = pathname.startsWith('/app/beds');
  const isAi = pathname.startsWith('/app/ai');

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FFFDFC]/95 backdrop-blur-xl border-t border-[#EFE5DC] px-2 pt-1.5 pb-safe shadow-[0_-4px_25px_rgba(44,24,16,0.08)] select-none transition-all"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto relative">
        {/* 1. Overview Dashboard */}
        <Link
          href="/app"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all active:scale-95 ${
            isOverview
              ? 'text-[#E06D53]'
              : 'text-[#7A6258] hover:text-[#2C1810]'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 transition-transform ${isOverview ? 'scale-110 text-[#E06D53]' : 'text-[#A59288]'}`} />
          <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isOverview ? 'font-bold text-[#E06D53]' : ''}`}>
            Overview
          </span>
          {isOverview && <span className="w-1 h-1 rounded-full bg-[#E06D53] mt-0.5"></span>}
        </Link>

        {/* 2. Patients */}
        <Link
          href="/app/patients"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all active:scale-95 ${
            isPatients
              ? 'text-[#E06D53]'
              : 'text-[#7A6258] hover:text-[#2C1810]'
          }`}
        >
          <Users className={`w-5 h-5 transition-transform ${isPatients ? 'scale-110 text-[#E06D53]' : 'text-[#A59288]'}`} />
          <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isPatients ? 'font-bold text-[#E06D53]' : ''}`}>
            Patients
          </span>
          {isPatients && <span className="w-1 h-1 rounded-full bg-[#E06D53] mt-0.5"></span>}
        </Link>

        {/* 3. Floating Quick Admit Button */}
        <div className="flex flex-col items-center justify-center -mt-4">
          <button
            onClick={onOpenNewPatient}
            aria-label="Admit New Patient"
            className="w-12 h-12 rounded-full bg-[#E06D53] hover:bg-[#D25C42] active:scale-90 text-white shadow-terracotta flex items-center justify-center border-2 border-white transition-all cursor-pointer group"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
          </button>
          <span className="text-[9px] font-mono font-bold text-[#A59288] mt-0.5">Admit</span>
        </div>

        {/* 4. Beds */}
        <Link
          href="/app/beds"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all active:scale-95 ${
            isBeds
              ? 'text-[#E06D53]'
              : 'text-[#7A6258] hover:text-[#2C1810]'
          }`}
        >
          <BedDouble className={`w-5 h-5 transition-transform ${isBeds ? 'scale-110 text-[#E06D53]' : 'text-[#A59288]'}`} />
          <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isBeds ? 'font-bold text-[#E06D53]' : ''}`}>
            Beds
          </span>
          {isBeds && <span className="w-1 h-1 rounded-full bg-[#E06D53] mt-0.5"></span>}
        </Link>

        {/* 5. AI Copilot */}
        <Link
          href="/app/ai"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all active:scale-95 ${
            isAi
              ? 'text-[#E06D53]'
              : 'text-[#7A6258] hover:text-[#2C1810]'
          }`}
        >
          <Sparkles className={`w-5 h-5 transition-transform ${isAi ? 'scale-110 text-[#E06D53]' : 'text-[#A59288]'}`} />
          <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isAi ? 'font-bold text-[#E06D53]' : ''}`}>
            AI Copilot
          </span>
          {isAi && <span className="w-1 h-1 rounded-full bg-[#E06D53] mt-0.5"></span>}
        </Link>

        {/* 6. More (Drawer Trigger) */}
        <button
          onClick={onOpenMobileMenu}
          aria-label="More Navigation Options"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl text-[#7A6258] hover:text-[#2C1810] active:scale-95 transition-all cursor-pointer"
        >
          <Menu className="w-5 h-5 text-[#A59288]" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">
            More
          </span>
        </button>
      </div>
    </nav>
  );
}
