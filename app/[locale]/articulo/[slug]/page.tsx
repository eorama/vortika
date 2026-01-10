import { getArticleBySlug, getArticlesBySeries, calculateReadingTime, getTranslatedSlugs } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Article } from '@/lib/types';

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

    const { title, excerpt: opening_quote, content, publishedAt, seriesId, seriesName } = article;
    const readTime = article.readTime || calculateReadingTime(content || '').toString() + ' min';

    // Fetch translated slugs for language switcher
    const translatedSlugs = await getTranslatedSlugs('post', article.translations);
    const slugs = { ...translatedSlugs, [locale]: slug };

    // Logic for next/prev
    let nextArticle: any = null;
    let prevArticle: any = null;
    let currentPartNumber = 1;
    let seriesSlug = ''; // WP term doesn't always have slug easily accessible without fetch, but we can't link without it. 
    // We need to fetch series to get slug if we have seriesId

    if (seriesId) {
        try {
            const siblings = await getArticlesBySeries(seriesId, locale);
            // Sort by orderInSeries
            siblings.sort((a: Article, b: Article) => a.orderInSeries - b.orderInSeries);

            const currentIndex = siblings.findIndex((a: Article) => a.id === article.id);
            if (currentIndex !== -1) {
                currentPartNumber = siblings[currentIndex].orderInSeries;
                prevArticle = siblings[currentIndex - 1];
                nextArticle = siblings[currentIndex + 1];

                // Get series slug from siblings? No, they don't have it generally. 
                // We need to fetch series by ID or embedded. 
                // Since we don't have getSeriesById exposed but getSeriesBySlug. 
                // But mapArticle has seriesName. We need seriesSlug for the link.
                // We can fetch all series and find by ID? Or just link to /series if slug missing?
                // Ideally we fetched series info.
                // Let's assume seriesName is good for display, but for Link we need slug.
                // I'll update getArticlesBySeries to maybe embed series info? 
                // For now, let's try to match logic or leave link generic if slug missing.
                // Wait, Next.js 'Link' needs correct params.
                // I will fetch the series details to get the slug.

                // Quick fix: fetch all series (cached) and find match
                const { getSeries } = await import('@/lib/wordpress');
                const allSeries = await getSeries(locale);
                const s = allSeries.find((ser: any) => ser.id === seriesId);
                if (s) seriesSlug = s.slug;
            }
        } catch (err) {
            console.error("Error fetching siblings", err);
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
                    <div
                        className="prose prose-invert prose-lg max-w-none text-gray-200
                        prose-headings:font-bold prose-headings:text-white
                        [&_h2]:text-3xl [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:text-neon-blue
                        [&_h3]:text-2xl [&_h3]:mt-12 [&_h3]:mb-6 [&_h3]:text-neon-purple
                        [&_p]:leading-loose [&_p]:mb-8 [&_p]:text-gray-300
                        [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8
                        [&_li]:relative [&_li]:pl-6 [&_li]:mb-4 [&_li]:text-gray-300
                        [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-3
                        [&_li::before]:w-2 [&_li::before]:h-2 [&_li::before]:bg-neon-purple 
                        [&_li::before]:rounded-full [&_li::before]:animate-pulse
                        [&_blockquote]:border-l-4 [&_blockquote]:border-neon-purple
                        [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-8
                        prose-strong:text-white"
                    >
                        {opening_quote && (
                            <p className="lead text-xl text-gray-300 italic border-l-4 border-neon-purple pl-4 mb-12">
                                {opening_quote}
                            </p>
                        )}
                        <div dangerouslySetInnerHTML={{ __html: content }} />
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
