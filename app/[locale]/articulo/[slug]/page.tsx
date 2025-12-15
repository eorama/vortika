import { getArticleBySlug, calculateReadingTime } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

import { SlugUpdater } from '@/components/providers/SlugProvider';

// ...

export default async function ArticlePage({ params }: PageProps) {
    const { slug, locale } = await params;
    const tCommon = await getTranslations('Common');

    const article = await getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    const { title, opening_quote, content, publishedAt, serie, localizations } = article.attributes || article;
    const readTime = calculateReadingTime(content || '');

    // Extract slugs safely
    const slugs = { [locale]: slug };
    const locs = localizations?.data || localizations || [];

    locs.forEach((loc: any) => {
        const attr = loc.attributes || loc;
        if (attr.locale && attr.slug) {
            slugs[attr.locale] = attr.slug;
        }
    });

    // Determine Next/Prev links
    // Strategy: We have the article and we populated the series. 
    // We should find the current article index in the series' articles list.
    // However, `getArticleBySlug` populated `serie`. Does `serie` include `articles`?
    // In Strapi v4, deep populate is not automatic. 
    // If we used 'populate[serie][populate]=*' in `getArticleBySlug`, we should have the articles.
    // We need to sort them to match the Series page order (Part 1, Part 2...).
    // But `serie.articles` might not be sorted by `createdAt` by default unless we requested it.
    // For robust "Next/Prev" logic, we usually fetch the whole series + articles again or rely on what we have.
    // Let's assume we have `serie.articles` and we do a client-side sort if needed, or hope default is ID/created.
    // A better approach is to fetch the series separately using `getSeriesBySlug` if we have the series slug.

    let nextArticle: any = null;
    let prevArticle: any = null;
    let currentPartNumber = 1;
    let seriesSlug = null;
    let seriesName = null;

    // Fix: relation is 'articulos' not 'articles'
    if (serie) {
        seriesSlug = serie.slug;
        seriesName = serie.name;

        let allArticles = serie.articulos || [];

        // Sort by id or createdAt to match Series Page 'Part N' logic.
        allArticles.sort((a: any, b: any) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

        const currentIndex = allArticles.findIndex((a: any) => a.id === article.id);
        if (currentIndex !== -1) {
            currentPartNumber = currentIndex + 1;
            prevArticle = allArticles[currentIndex - 1];
            nextArticle = allArticles[currentIndex + 1];
        }
    }

    return (
        <article className="min-h-screen pt-24 pb-32 px-4 md:px-16 container mx-auto">
            <SlugUpdater slugs={slugs} />
            <div className="max-w-5xl mx-auto">
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-5 md:p-12 border border-white/10 mb-12">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        {seriesSlug && (
                            <Link href={{ pathname: '/series/[slug]', params: { slug: seriesSlug } }} className="text-neon-blue text-sm font-mono uppercase tracking-widest hover:underline mb-4 block">
                                {seriesName} / {tCommon('part')} {currentPartNumber}
                            </Link>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm font-mono">
                            <span>{new Date(publishedAt).toLocaleDateString(locale)}</span>
                            <span>•</span>
                            <span>{readTime} {tCommon('min_read')}</span>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none text-gray-200">
                        {opening_quote && (
                            <p className="lead text-xl text-gray-300 italic border-l-4 border-neon-purple pl-4 mb-8">
                                {opening_quote}
                            </p>
                        )}
                        <div className="whitespace-pre-wrap">
                            {content}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-0">
                    {prevArticle ? (
                        <Link href={{ pathname: '/articulo/[slug]', params: { slug: prevArticle.slug } }} className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors self-start md:self-auto group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <div className="text-left">
                                <span className="block text-xs font-mono text-gray-500 mb-1">{tCommon('previous')}</span>
                                <span className="block font-bold text-sm md:text-base max-w-[200px] md:max-w-xs leading-tight">{prevArticle.title}</span>
                            </div>
                        </Link>
                    ) : <div className="hidden md:block" />}

                    {nextArticle ? (
                        <Link href={{ pathname: '/articulo/[slug]', params: { slug: nextArticle.slug } }} className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors text-right self-end md:self-auto group">
                            <div className="text-right">
                                <span className="block text-xs font-mono text-gray-500 mb-1">{tCommon('next')}</span>
                                <span className="block font-bold text-sm md:text-base max-w-[200px] md:max-w-xs leading-tight">{nextArticle.title}</span>
                            </div>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <Link href="/series" className="text-neon-purple hover:text-white transition-colors self-end md:self-auto">
                            {tCommon('see_more') || 'Ver más series'}
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
