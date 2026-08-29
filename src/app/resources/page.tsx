'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RESOURCES_ARTICLES } from '@/lib/hospitalData';
import { BookOpen, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Clinical Operations', 'Operational Strategy', 'Hospital Analytics', 'Healthcare Design'];

  const filteredArticles = RESOURCES_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06D53] font-bold px-3.5 py-1 rounded-full bg-[#FDEEE9] border border-[#F7D5CA]">
            CLINICAL OPERATIONS JOURNAL
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2C1810] leading-tight">
            Perspectives on healthcare operations and hospital design.
          </h1>
          <p className="text-base sm:text-lg text-[#7A6258] leading-relaxed">
            In-depth research on reducing clinical friction, optimizing bed turnover, and intelligent hospital workflow architecture.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
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
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="p-8 rounded-3xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#7A6258]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6F2] border border-[#EFE5DC] text-[#E06D53] font-bold">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E06D53]" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7A6258] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#EFE5DC]">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#EFE5DC]"
                  />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#2C1810]">{article.author.name}</span>
                    <span className="text-[10px] text-[#7A6258]">{article.author.role}</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#E06D53] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
