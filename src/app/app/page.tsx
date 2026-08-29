'use client';

import React from 'react';
import Link from 'next/link';
import { useHospitalStore } from '@/lib/store';
import {
  Calendar,
  Users,
  Receipt,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Clock,
  Building2,
  AlertTriangle,
  Activity,
  BedDouble,
  CheckCircle2,
  Plus
} from 'lucide-react';

export default function AppOverviewPage() {
  const {
    patients,
    appointments,
    departments,
    wards,
    updateAppointmentStatus,
    setSelectedPatient,
    setIsNewPatientOpen,
    setIsNewAppointmentOpen,
    overallBedOccupancyPercent
  } = useHospitalStore();

  const admittedPatients = patients.filter((p) => p.status === 'Admitted' || p.status === 'In Surgery');

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Top Greeting & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-md">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2C1810]">
              Good morning, Dr. Sarah
            </h1>
            <span className="text-xl">👋</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FDEEE9] text-[#E06D53] border border-[#F7D5CA] text-[10px] font-mono font-bold">
              Level 1 Trauma Center
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Here&apos;s the live operational status for CityCare Hospital. <strong className="text-[#2C1810]">{admittedPatients.length} patients currently admitted</strong> across 8 clinical wards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewAppointmentOpen(true)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF6F2] text-[#2C1810] text-xs font-semibold border border-[#EFE5DC] shadow-warm-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E06D53]" />
            <span>Book Consultation</span>
          </button>
          <button
            onClick={() => setIsNewPatientOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold shadow-terracotta transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit Patient</span>
          </button>
        </div>
      </div>

      {/* 2. Key Operational Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Appointments Today */}
        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7A6258]">Appointments Today</span>
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-[#2C1810]">128</span>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 12% vs yesterday</span>
          </div>
        </div>

        {/* Patients Admitted */}
        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7A6258]">Patients Admitted</span>
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-[#2C1810]">{admittedPatients.length}</span>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 8% vs yesterday</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7A6258]">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-[#2C1810]">$24,560</span>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 15% vs yesterday</span>
          </div>
        </div>

        {/* Discharges */}
        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7A6258]">Discharges</span>
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-[#2C1810]">18</span>
          <div className="flex items-center gap-1 text-xs text-rose-500 font-medium font-mono">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>↓ 5% vs yesterday</span>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Clinical Schedule */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#2C1810]">Today&apos;s Schedule</h2>
              <span className="text-xs font-mono text-[#7A6258]">({appointments.length} Consultations)</span>
            </div>
            <Link
              href="/app/appointments"
              className="text-xs text-[#E06D53] hover:text-[#C54E35] font-semibold flex items-center gap-1"
            >
              <span>Full calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => {
                  const foundPatient = patients.find((p) => p.name === apt.patientName);
                  if (foundPatient) setSelectedPatient(foundPatient);
                }}
                className="p-3.5 rounded-2xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-xs font-mono font-bold text-[#2C1810] shrink-0">{apt.time}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#2C1810] group-hover:text-[#E06D53] truncate transition-colors">
                      {apt.patientName}
                    </span>
                    <span className="text-[11px] text-[#7A6258] truncate">
                      {apt.department} • {apt.doctor} • {apt.room}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAppointmentStatus(
                        apt.id,
                        apt.status === 'Confirmed' ? 'Completed' : 'Confirmed'
                      );
                    }}
                    className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
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
              </div>
            ))}
          </div>

          {/* AI Operational Insight Callout */}
          <div className="p-4 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-start gap-3 mt-2 shadow-warm-sm">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#E06D53] shrink-0 shadow-warm-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#E06D53] font-mono uppercase">
                AI Operational Insight
              </span>
              <p className="text-xs text-[#2C1810] leading-relaxed">
                High patient influx predicted for tomorrow in Emergency. Historical weekend correlation suggests pre-allocating 4 swing beds in Ward 2A.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hospital Overview & Bed Capacity */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Hospital Overview Volume Chart */}
          <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">Hospital Admissions Trend</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                This Week
              </span>
            </div>

            <div className="h-28 w-full relative flex items-center justify-center pt-2">
              <svg viewBox="0 0 300 90" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="appChartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E06D53" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E06D53" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 70 Q 50 20, 90 55 T 170 40 T 230 60 T 290 20 L 290 85 L 10 85 Z"
                  fill="url(#appChartGradient)"
                />
                <path
                  d="M 10 70 Q 50 20, 90 55 T 170 40 T 230 60 T 290 20"
                  fill="none"
                  stroke="#E06D53"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="290" cy="20" r="5" fill="#E06D53" />
                <circle cx="290" cy="20" r="9" fill="#E06D53" fillOpacity="0.3" className="animate-ping" />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#A59288] px-1 border-t border-[#EFE5DC] pt-2">
              <span>Mon (98)</span>
              <span>Tue (112)</span>
              <span>Wed (105)</span>
              <span>Thu (120)</span>
              <span>Fri (118)</span>
              <span>Sat (94)</span>
              <span className="font-bold text-[#E06D53]">Sun (128)</span>
            </div>
          </div>

          {/* Ward Bed Capacities */}
          <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]">Ward Bed Occupancy</h3>
              <Link href="/app/beds" className="text-xs text-[#E06D53] hover:underline font-semibold">
                Manage beds →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {wards.map((ward) => (
                <div key={ward.id} className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#2C1810] font-semibold">{ward.wardName}</span>
                    <span className="font-mono text-[#7A6258]">
                      {ward.occupied} / {ward.total} ({ward.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        ward.percentage >= 90
                          ? 'bg-[#EF4444]'
                          : ward.percentage >= 80
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#E06D53]'
                      }`}
                      style={{ width: `${ward.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
