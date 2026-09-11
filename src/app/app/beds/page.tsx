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
  UserCheck,
  LayoutGrid,
  List,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function BedsPage() {
  const { wards, updateWardOccupancy, sanitizeBed, overallBedOccupancyPercent } = useHospitalStore();
  const [activeWardAction, setActiveWardAction] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('All');

  const handleAdjust = (wardId: string, delta: number) => {
    setActiveWardAction(wardId);
    setTimeout(() => setActiveWardAction(null), 300);
    updateWardOccupancy(wardId, delta);
  };

  const filteredWards = wards.filter(
    (w) => selectedWardFilter === 'All' || w.category === selectedWardFilter
  );

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

        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                viewMode === 'cards'
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Ward View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                viewMode === 'grid'
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Floor Bed Matrix</span>
            </button>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm shrink-0">
            <BedDouble className="w-4 h-4 text-[#E06D53] animate-pulse" />
            <span className="text-xs font-semibold text-[#2C1810]">
              Facility: <strong className="text-[#E06D53] font-mono">{overallBedOccupancyPercent}%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Category Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Critical Care', 'Emergency', 'General', 'Private', 'Specialty'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedWardFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedWardFilter === cat
                ? 'bg-[#E06D53] text-white shadow-warm-sm'
                : 'text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIEW 1: WARD CARDS */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {filteredWards.map((ward) => {
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

                {/* Quick Adjustment Controls & Sanitize Trigger */}
                <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC]">
                  <button
                    onClick={() => sanitizeBed(ward.id)}
                    className="text-[11px] text-[#7A6258] hover:text-[#E06D53] flex items-center gap-1 transition-colors cursor-pointer font-mono"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sanitize Bed</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdjust(ward.id, -1)}
                      disabled={ward.occupied <= 0}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF6F2] hover:bg-[#F6EFE9] text-[#2C1810] border border-[#EFE5DC] disabled:opacity-30 cursor-pointer active:scale-90 transition-transform"
                      title="Discharge Bed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAdjust(ward.id, 1)}
                      disabled={ward.occupied >= ward.total}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white disabled:opacity-30 shadow-terracotta cursor-pointer active:scale-90 transition-transform"
                      title="Admit to Bed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: FLOOR BED MATRIX */}
      {viewMode === 'grid' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {filteredWards.map((ward) => (
            <div
              key={ward.id}
              className="p-4 sm:p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-[#2C1810]">{ward.wardName}</h3>
                  <span className="text-xs font-mono text-[#7A6258] px-2 py-0.5 rounded-full bg-[#FAF6F2] border border-[#EFE5DC]">{ward.category}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#E06D53]">
                  {ward.occupied} / {ward.total} Occupied ({ward.percentage}%)
                </span>
              </div>

              {/* Grid of Bed Tiles: 4 cols on mobile for tactile min-44px targets */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 pt-2">
                {Array.from({ length: ward.total }).map((_, idx) => {
                  const isOccupied = idx < ward.occupied;
                  const isReserved = !isOccupied && idx < ward.occupied + ward.reserved;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAdjust(ward.id, isOccupied ? -1 : 1)}
                      className={`min-h-[52px] p-2 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                        isOccupied
                          ? 'bg-[#FDEEE9] border-[#F7D5CA] text-[#E06D53]'
                          : isReserved
                          ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
                          : 'bg-[#E8F8F0] border-[#A7F3D0] text-[#065F46]'
                      }`}
                      title={
                        isOccupied
                          ? `Bed ${idx + 1}: Occupied (Click to discharge)`
                          : isReserved
                          ? `Bed ${idx + 1}: Reserved`
                          : `Bed ${idx + 1}: Available (Click to admit)`
                      }
                    >
                      <BedDouble className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">
                        B-{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
