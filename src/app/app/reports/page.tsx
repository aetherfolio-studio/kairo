'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  BarChart3,
  Calendar,
  TrendingUp,
  Activity,
  BedDouble,
  Users,
  CheckCircle2,
  Download
} from 'lucide-react';

export default function ReportsPage() {
  const { overallBedOccupancyPercent, addToast } = useHospitalStore();
  const [timeRange, setTimeRange] = useState<'This Week' | 'This Month' | 'Quarter'>('This Week');

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Hospital Analytics & Visual Reports</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Patient volume trends, unit utilization, admissions vs discharges, and clinical KPIs.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="flex items-center p-1 bg-white border border-[#EFE5DC] rounded-xl shadow-warm-sm">
            {(['This Week', 'This Month', 'Quarter'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`min-h-[36px] px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeRange === r ? 'bg-[#E06D53] text-white shadow-warm-sm' : 'text-[#7A6258] hover:text-[#2C1810]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              addToast({
                title: 'Analytics Export Generated',
                description: `Exported ${timeRange} clinical KPI dataset to CSV.`,
                type: 'success'
              });
            }}
            className="min-h-[40px] px-4 py-2 bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] text-xs font-semibold rounded-xl shadow-warm-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#E06D53]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#7A6258]">Average Length of Stay (ALOS)</span>
          <span className="text-3xl font-bold text-[#2C1810]">3.4 Days</span>
          <span className="text-[11px] text-emerald-600 font-mono">↓ 0.4 days vs last month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#7A6258]">Bed Turnover Rate</span>
          <span className="text-3xl font-bold text-[#2C1810]">88.2%</span>
          <span className="text-[11px] text-emerald-600 font-mono">↑ 4.1% efficiency</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#7A6258]">30-Day Readmission Rate</span>
          <span className="text-3xl font-bold text-[#2C1810]">4.1%</span>
          <span className="text-[11px] text-emerald-600 font-mono">Well below 8% national target</span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Admissions vs Discharges */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#2C1810]">Admissions vs Discharges Flow</h3>
            <span className="text-xs font-mono text-[#7A6258]">{timeRange}</span>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center pt-4">
            <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
              {/* Admissions Curve (Terracotta) */}
              <path
                d="M 10 90 Q 50 30, 100 65 T 180 40 T 260 70 T 310 30"
                fill="none"
                stroke="#E06D53"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Discharges Curve (Emerald) */}
              <path
                d="M 10 95 Q 50 50, 100 80 T 180 60 T 260 85 T 310 45"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#EFE5DC] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E06D53]"></span>
              <span className="text-[#2C1810] font-semibold">Admissions (148)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-[#2C1810] font-semibold">Discharges (136)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Department Utilization Breakdown */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#2C1810]">Department Resource Utilization</h3>
            <span className="text-xs font-mono text-[#7A6258]">Capacity %</span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[#2C1810]">Emergency Medicine</span>
                <span className="font-mono text-[#EF4444] font-bold">90% Capacity</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                <div className="h-full bg-[#EF4444] rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[#2C1810]">Cardiology & Telemetry</span>
                <span className="font-mono text-[#F59E0B] font-bold">82% Capacity</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[#2C1810]">Intensive Care Unit (ICU)</span>
                <span className="font-mono text-[#E06D53] font-bold">80% Capacity</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                <div className="h-full bg-[#E06D53] rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[#2C1810]">Orthopedics & Surgical Wing</span>
                <span className="font-mono text-emerald-600 font-bold">75% Capacity</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
