'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useHospitalStore } from '@/lib/store';
import { Search, Menu, X, ArrowRight, Activity, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsCommandPaletteOpen, setIsBookDemoOpen } = useHospitalStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAppRoute = pathname.startsWith('/app');
  if (isAppRoute) return null;

  const navLinks = [
    { name: 'Platform', href: '/#platform' },
    { name: 'Departments', href: '/#departments' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF8F5]/90 backdrop-blur-xl border-b border-[#EFE5DC] py-3.5 shadow-warm-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF]/70 border border-[#EFE5DC] px-4 py-1.5 rounded-full backdrop-blur-md shadow-warm-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'text-[#E06D53] bg-[#FDEEE9] font-semibold'
                      : 'text-[#7A6258] hover:text-[#2C1810] hover:bg-[#F6EFE9]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[#7A6258] hover:text-[#2C1810] bg-[#FFFFFF] hover:bg-[#F6EFE9] border border-[#EFE5DC] rounded-xl transition-all shadow-warm-sm cursor-pointer"
              title="Search hospital records (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#7A6258]" />
              <span>Search</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-[#F6EFE9] border border-[#E2D3C7] rounded text-[#7A6258]">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/app"
              className="text-xs font-semibold text-[#7A6258] hover:text-[#2C1810] px-3 py-1.5 transition-colors"
            >
              Log in
            </Link>

            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#E06D53] hover:bg-[#D25C42] px-4 py-2 rounded-full transition-all duration-200 shadow-terracotta hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC] rounded-xl shadow-warm-sm"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC] rounded-xl shadow-warm-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden bg-[#2C1810]/40 backdrop-blur-md flex flex-col pt-20 px-6 pb-8 animate-in fade-in duration-150">
          <div className="w-full bg-[#FBF8F5] rounded-3xl p-6 border border-[#EFE5DC] shadow-warm-lg flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#EFE5DC]">
              <Logo size="md" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#7A6258] hover:text-[#2C1810] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#2C1810] hover:text-[#E06D53] py-1 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#EFE5DC]">
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-full bg-white text-[#2C1810] border border-[#EFE5DC] shadow-warm-sm"
              >
                <Activity className="w-4 h-4 text-[#E06D53]" />
                <span>Open Live Hospital OS</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookDemoOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-full bg-[#E06D53] text-white shadow-terracotta"
              >
                <span>Book a Hospital Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
