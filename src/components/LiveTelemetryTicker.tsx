'use client';

import React from 'react';
import { useHospitalStore } from '@/lib/store';
import { Activity, BedDouble, Clock, Receipt, ShieldCheck, Sparkles, Users } from 'lucide-react';

export function LiveTelemetryTicker() {
  const { overallBedOccupancyPercent, activeAlertCount, totalRevenueToday, staff, appointments } = useHospitalStore();

  const metrics = [
    {
      icon: ShieldCheck,
      text: 'Level 1 Trauma Center: Normal Influx',
      color: 'text-emerald-700'
    },
    {
      icon: BedDouble,
      text: `Facility Occupancy: ${overallBedOccupancyPercent}%`,
      color: 'text-[#E06D53]'
    },
    {
      icon: Clock,
      text: 'Avg ER Wait: 18 mins (↓ 5m)',
      color: 'text-emerald-700'
    },
    {
      icon: Activity,
      text: `${appointments.length} Consultations Scheduled`,
      color: 'text-[#2C1810]'
    },
    {
      icon: Receipt,
      text: `$${totalRevenueToday.toLocaleString()} Billed Today`,
      color: 'text-emerald-700'
    },
    {
      icon: Users,
      text: `${staff.filter(s => s.status === 'On Duty').length} Physicians On Duty`,
      color: 'text-[#2C1810]'
    }
  ];

  return (
    <div className="w-full bg-[#FAF6F2] border-b border-[#EFE5DC] overflow-hidden py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono uppercase font-bold text-[10px] text-[#7A6258] tracking-wider">
            Live Telemetry
          </span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pl-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-1.5 shrink-0 text-xs font-medium font-mono text-[#7A6258]">
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                <span className="whitespace-nowrap">{m.text}</span>
                {idx < metrics.length - 1 && <span className="text-[#E2D3C7] ml-4">•</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
