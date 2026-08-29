'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Receipt,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function BillingPage() {
  const { invoices, updateInvoiceStatus, totalRevenueToday } = useHospitalStore();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Insurance Claim' | 'Overdue'>('All');
  const [search, setSearch] = useState('');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Billing & Revenue Cycle</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Automated patient invoicing, insurance pre-authorizations, and daily ledger reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-[#7A6258]">Billed Today</span>
              <span className="text-base font-bold text-[#2C1810]">${totalRevenueToday.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Paid', 'Pending', 'Insurance Claim'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810] bg-[#FAF6F2] border border-[#EFE5DC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#7A6258] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number, patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Invoices List */}
      <div className="rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EFE5DC] bg-[#FAF6F2] text-[#7A6258] font-mono text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Invoice #</th>
                <th className="py-3.5 px-4 font-semibold">Patient</th>
                <th className="py-3.5 px-4 font-semibold">Department</th>
                <th className="py-3.5 px-4 font-semibold">Insurance Provider</th>
                <th className="py-3.5 px-4 font-semibold">Amount</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE5DC]/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#E06D53]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#2C1810]">{inv.patientName}</span>
                  </td>
                  <td className="py-3 px-4 text-[#7A6258]">{inv.department}</td>
                  <td className="py-3 px-4 font-mono text-[#7A6258]">
                    {inv.insuranceProvider || 'Direct Pay'}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#2C1810]">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        updateInvoiceStatus(
                          inv.id,
                          inv.status === 'Paid' ? 'Pending' : 'Paid'
                        )
                      }
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                        inv.status === 'Paid'
                          ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                          : inv.status === 'Pending'
                          ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                          : 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]'
                      }`}
                    >
                      {inv.status} ▾
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-xs font-semibold text-[#E06D53] hover:underline cursor-pointer">
                      Download PDF →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
