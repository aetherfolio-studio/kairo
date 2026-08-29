import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/mockData';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, Share2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | Kairo' };

  return {
    title: `${article.title} | Kairo Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
    }
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        {/* Back navigation */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all essays</span>
        </Link>

        {/* Article Meta Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
              {article.category}
            </span>
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-200">{article.author.name}</span>
                <span className="text-xs text-zinc-400">{article.author.role} • {article.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Callout Card */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-blue-500/20 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Key Executive Takeaways</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="flex flex-col gap-6 text-sm sm:text-base text-zinc-300 leading-relaxed pt-4 border-t border-white/10">
          {article.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* App promotion box */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-zinc-100">Try Kairo in your browser</h4>
            <p className="text-xs text-zinc-400">Experience our calm productivity workspace live today.</p>
          </div>
          <Link
            href="/app"
            className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Open Application</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
