import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  size = 'md',
  showWordmark = true,
  className = '',
  href = '/'
}: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const Content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      <div
        className={`relative ${iconSizes[size]} flex items-center justify-center rounded-lg bg-zinc-950 border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.06)] group-hover:border-white/30 transition-all duration-300`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 text-zinc-100 transition-transform duration-300 group-hover:scale-105"
        >
          <path
            d="M12 2L20.5 10.5L12 19L3.5 10.5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          <path
            d="M12 6L16.5 10.5L12 15L7.5 10.5L12 6Z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="12" cy="10.5" r="1.5" fill="#3B82F6" className="animate-pulse" />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={`font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200 ${textSizes[size]}`}
        >
          Kairo
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{Content}</Link>;
  }

  return Content;
}
