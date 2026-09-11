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
  ChevronDown,
  Activity,
  BedDouble,
  Plus,
  Minus,
  Search,
  Check
} from 'lucide-react';
import { useHospitalStore } from '@/lib/store';

export function HeroDashboardPreview() {
  const router = useRouter();
  const {
    patients,
    appointments,
    wards,
    departments,
    updateAppointmentStatus,
    updateWardOccupancy,
    setSelectedPatient,
    setIsNewPatientOpen,
    setIsNewAppointmentOpen,
    overallBedOccupancyPercent
  } = useHospitalStore();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Appointments' | 'Beds' | 'AI'>('Overview');
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleStatusToggle = (aptId: string, currentStatus: string) => {
    setLastClickedId(aptId);
    setTimeout(() => setLastClickedId(null), 300);
    updateAppointmentStatus(
      aptId,
      currentStatus === 'Confirmed' ? 'Completed' : 'Confirmed'
    );
  };

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      setAiAnswer(
        `Analysis for "${aiQuestion}": All 8 wards operational. Overall facility occupancy is at ${overallBedOccupancyPercent}%. Emergency department wait is 18 mins.`
      );
    }, 500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-lg overflow-hidden transition-all duration-300 hover:shadow-warm-lg">
      {/* Top Application Frame Header */}
      <div className="bg-[#FDFBF9] px-4 py-2.5 border-b border-[#EFE5DC] flex items-center justify-between text-xs text-[#7A6258]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#E06D53]/40 border border-[#E06D53]/70 hover:scale-110 transition-transform cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/40 border border-[#F59E0B]/70 hover:scale-110 transition-transform cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-[#10B981]/40 border border-[#10B981]/70 hover:scale-110 transition-transform cursor-pointer"></span>
          <span className="ml-2 font-mono text-[11px] text-[#A59288] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            kairo-hospital-os.internal/dashboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full shimmer-badge text-[#E06D53] font-semibold border border-[#F7D5CA] shadow-warm-sm">
            ✨ FULLY INTERACTIVE WORKSPACE
          </span>
        </div>
      </div>

      {/* Main Dashboard Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left App Sidebar (Desktop Only: lg:flex) */}
        <div className="hidden lg:flex lg:col-span-3 border-r border-[#EFE5DC] bg-[#FFFDFC] p-4 flex-col justify-between select-none">
          <div className="flex flex-col gap-5">
            <div className="px-2 pt-1 flex items-center justify-between">
              <Logo size="sm" showWordmark={true} href="/app" />
            </div>

            {/* In-Preview Interactive Tabs */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-[#A59288] px-3 font-bold">
                Interactive Modules
              </span>
              {[
                { name: 'Overview' as const, icon: LayoutDashboard, count: 'Live' },
                { name: 'Appointments' as const, icon: Calendar, count: `${appointments.length}` },
                { name: 'Beds' as const, icon: BedDouble, count: `${overallBedOccupancyPercent}%` },
                { name: 'AI' as const, icon: Sparkles, count: 'Smart' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left cursor-pointer active:scale-[0.98] ${
                      isActive
                        ? 'bg-[#FDEEE9] text-[#E06D53] font-semibold shadow-warm-sm translate-x-0.5'
                        : 'text-[#7A6258] hover:text-[#2C1810] hover:bg-[#F8F3ED] hover:translate-x-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#E06D53]' : 'text-[#A59288]'}`} />
                      <span>{item.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#E06D53] text-white' : 'bg-[#FAF6F2] text-[#7A6258]'}`}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Sidebar */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#EFE5DC]">
              <span className="text-[10px] font-mono uppercase text-[#A59288] px-3 font-bold">
                Quick Actions
              </span>
              <button
                onClick={() => setIsNewPatientOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#2C1810] bg-[#FAF6F2] hover:bg-[#F6EFE9] rounded-xl border border-[#EFE5DC] transition-colors cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#E06D53]" />
                <span>Admit New Patient</span>
              </button>
              <button
                onClick={() => setIsNewAppointmentOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#2C1810] bg-[#FAF6F2] hover:bg-[#F6EFE9] rounded-xl border border-[#EFE5DC] transition-colors cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E06D53]" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>

          {/* Bottom Administrator Profile */}
          <Link
            href="/app/settings"
            className="pt-4 border-t border-[#EFE5DC] flex items-center justify-between px-2 hover:bg-[#FAF6F2] p-1.5 rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Sarah Chen"
                className="w-8 h-8 rounded-full object-cover border border-[#E2D3C7] group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2C1810]">Dr. Sarah Chen</span>
                <span className="text-[10px] text-[#A59288]">Chief Medical Officer</span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#A59288] group-hover:text-[#E06D53] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Right Dashboard Workspace */}
        <div className="lg:col-span-9 bg-[#FAF6F2] p-4 sm:p-6 flex flex-col gap-5 sm:gap-6">
          {/* Mobile Module Navigation Pill Strip (< lg) */}
          <div className="flex lg:hidden items-center justify-between gap-2 border-b border-[#EFE5DC] pb-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              {[
                { name: 'Overview' as const, icon: LayoutDashboard, count: 'Live' },
                { name: 'Appointments' as const, icon: Calendar, count: `${appointments.length}` },
                { name: 'Beds' as const, icon: BedDouble, count: `${overallBedOccupancyPercent}%` },
                { name: 'AI' as const, icon: Sparkles, count: 'Smart' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-[#E06D53] text-white shadow-warm-sm'
                        : 'bg-white text-[#7A6258] border border-[#EFE5DC]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                    <span className={`text-[9px] font-mono px-1 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#FAF6F2] text-[#7A6258]'}`}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Quick Action Pill */}
            <button
              onClick={() => setIsNewPatientOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white text-[#E06D53] border border-[#F7D5CA] text-xs font-semibold shrink-0 shadow-warm-sm flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Plus className="w-3 h-3" />
              <span>Admit</span>
            </button>
          </div>

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2C1810] flex items-center gap-2">
                <span>Good morning, Dr. Sarah</span>
                <span className="text-xl animate-float inline-block">👋</span>
              </h2>
              <p className="text-xs text-[#7A6258]">
                CityCare Memorial Hospital • <strong className="text-[#2C1810]">Level 1 Trauma Center</strong>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/app"
                className="px-3.5 py-1.5 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold shadow-terracotta transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Launch Full App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#7A6258]">Appointments</span>
                    <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-[#2C1810] tracking-tight">{appointments.length} Today</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium font-mono">
                    <TrendingUp className="w-3 h-3 animate-pulse" />
                    <span>↑ 12% vs yesterday</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#7A6258]">Admitted</span>
                    <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-[#2C1810] tracking-tight">{patients.filter(p => p.status === 'Admitted').length} Patients</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium font-mono">
                    <TrendingUp className="w-3 h-3 animate-pulse" />
                    <span>↑ 8% vs yesterday</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#7A6258]">Facility Occupancy</span>
                    <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                      <BedDouble className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-[#2C1810] tracking-tight">{overallBedOccupancyPercent}%</span>
                  <div className="w-full h-1.5 rounded-full bg-[#FAF6F2] overflow-hidden">
                    <div className="h-full bg-[#E06D53] rounded-full transition-all duration-700" style={{ width: `${overallBedOccupancyPercent}%` }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#7A6258]">Daily Billed</span>
                    <div className="w-7 h-7 rounded-lg bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
                      <Receipt className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-[#2C1810] tracking-tight">$24,560</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium font-mono">
                    <TrendingUp className="w-3 h-3" />
                    <span>↑ 15% vs yesterday</span>
                  </div>
                </div>
              </div>

              {/* Schedule & Trend Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Schedule */}
                <div className="lg:col-span-7 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#E06D53]" />
                      <span>Today&apos;s Schedule (Click to cycle status)</span>
                    </h3>
                    <span className="text-[10px] font-mono text-[#A59288]">Live Sync</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {appointments.slice(0, 4).map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => {
                          const foundPatient = patients.find((p) => p.name === apt.patientName);
                          if (foundPatient) setSelectedPatient(foundPatient);
                        }}
                        className="p-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F6EFE9] border border-[#EFE5DC]/60 hover:border-[#E06D53]/40 flex items-center justify-between gap-2 transition-all cursor-pointer group hover:translate-x-1"
                        title="Click to view medical chart"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-mono font-bold text-[#2C1810] shrink-0 group-hover:text-[#E06D53] transition-colors">
                            {apt.time}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-[#2C1810] group-hover:text-[#E06D53] truncate transition-colors">
                              {apt.patientName}
                            </span>
                            <span className="text-[10px] text-[#7A6258] truncate">{apt.department} • {apt.doctor}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusToggle(apt.id, apt.status);
                          }}
                          className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border transition-all cursor-pointer shrink-0 active:scale-90 ${
                            lastClickedId === apt.id ? 'scale-110' : ''
                          } ${
                            apt.status === 'Confirmed'
                              ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0] hover:bg-[#D1FAE5]'
                              : apt.status === 'Completed'
                              ? 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE] hover:bg-[#E0E7FF]'
                              : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] hover:bg-[#FDE68A]'
                          }`}
                        >
                          {apt.status} ▾
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#EFE5DC] text-[11px] text-[#7A6258]">
                    <span>💡 Click any patient to open their EHR medical chart.</span>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="text-xs font-semibold text-[#E06D53] hover:underline"
                    >
                      View all ({appointments.length}) →
                    </button>
                  </div>
                </div>

                {/* Right Admissions Chart */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">Admissions Trend</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                      This Week
                    </span>
                  </div>

                  <div className="h-24 w-full relative flex items-center justify-center">
                    <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E06D53" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#E06D53" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10 50 Q 50 15, 90 40 T 170 30 T 230 45 T 290 15 L 290 65 L 10 65 Z"
                        fill="url(#heroGradient)"
                      />
                      <path
                        d="M 10 50 Q 50 15, 90 40 T 170 30 T 230 45 T 290 15"
                        fill="none"
                        stroke="#E06D53"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="290" cy="15" r="4.5" fill="#E06D53" />
                      <circle cx="290" cy="15" r="9" fill="#E06D53" fillOpacity="0.3" className="animate-ping" />
                    </svg>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#7A6258]">Average ER Door-to-Doctor:</span>
                    <span className="font-bold text-emerald-700">18 mins (↓ 5m)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'Appointments' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C1810]">
                  Clinical Consultations &amp; Surgical Slots ({appointments.length})
                </span>
                <button
                  onClick={() => setIsNewAppointmentOpen(true)}
                  className="px-3 py-1 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl transition-all shadow-terracotta cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Appointment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => {
                      const found = patients.find((p) => p.name === apt.patientName);
                      if (found) setSelectedPatient(found);
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/50 shadow-warm-sm flex flex-col justify-between gap-3 cursor-pointer group hover-lift transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC]">
                        {apt.time}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusToggle(apt.id, apt.status);
                        }}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                          apt.status === 'Confirmed'
                            ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                            : 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]'
                        }`}
                      >
                        {apt.status} ▾
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors">
                        {apt.patientName}
                      </span>
                      <span className="text-[11px] text-[#7A6258]">{apt.doctor} • {apt.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BEDS */}
          {activeTab === 'Beds' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C1810]">
                  Live Ward Bed Occupancy (Click +/- to simulate admissions)
                </span>
                <span className="text-xs font-mono text-[#E06D53] font-bold">
                  Facility: {overallBedOccupancyPercent}% Occupied
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {wards.map((ward) => (
                  <div
                    key={ward.id}
                    className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C1810]">{ward.wardName}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          ward.status === 'Critical'
                            ? 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]'
                            : 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                        }`}
                      >
                        {ward.occupied}/{ward.total} Beds
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                      <div
                        className="h-full bg-[#E06D53] rounded-full transition-all duration-500"
                        style={{ width: `${ward.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EFE5DC]">
                      <span className="text-[11px] text-[#7A6258] font-mono">{ward.percentage}% full</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateWardOccupancy(ward.id, -1)}
                          disabled={ward.occupied <= 0}
                          className="p-1 rounded-lg bg-[#FAF6F2] hover:bg-[#F6EFE9] text-[#2C1810] border border-[#EFE5DC] disabled:opacity-30 cursor-pointer active:scale-90"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateWardOccupancy(ward.id, 1)}
                          disabled={ward.occupied >= ward.total}
                          className="p-1 rounded-lg bg-[#E06D53] text-white disabled:opacity-30 cursor-pointer active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI INTELLIGENCE */}
          {activeTab === 'AI' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C1810] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E06D53]" />
                  <span>Kairo Intelligence Copilot</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#065F46] border border-[#A7F3D0]">
                  Live Telemetry Connected
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-3 min-h-[160px]">
                <div className="p-3 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] text-xs text-[#2C1810] leading-relaxed">
                  {aiAnswer ? (
                    <p>{aiAnswer}</p>
                  ) : (
                    <p>
                      👋 I am connected to CityCare&apos;s real-time bed count, appointment roster, and emergency triage graph. Ask me anything about today&apos;s capacity!
                    </p>
                  )}
                </div>

                {isAiThinking && (
                  <div className="text-xs text-[#7A6258] font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#E06D53] animate-spin" />
                    <span>Analyzing hospital telemetry...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleAiAsk} className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask about beds, emergency wait times, or bottleneck predictions..."
                  className="flex-1 bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53] shadow-warm-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl shadow-terracotta transition-all cursor-pointer active:scale-95"
                >
                  Analyze
                </button>
              </form>
            </div>
          )}

          {/* Bottom AI Operational Insight Bar */}
          <div className="p-3.5 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-warm-sm animate-glow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#E06D53] shadow-warm-sm shrink-0 animate-heartbeat">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#E06D53] uppercase font-mono">AI Insight:</span>
                  <span className="text-xs font-semibold text-[#2C1810]">
                    High patient influx predicted for tomorrow in Emergency.
                  </span>
                </div>
                <span className="text-[11px] text-[#7A6258]">
                  Pre-allocating 4 swing beds in Ward 2A is recommended to prevent surgical delays.
                </span>
              </div>
            </div>

            <Link
              href="/app/ai"
              className="px-4 py-1.5 bg-white hover:bg-[#FAF6F2] text-[#2C1810] text-xs font-semibold rounded-xl border border-[#EFE5DC] shadow-warm-sm transition-all active:scale-95 shrink-0"
            >
              Open Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
