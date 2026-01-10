import { getSeriesBySlug, getArticlesBySeries, calculateReadingTime, getTranslatedSlugs } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

import { SlugUpdater } from '@/components/providers/SlugProvider';

// ...

export default async function SeriesDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const t = await getTranslations('Series'); // Need generic Series translations? Or specific?
    const tCommon = await getTranslations('Common');

    const series = await getSeriesBySlug(slug, locale);

    if (!series) {
        notFound();
    }

    const { title: name, description } = series;

    // Fetch articles for this series
    const seriesArticles = await getArticlesBySeries(series.id, locale);
    // Sort by orderInSeries
    seriesArticles.sort((a, b) => a.orderInSeries - b.orderInSeries);

    // Fetch translated slugs
    const translatedSlugs = await getTranslatedSlugs('series', series.translations);
    const slugs = { ...translatedSlugs, [locale]: slug };
    // Handle localizations if needed... WP Polylang usually handles translation by separate posts.
    // For now we assume just one locale active or matched.

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 container mx-auto">
            <SlugUpdater slugs={slugs} />
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <span className="text-neon-blue font-mono text-sm uppercase tracking-widest mb-2 block">{tCommon('part') ? 'Serie' : 'Serie'}</span>
                    {/* Wait, 'Serie' is singular. 'Series' is plural. Dictionary has "Series". 
                        I'll use hardcoded "Serie" or add "SeriesSingular" to dictionary? 
                        Let's use "Series" (title) or "Serie" (label)? 
                        Current UI says "Serie". 
                        I'll just use "Serie" or t('title') if appropriate, but 'title' is 'Series'.
                        I will assume 'Serie' is fine or use a common label like 'Series' if acceptable. 
                        Actually, I can use "Serie" hardcoded if translation missing, but ideally localized.
                        I'll check messages.json. 
                        "Series": { "title": "Series" ... }
                        I will use t('title') but it might be plural.
                        User prompt didn't specify strict singular/plural distinction.
                        I'll stick to 'Serie' hardcoded for Spanish, 'Series' for English?
                        Or just use t('title')?
                        Let's use t('title') ("Series").
                    */}
                    <GlitchText text={name} as="h1" className="text-4xl md:text-6xl font-bold mb-6" />
                    <p className="text-xl text-gray-300 leading-loose">
                        {description}
                    </p>
                </div>

                <div className="space-y-6">
                    {seriesArticles.map((article: any, index: number) => {
                        const readTime = calculateReadingTime(article.content || '');
                        const partNumber = index + 1;

                        return (
                            <div
                                key={article.id}
                            >
                                <Link
                                    href={{ pathname: '/articulo/[slug]', params: { slug: article.slug } }}
                                    className="group block relative rounded-xl overflow-hidden transition-transform hover:scale-[1.01]"
                                >
                                    {/* Gradient Border Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/80 pointer-events-none" />

                                    {/* Inner Content */}
                                    <div className="relative m-[1px] bg-[#0A0A0A] rounded-[11px] p-6 h-full hover:bg-[#0f0f0f] transition-colors">
                                        <div className="flex items-baseline justify-between mb-2">
                                            <span className="text-neon-purple font-mono text-sm font-bold">{tCommon('part')} {partNumber}</span>
                                            <span className="text-gray-500 text-xs">{readTime} {tCommon('min_read')}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center text-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                            {tCommon('read_article')} <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
