'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/mockData';
import { BookOpen, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Productivity', 'Artificial Intelligence', 'Architecture', 'Philosophy'];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30">
            Kairo Journal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
            Essays on product design, workflow craft, and AI systems.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            In-depth perspectives from our engineering and design team on building calm, high-velocity workspaces.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-6 group hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-white/10 text-indigo-400">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/10"
                  />
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-zinc-200">{article.author.name}</span>
                    <span className="text-[10px] text-zinc-500">{article.date}</span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
