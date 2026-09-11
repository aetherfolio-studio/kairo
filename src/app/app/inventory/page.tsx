'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export default function InventoryPage() {
  const { inventory, restockItem } = useHospitalStore();
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Pharmaceuticals' | 'Surgical' | 'PPE & Consumables' | 'Diagnostics'>('All');
  const [search, setSearch] = useState('');

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Pharmacy & Medical Inventory</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Real-time stock levels, automated supplier reorders, and sterile equipment alerts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Pharmaceuticals', 'Surgical', 'PPE & Consumables', 'Diagnostics'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810] bg-[#FAF6F2] border border-[#EFE5DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#7A6258] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medicine, supplies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Inventory Items: Mobile Cards + Desktop Table */}
      <div className="rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm overflow-hidden">
        {/* VIEW 1: Mobile Cards (< md) */}
        <div className="block md:hidden divide-y divide-[#EFE5DC]/80">
          {filteredInventory.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A59288]">
              No inventory items found matching your filters.
            </div>
          ) : (
            filteredInventory.map((item) => (
              <div key={item.id} className="p-4 flex flex-col gap-3 hover:bg-[#FAF6F2] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#2C1810]">{item.name}</h3>
                    <span className="text-[11px] text-[#7A6258]">{item.category} • {item.location}</span>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                      item.status === 'In Stock'
                        ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                        : item.status === 'Low Stock'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[#FEF2F2] text-[#991B1B] border-[#FEE2E2]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-[#FAF6F2] p-2.5 rounded-xl border border-[#EFE5DC]/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-[#A59288]">In Stock</span>
                    <span className="font-mono font-bold text-sm text-[#2C1810]">
                      {item.stockLevel} <span className="text-xs font-normal text-[#7A6258]">{item.unit}</span>
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase font-mono text-[#A59288]">Min Safe Level</span>
                    <span className="font-mono text-xs text-[#7A6258]">
                      {item.minThreshold} {item.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() => restockItem(item.id, 100)}
                    className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FAF6F2] hover:bg-[#E06D53] hover:text-white text-[#2C1810] rounded-xl border border-[#EFE5DC] text-xs font-semibold transition-colors active:scale-[0.98] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Restock +100 Units
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* VIEW 2: Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EFE5DC] bg-[#FAF6F2] text-[#7A6258] font-mono text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Supply Item</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Storage Location</th>
                <th className="py-3.5 px-4 font-semibold">Current Stock</th>
                <th className="py-3.5 px-4 font-semibold">Min Threshold</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE5DC]/60">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#2C1810]">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-[#7A6258]">{item.category}</td>
                  <td className="py-3 px-4 font-mono text-[#7A6258]">{item.location}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#2C1810]">
                    {item.stockLevel} {item.unit}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#A59288]">
                    {item.minThreshold} {item.unit}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                        item.status === 'In Stock'
                          ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                          : item.status === 'Low Stock'
                          ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                          : 'bg-[#FEF2F2] text-[#991B1B] border-[#FEE2E2]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => restockItem(item.id, 100)}
                      className="px-3 py-1 bg-[#FAF6F2] hover:bg-[#E06D53] hover:text-white text-[#2C1810] rounded-lg border border-[#EFE5DC] font-semibold transition-colors cursor-pointer"
                    >
                      + 100 Restock
                    </button>
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
