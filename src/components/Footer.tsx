'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ShieldCheck, Heart, ArrowRight, CheckCircle2, Globe, Activity } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const footerLinks = {
    platform: [
      { name: 'Patient Management', href: '/app/patients' },
      { name: 'Smart Scheduling', href: '/app/appointments' },
      { name: 'Bed & Ward Occupancy', href: '/app/beds' },
      { name: 'Department Operations', href: '/app/departments' },
      { name: 'Billing & Invoicing', href: '/app/billing' },
      { name: 'Kairo Intelligence AI', href: '/app/ai' },
    ],
    solutions: [
      { name: 'General Hospitals', href: '/solutions#hospitals' },
      { name: 'Specialty Clinics', href: '/solutions#clinics' },
      { name: 'Emergency & Urgent Care', href: '/solutions#emergency' },
      { name: 'Multi-Facility Networks', href: '/solutions#networks' },
    ],
    resources: [
      { name: 'Clinical Operations Journal', href: '/resources' },
      { name: 'Predictive Scheduling Guide', href: '/resources/designing-better-patient-scheduling' },
      { name: 'Reducing Admin Friction', href: '/resources/reducing-administrative-friction-in-hospitals' },
      { name: 'Calm Software Philosophy', href: '/resources/modernizing-hospital-workflows' },
    ],
    company: [
      { name: 'About Kairo', href: '/about' },
      { name: 'Pricing Plans', href: '/pricing' },
      { name: 'Security & Architecture', href: '/about#security' },
      { name: 'Live Hospital App Demo', href: '/app' },
    ]
  };

  return (
    <footer className="bg-[#F6EFE9] border-t border-[#EFE5DC] text-[#7A6258] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#E2D3C7]">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-[#7A6258] max-w-sm leading-relaxed">
              Kairo connects clinical, operational, and administrative workflows in one intelligent platform—helping hospitals run more efficiently while keeping care at the center.
            </p>
            
            {/* Live Operational Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EFE5DC] text-[11px] font-mono text-[#2C1810] shadow-warm-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Kairo Hospital Core: <strong>100% Operational</strong></span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#2C1810]">
              Subscribe to the Healthcare Operations Briefing
            </h4>
            <p className="text-xs text-[#7A6258] max-w-md">
              Bi-weekly research essays on reducing clinical friction, optimizing bed turnover, and intelligent hospital design.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="administrator@hospital.org"
                className="w-full bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53] shadow-warm-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2C1810] hover:bg-[#3D231A] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-warm-sm"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <span className="text-xs text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing to Kairo Briefings.
              </span>
            )}
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#2C1810] font-bold mb-4">
              Platform
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.platform.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#E06D53] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#2C1810] font-bold mb-4">
              Solutions
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.solutions.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#E06D53] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#2C1810] font-bold mb-4">
              Resources
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.resources.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#E06D53] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#2C1810] font-bold mb-4">
              Company
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.company.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#E06D53] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portfolio Concept Project Notice & Copyright */}
        <div className="pt-8 border-t border-[#E2D3C7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A59288]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#E06D53] shrink-0" />
            <span>
              <strong>Portfolio Concept Project:</strong> Kairo is an original design concept exploring modern hospital operations UX. All patient names, medical records, and statistics are fictional demo data.
            </span>
          </div>

          <span className="font-mono shrink-0">
            © {new Date().getFullYear()} Kairo Hospital OS.
          </span>
        </div>
      </div>
    </footer>
  );
}
