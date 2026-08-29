'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
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
  Bell,
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useHospitalStore } from '@/lib/store';

export function HeroDashboardPreview() {
  const router = useRouter();
  const {
    patients,
    appointments,
    updateAppointmentStatus,
    setSelectedPatient,
    setIsBookDemoOpen
  } = useHospitalStore();

  const [activeNav, setActiveNav] = useState('Overview');
  const [showAiModal, setShowAiModal] = useState(false);

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/app' },
    { name: 'Appointments', icon: Calendar, href: '/app/appointments' },
    { name: 'Patients', icon: Users, href: '/app/patients' },
    { name: 'Departments', icon: Building2, href: '/app/departments' },
    { name: 'Billing', icon: Receipt, href: '/app/billing' },
    { name: 'Reports', icon: BarChart3, href: '/app/reports' },
    { name: 'Staff', icon: UserCheck, href: '/app/staff' },
    { name: 'Inventory', icon: Package, href: '/app/inventory' },
    { name: 'Messages', icon: MessageSquare, badge: '8', href: '/app/messages' },
    { name: 'Settings', icon: Settings, href: '/app/settings' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg overflow-hidden transition-all duration-300">
      {/* Top Application Frame Header */}
      <div className="bg-[#FDFBF9] px-4 py-2.5 border-b border-[#EFE5DC] flex items-center justify-between text-xs text-[#7A6258]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#E06D53]/30 border border-[#E06D53]/60"></span>
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/30 border border-[#F59E0B]/60"></span>
          <span className="w-3 h-3 rounded-full bg-[#10B981]/30 border border-[#10B981]/60"></span>
          <span className="ml-2 font-mono text-[11px] text-[#A59288]">kairo-hospital-os.internal/dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FDEEE9] text-[#E06D53] font-semibold border border-[#F7D5CA]">
            LIVE INTERACTIVE PREVIEW
          </span>
        </div>
      </div>

      {/* Main Dashboard Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left App Sidebar */}
        <div className="lg:col-span-3 border-r border-[#EFE5DC] bg-[#FFFDFC] p-4 flex flex-col justify-between select-none">
          <div className="flex flex-col gap-5">
            <div className="px-2 pt-1">
              <Logo size="sm" showWordmark={true} href="/app" />
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveNav(item.name);
                      if (item.href !== '/app') {
                        router.push(item.href);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#FDEEE9] text-[#E06D53] font-semibold shadow-warm-sm'
                        : 'text-[#7A6258] hover:text-[#2C1810] hover:bg-[#F8F3ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#E06D53]' : 'text-[#A59288]'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#E06D53] text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Administrator Profile */}
          <div className="pt-4 border-t border-[#EFE5DC] flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Sarah Chen"
                className="w-8 h-8 rounded-full object-cover border border-[#E2D3C7]"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2C1810]">Dr. Sarah Chen</span>
                <span className="text-[10px] text-[#A59288]">Administrator</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#A59288]" />
          </div>
        </div>

        {/* Right Dashboard Workspace */}
        <div className="lg:col-span-9 bg-[#FAF6F2] p-5 sm:p-6 flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2C1810] flex items-center gap-2">
                <span>Good morning, Dr. Sarah</span>
                <span className="text-xl">👋</span>
              </h2>
              <p className="text-xs text-[#7A6258]">
                Here&apos;s what&apos;s happening at CityCare Hospital today.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EFE5DC] text-xs font-medium text-[#7A6258] shadow-warm-sm">
                <Calendar className="w-3.5 h-3.5 text-[#E06D53]" />
                <span>May 12, 2026</span>
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EFE5DC] text-xs font-medium text-[#7A6258] hover:text-[#2C1810] shadow-warm-sm cursor-pointer">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A6258]" />
                <span>Filters</span>
              </button>

              <div className="relative p-2 rounded-xl bg-white border border-[#EFE5DC] text-[#7A6258] shadow-warm-sm">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E06D53]"></span>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Appointments Today */}
            <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Appointments Today</span>
                <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-2xl font-bold text-[#2C1810]">128</span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 12% vs yesterday</span>
              </div>
            </div>

            {/* 2. Patients Admitted */}
            <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Patients Admitted</span>
                <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <Users className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-2xl font-bold text-[#2C1810]">32</span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 8% vs yesterday</span>
              </div>
            </div>

            {/* 3. Total Revenue */}
            <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Total Revenue</span>
                <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-2xl font-bold text-[#2C1810]">$24,560</span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 15% vs yesterday</span>
              </div>
            </div>

            {/* 4. Discharges */}
            <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A6258]">Discharges</span>
                <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-2xl font-bold text-[#2C1810]">18</span>
              <div className="flex items-center gap-1 text-[11px] text-rose-500 font-medium">
                <TrendingDown className="w-3 h-3" />
                <span>↓ 5% vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Schedule (Left) + Hospital Overview Chart & Capacity (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Today's Schedule Table */}
            <div className="lg:col-span-7 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">Today&apos;s Schedule</h3>
                <span className="text-[11px] text-[#A59288] font-mono">5 Upcoming</span>
              </div>

              <div className="flex flex-col gap-2">
                {appointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => {
                      const foundPatient = patients.find((p) => p.name === apt.patientName);
                      if (foundPatient) setSelectedPatient(foundPatient);
                    }}
                    className="p-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F6EFE9] border border-[#EFE5DC]/60 flex items-center justify-between gap-2 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-[#2C1810] shrink-0">{apt.time}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-[#2C1810] group-hover:text-[#E06D53] truncate transition-colors">
                          {apt.patientName}
                        </span>
                        <span className="text-[10px] text-[#7A6258] truncate">{apt.department}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateAppointmentStatus(
                          apt.id,
                          apt.status === 'Confirmed' ? 'Completed' : 'Confirmed'
                        );
                      }}
                      className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border transition-all cursor-pointer shrink-0 ${
                        apt.status === 'Confirmed'
                          ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                          : apt.status === 'Completed'
                          ? 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]'
                          : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                      }`}
                    >
                      {apt.status}
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/app/appointments"
                className="text-xs font-semibold text-[#E06D53] hover:text-[#C54E35] flex items-center gap-1 self-start pt-1"
              >
                <span>View full schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Right: Hospital Overview Trend Line + Bed Occupancy + Wait Time */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Trend Chart Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">Hospital Overview</h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                    This Week ▾
                  </span>
                </div>

                {/* SVG Curve Chart */}
                <div className="h-20 w-full relative flex items-center justify-center">
                  <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E06D53" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#E06D53" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area under curve */}
                    <path
                      d="M 10 50 Q 50 15, 90 40 T 170 30 T 230 45 T 290 15 L 290 65 L 10 65 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Curve line */}
                    <path
                      d="M 10 50 Q 50 15, 90 40 T 170 30 T 230 45 T 290 15"
                      fill="none"
                      stroke="#E06D53"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Glowing highlight beacon on current day (Sun) */}
                    <circle cx="290" cy="15" r="4.5" fill="#E06D53" />
                    <circle cx="290" cy="15" r="8" fill="#E06D53" fillOpacity="0.3" className="animate-ping" />
                  </svg>
                </div>

                <div className="flex justify-between text-[9px] font-mono text-[#A59288] px-1 border-t border-[#EFE5DC] pt-1.5">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span className="font-bold text-[#E06D53]">Sun</span>
                </div>
              </div>

              {/* Bed Occupancy & ER Wait Time Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium text-[#7A6258]">Bed Occupancy</span>
                  <span className="text-xl font-bold text-[#2C1810]">75%</span>
                  <div className="w-full h-1.5 rounded-full bg-[#FAF6F2] overflow-hidden">
                    <div className="h-full bg-[#E06D53] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-[10px] text-[#A59288] font-mono self-end">24 / 30 Active</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium text-[#7A6258]">Average ER Wait</span>
                  <span className="text-xl font-bold text-[#2C1810]">18 min</span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <TrendingDown className="w-3 h-3" />
                    <span>↓ 5 min vs yesterday</span>
                  </div>
                  <span className="text-[10px] text-[#A59288] font-mono">Triage Level 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom AI Operational Insight Bar */}
          <div className="p-3.5 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-warm-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#E06D53] shadow-warm-sm shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#E06D53] uppercase font-mono">AI Insight:</span>
                  <span className="text-xs font-semibold text-[#2C1810]">
                    High patient influx predicted for tomorrow in the ER.
                  </span>
                </div>
                <span className="text-[11px] text-[#7A6258]">
                  Historical weather patterns indicate a 35% surge in respiratory admissions.
                </span>
              </div>
            </div>

            <Link
              href="/app/ai"
              className="px-4 py-1.5 bg-white hover:bg-[#FAF6F2] text-[#2C1810] text-xs font-semibold rounded-xl border border-[#EFE5DC] shadow-warm-sm transition-all shrink-0"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
