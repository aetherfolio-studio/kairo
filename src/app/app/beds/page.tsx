'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  BedDouble,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  Clock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function BedsPage() {
  const { wards, updateWardOccupancy, overallBedOccupancyPercent } = useHospitalStore();
  const [activeWardAction, setActiveWardAction] = useState<string | null>(null);

  const handleAdjust = (wardId: string, delta: number) => {
    setActiveWardAction(wardId);
    setTimeout(() => setActiveWardAction(null), 300);
    updateWardOccupancy(wardId, delta);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Bed & Ward Capacity Management</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Real-time ward telemetry, occupancy ceilings, step-down transfers, and discharge turnover.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
          <BedDouble className="w-4 h-4 text-[#E06D53] animate-pulse" />
          <span className="text-xs font-semibold text-[#2C1810]">
            Overall Facility Occupancy: <strong className="text-[#E06D53] font-mono">{overallBedOccupancyPercent}%</strong>
          </span>
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wards.map((ward) => {
          const isActed = activeWardAction === ward.id;
          return (
            <div
              key={ward.id}
              className={`p-6 rounded-3xl bg-white border shadow-warm-sm hover:shadow-warm-md hover-lift transition-all duration-300 flex flex-col justify-between gap-6 ${
                isActed ? 'border-[#E06D53] ring-2 ring-[#E06D53]/20' : 'border-[#EFE5DC]'
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                    {ward.category} Ward
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors duration-300 ${
                      ward.status === 'Critical'
                        ? 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2] animate-pulse'
                        : ward.status === 'Near Capacity'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                    }`}
                  >
                    {ward.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#2C1810]">{ward.wardName}</h3>
                  <span className="text-xs text-[#7A6258]">{ward.nurseInCharge}</span>
                </div>

                {/* Capacity Big Metric */}
                <div className="flex items-baseline justify-between pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#2C1810] tracking-tight">{ward.occupied}</span>
                    <span className="text-xs text-[#7A6258] font-mono">/ {ward.total} Beds</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#E06D53]">{ward.percentage}%</span>
                </div>

                {/* Progress Bar with smooth transition */}
                <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      ward.percentage >= 90
                        ? 'bg-[#EF4444]'
                        : ward.percentage >= 80
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#E06D53]'
                    }`}
                    style={{ width: `${ward.percentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
                  <div className="p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col">
                    <span className="text-[10px] text-[#7A6258]">Available Beds</span>
                    <span className="font-bold text-[#065F46]">{ward.available} Beds</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col">
                    <span className="text-[10px] text-[#7A6258]">Reserved Buffer</span>
                    <span className="font-bold text-[#2C1810]">{ward.reserved} Beds</span>
                  </div>
                </div>
              </div>

              {/* Quick Adjustment Controls for Simulation */}
              <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC]">
                <span className="text-[11px] text-[#A59288] font-mono">Live Ward Adjust:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(ward.id, -1)}
                    disabled={ward.occupied <= 0}
                    className="p-2 rounded-xl bg-[#FAF6F2] hover:bg-[#F6EFE9] text-[#2C1810] border border-[#EFE5DC] disabled:opacity-30 cursor-pointer active:scale-90 transition-transform"
                    title="Discharge / Free Bed"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleAdjust(ward.id, 1)}
                    disabled={ward.occupied >= ward.total}
                    className="p-2 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white disabled:opacity-30 shadow-terracotta cursor-pointer active:scale-90 transition-transform"
                    title="Admit Patient to Bed"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
