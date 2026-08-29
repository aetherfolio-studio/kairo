'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useHospitalStore } from '@/lib/store';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Receipt,
  BarChart3,
  UserCheck,
  Package,
  MessageSquare,
  Settings,
  PlusCircle,
  X,
  ExternalLink,
  ChevronDown,
  BedDouble,
  Sparkles
} from 'lucide-react';

interface AppSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onOpenNewPatient: () => void;
}

export function AppSidebar({ mobileOpen, setMobileOpen, onOpenNewPatient }: AppSidebarProps) {
  const pathname = usePathname();
  const { patients, appointments, aiInsights } = useHospitalStore();

  const admittedCount = patients.filter((p) => p.status === 'Admitted').length;
  const pendingAptsCount = appointments.filter((a) => a.status === 'Pending').length;

  const mainNavigation = [
    { name: 'Overview', href: '/app', icon: LayoutDashboard },
    { name: 'Appointments', href: '/app/appointments', icon: Calendar, badge: pendingAptsCount ? String(pendingAptsCount) : undefined },
    { name: 'Patients', href: '/app/patients', icon: Users, badge: String(admittedCount) },
    { name: 'Departments', href: '/app/departments', icon: Building2 },
    { name: 'Bed Management', href: '/app/beds', icon: BedDouble },
    { name: 'Billing & Finance', href: '/app/billing', icon: Receipt },
    { name: 'Reports & Analytics', href: '/app/reports', icon: BarChart3 },
    { name: 'Staff Directory', href: '/app/staff', icon: UserCheck },
    { name: 'Inventory & Pharmacy', href: '/app/inventory', icon: Package },
    { name: 'Kairo Intelligence', href: '/app/ai', icon: Sparkles, highlight: true },
    { name: 'Messages', href: '/app/messages', icon: MessageSquare, badge: '8' },
    { name: 'Hospital Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <>
      <aside className="hidden lg:flex w-64 flex-col border-r border-[#EFE5DC] bg-[#FFFDFC] shrink-0 h-screen sticky top-0 z-30 select-none">
        {/* Top Header Logo */}
        <div className="p-4 border-b border-[#EFE5DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showWordmark={false} href="/app" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#2C1810] flex items-center gap-1">
                CityCare Hospital
                <ChevronDown className="w-3 h-3 text-[#7A6258]" />
              </span>
              <span className="text-[10px] font-mono text-[#E06D53]">Hospital OS Core</span>
            </div>
          </div>
        </div>

        {/* Quick Intake Button */}
        <div className="px-3 pt-3">
          <button
            onClick={onOpenNewPatient}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#E06D53] hover:bg-[#D25C42] text-white rounded-xl text-xs font-semibold transition-all shadow-terracotta active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Admit Patient</span>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FDEEE9] text-[#E06D53] font-semibold shadow-warm-sm'
                    : 'text-[#7A6258] hover:text-[#2C1810] hover:bg-[#F8F3ED]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      item.highlight
                        ? 'text-[#E06D53]'
                        : isActive
                        ? 'text-[#E06D53]'
                        : 'text-[#A59288]'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      item.highlight
                        ? 'bg-[#E06D53] text-white'
                        : 'bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile & Public Site Link */}
        <div className="p-3 border-t border-[#EFE5DC] flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#7A6258] hover:text-[#2C1810] hover:bg-[#F8F3ED] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </div>
            <span className="text-[10px] font-mono text-[#A59288]">Home</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#2C1810]/40 backdrop-blur-md flex">
          <div className="w-72 bg-[#FFFDFC] border-r border-[#EFE5DC] h-full flex flex-col p-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE5DC]">
              <Logo size="md" href="/app" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-[#7A6258] hover:text-[#2C1810] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenNewPatient();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#E06D53] text-white rounded-xl text-xs font-semibold shadow-terracotta"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Admit Patient</span>
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
                      isActive ? 'bg-[#FDEEE9] text-[#E06D53] font-semibold' : 'text-[#7A6258] hover:text-[#2C1810]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#EFE5DC]">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-xs text-[#7A6258] hover:text-[#2C1810] py-2"
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
