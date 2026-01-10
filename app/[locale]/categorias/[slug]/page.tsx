import { getCategoryBySlug, getSeries, getTranslatedSlugs } from '@/lib/wordpress';
import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>; // For Next.js 15+
}

import { SlugUpdater } from '@/components/providers/SlugProvider';

// ...

export default async function CategoryDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const t = await getTranslations('CategoryDetail');
    const tCommon = await getTranslations('Common');

    // Pass locale to fetcher
    const category = await getCategoryBySlug(slug, locale);

    if (!category) {
        notFound();
    }

    const { title, description } = category;

    // Fetch all series and filter by this category
    // This is a temporary client-side join. ideal would be GET /series?category=ID if supported.
    const allSeries = await getSeries(locale);
    const categorySeries = allSeries.filter((s: any) => s.categoryId === category.id);

    // Fetch translated slugs
    const translatedSlugs = await getTranslatedSlugs('category', category.translations);
    const slugs = { ...translatedSlugs, [locale]: slug };
    // Handle localizations if Polylang field available

    console.log('DEBUG SLUGS:', slugs);

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 container mx-auto">
            <SlugUpdater slugs={slugs} />
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <GlitchText text={title} as="h1" className="text-4xl md:text-6xl font-bold mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-loose">
                        {description || t("default_desc")}
                    </p>
                </div>

                {categorySeries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 mb-6 rounded-full border-2 border-blue-500/50 flex items-center justify-center animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-blue-500/20 blur-md"></div>
                        </div>
                        <GlitchText text={t("coming_soon_title")} as="h2" className="text-3xl font-bold mb-4 text-white" />
                        <p className="text-lg text-gray-400 max-w-xl">
                            {t("coming_soon_desc")}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categorySeries.map((serie: any) => {
                            // Flattened response structure handling
                            return (
                                <div
                                    key={serie.id}
                                    className="h-full"
                                >
                                    <Link
                                        href={{ pathname: '/series/[slug]', params: { slug: serie.slug } }}
                                        className="group block relative h-full rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                                    >
                                        {/* Gradient Border Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/80 pointer-events-none" />

                                        {/* Inner Content with 1px margin */}
                                        <div className="relative m-[1px] bg-[#0A0A0A] rounded-[11px] p-8 h-full hover:bg-[#0f0f0f] transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-neon-purple text-xs font-mono uppercase tracking-wider border border-neon-purple/30 rounded px-2 py-1">
                                                    {serie.articleCount} {serie.articleCount === 1 ? (tCommon('part') || 'Parte') : (tCommon('articulos') || 'Partes')}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-500 transition-colors">{serie.title}</h3>
                                            <p className="text-gray-400 line-clamp-3">{serie.description}</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
