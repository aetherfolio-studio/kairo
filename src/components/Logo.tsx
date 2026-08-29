import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  href?: string;
  className?: string;
}

export function Logo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = ''
}: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const badgeSizes = {
    sm: 'text-[8px] tracking-wider',
    md: 'text-[9px] tracking-widest',
    lg: 'text-[10px] tracking-widest',
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 group select-none transition-transform active:scale-[0.98] ${className}`}
    >
      {/* 4-Petal Healthcare Cross Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top petal */}
          <circle cx="18" cy="11" r="6" fill="#E06D53" fillOpacity="0.85" />
          {/* Bottom petal */}
          <circle cx="18" cy="25" r="6" fill="#E06D53" fillOpacity="0.85" />
          {/* Left petal */}
          <circle cx="11" cy="18" r="6" fill="#E06D53" fillOpacity="0.85" />
          {/* Right petal */}
          <circle cx="25" cy="18" r="6" fill="#E06D53" fillOpacity="0.85" />
          {/* Center core */}
          <circle cx="18" cy="18" r="3.5" fill="#FFFFFF" />
          <circle cx="18" cy="18" r="1.8" fill="#E06D53" />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-semibold tracking-tight text-[#2C1810] ${textSizes[size]} font-sans leading-none flex items-center gap-1.5`}
          >
            Kairo
          </span>
          <span
            className={`font-mono uppercase font-semibold text-[#E06D53] ${badgeSizes[size]} mt-0.5 leading-none`}
          >
            HOSPITAL OS
          </span>
        </div>
      )}
    </Link>
  );
}
