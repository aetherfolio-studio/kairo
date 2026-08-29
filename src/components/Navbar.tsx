'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useKairoStore } from '@/lib/store';
import { Search, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsCommandPaletteOpen } = useKairoStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Product', href: '/#product' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  const isAppRoute = pathname.startsWith('/app');

  if (isAppRoute) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-900 border border-white/[0.08] rounded-lg transition-all cursor-pointer"
              title="Search workspace (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Search</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-800 border border-white/10 rounded text-zinc-400">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/app"
              className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 transition-colors"
            >
              Log in
            </Link>

            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 border border-white/10 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 border border-white/10 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-2xl flex flex-col pt-20 px-6 pb-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <Logo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            <Link
              href="/app"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-zinc-900 text-zinc-200 border border-white/10"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Workspace</span>
            </Link>
            <Link
              href="/app"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-white text-zinc-950"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
