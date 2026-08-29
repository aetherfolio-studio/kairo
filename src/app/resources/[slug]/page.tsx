import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RESOURCES_ARTICLES } from '@/lib/hospitalData';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return RESOURCES_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = RESOURCES_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | Kairo Hospital OS' };

  return {
    title: `${article.title} | Kairo Clinical Journal`,
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
  const article = RESOURCES_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full bg-[#FBF8F5] text-[#2C1810] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        {/* Back navigation */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A6258] hover:text-[#2C1810] transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to clinical essays</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-full bg-[#FDEEE9] text-[#E06D53] border border-[#F7D5CA]">
              {article.category}
            </span>
            <span className="text-xs font-mono text-[#7A6258] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E06D53]" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2C1810] leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#7A6258] leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-[#EFE5DC]">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#EFE5DC]"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#2C1810]">{article.author.name}</span>
                <span className="text-xs text-[#7A6258]">{article.author.role} • {article.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E06D53] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Key Executive Takeaways</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C1810]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex flex-col gap-6 text-sm sm:text-base text-[#7A6258] leading-relaxed pt-4 border-t border-[#EFE5DC]">
          {article.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* App promotion box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-[#FDEEE9]/50 to-white border border-[#EFE5DC] shadow-warm-md flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#2C1810]">Experience Kairo Hospital OS</h4>
            <p className="text-xs text-[#7A6258]">Explore the live interactive clinical dashboard and smart scheduling.</p>
          </div>
          <Link
            href="/app"
            className="px-6 py-2.5 rounded-full bg-[#E06D53] hover:bg-[#D25C42] text-white font-semibold text-xs shadow-terracotta transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Open Live App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
