'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_DEPARTMENTS } from '@/lib/hospitalData';
import { Building2, Activity, Users, Clock, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export function DepartmentShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-16" id="departments">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA] shimmer-badge">
          DEPARTMENTAL ORCHESTRATION
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810]">
          Precision management across every clinical unit.
        </h2>
        <p className="text-sm sm:text-base text-[#7A6258] max-w-2xl leading-relaxed">
          From Level 1 Trauma in Emergency to specialized Neonatal ICU care, Kairo provides customized operational visibility for every department head.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_DEPARTMENTS.map((dept) => (
          <Link
            key={dept.id}
            href={`/app/departments`}
            className="p-6 rounded-3xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/60 shadow-warm-sm hover:shadow-warm-md hover-lift transition-all duration-300 flex flex-col justify-between gap-6 group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF6F2] text-[#E06D53] border border-[#EFE5DC] group-hover:border-[#E06D53]/30 transition-colors">
                  {dept.code}
                </span>
                {dept.activeAlerts > 0 ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{dept.activeAlerts} Alert</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#065F46] border border-[#A7F3D0]">
                    Normal
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors">
                  {dept.name}
                </h3>
                <span className="text-[11px] text-[#7A6258]">Lead: {dept.headDoctor}</span>
                <p className="text-xs text-[#7A6258] leading-relaxed pt-1 line-clamp-2">
                  {dept.description}
                </p>
              </div>

              {/* Occupancy progress bar */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#EFE5DC]">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#7A6258]">Bed Occupancy</span>
                  <span className="font-bold text-[#2C1810]">
                    {dept.occupiedBeds} / {dept.totalBeds} ({dept.occupancyPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      dept.occupancyPercent >= 90
                        ? 'bg-[#EF4444]'
                        : dept.occupancyPercent >= 80
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#E06D53]'
                    }`}
                    style={{ width: `${dept.occupancyPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC] text-[11px] text-[#7A6258] font-mono">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E06D53]" />
                <span>Wait: ~{dept.waitTimeMinutes}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#7A6258]" />
                <span>{dept.staffOnDuty} Staff</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
