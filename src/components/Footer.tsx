'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isAppRoute = pathname.startsWith('/app');

  if (isAppRoute) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const footerLinks = {
    Product: [
      { name: 'Overview', href: '/#product' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Changelog', href: '/resources' },
      { name: 'Web App', href: '/app' },
    ],
    Resources: [
      { name: 'Editorial & Essays', href: '/resources' },
      { name: 'Workflow Philosophy', href: '/about' },
      { name: 'API Reference', href: '/resources/the-future-of-ai-assisted-work' },
      { name: 'System Status', href: '/#status' },
    ],
    Company: [
      { name: 'About Kairo', href: '/about' },
      { name: 'Design Pillars', href: '/about' },
      { name: 'Brand & Assets', href: '/about' },
      { name: 'Contact Us', href: 'mailto:contact@kairo.design' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security Overview', href: '#' },
    ],
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo size="md" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Kairo is an intelligent workspace that unifies projects, tasks, conversations, and AI workflows into a single calm interface.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                All Systems Operational (99.99%)
              </span>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 font-mono">
                  {category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full max-w-md">
            <div className="relative flex-1 w-full">
              <input
                type="email"
                required
                placeholder="Subscribe to the Kairo Journal..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            {subscribed && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 ml-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed!
              </span>
            )}
          </form>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-zinc-500 font-mono">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px]">
              Portfolio Concept Design
            </span>
            <span>&copy; {new Date().getFullYear()} Kairo Workspace. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
