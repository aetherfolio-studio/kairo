'use client';

import React from 'react';
import { useHospitalStore } from '@/lib/store';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useHospitalStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-warm-lg flex items-start justify-between gap-3 transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
              isSuccess
                ? 'bg-[#FFFDFC] border-[#A7F3D0] text-[#2C1810]'
                : isWarning
                ? 'bg-[#FFFDFC] border-[#FDE68A] text-[#2C1810]'
                : 'bg-[#FFFDFC] border-[#EFE5DC] text-[#2C1810]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isSuccess
                    ? 'bg-[#E8F8F0] text-[#065F46]'
                    : isWarning
                    ? 'bg-[#FEF3C7] text-[#92400E]'
                    : 'bg-[#FDEEE9] text-[#E06D53]'
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isWarning ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
              </div>

              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-bold text-[#2C1810] leading-tight">
                  {toast.title}
                </span>
                {toast.description && (
                  <p className="text-[11px] text-[#7A6258] leading-relaxed">
                    {toast.description}
                  </p>
                )}
                <span className="text-[9px] font-mono text-[#A59288] pt-0.5">{toast.timestamp}</span>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#A59288] hover:text-[#2C1810] rounded-lg cursor-pointer transition-colors active:scale-90"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
