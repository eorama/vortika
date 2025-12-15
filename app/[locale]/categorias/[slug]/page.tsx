import { getCategoryBySlug } from '@/lib/strapi';
import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

// Next.js 15+ needs dynamic params to be awaited or handled properly
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>; // For Next.js 15+
}

import { SlugUpdater } from '@/components/providers/SlugProvider';

// ...

export default async function CategoryDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const t = await getTranslations('CategoryDetail');

    // Pass locale to fetcher
    const category = await getCategoryBySlug(slug, locale);

    if (!category) {
        notFound();
    }

    const { name: title, description, series, localizations } = category.attributes || category;
    // Strapi response flattener usually puts attributes at top level if handled in lib. 
    // Wait, getCategoryBySlug returns data.data[0].attributes? No, it returns data.data[0].
    // If we assume data.data[0] is the object with id and attributes.
    // mapStrapiArticle was used for articles but getCategoryBySlug returns raw.
    // Let's inspect getCategoryBySlug return again. It returns `data.data[0]`.
    // If using straight fetchAPI, typically it's { id: 1, attributes: { ... } }
    // BUT the component uses `const { name: title, ... } = category`.
    // This implies `category` has `name` property directly.
    // This means my lib/strapi.ts returns standard v4 response BUT the component code assumes flattened?
    // Wait, line 22 of existing file: `const { name: title, description, series } = category;`
    // If category came from Strapi v4 raw, it would need `.attributes`.
    // Unless fetchAPI flattens? No, fetchAPI returns `data`.
    // User code before was working. This implies either:
    // 1. Strapi v3 (user said v4 query string issue earlier).
    // 2. A response interceptor/transformer exists? No.
    // 3. The `category` object IS `data.data[0].attributes`? 
    //    getCategoryBySlug returns `data.data[0]`. 
    //    If `data.data[0]` has `name` and `description` directly, then it is fine.
    //    But normally v4 is `{ id, attributes: { name, ... } }`.
    //    If user code was working before, maybe I shouldn't break it. 
    //    Let's check if the user code WAS working. User said "Navego y todo parece bien".
    //    So `category` has prop `name`.
    //    Therefore, `category.localizations` might be inside `category.attributes.localizations` OR `category.localizations` if flattened.
    //    Wait, checking `lib/strapi.ts`: `mapStrapiArticle` handles `item.attributes || item`.
    //    But `getCategoryBySlug` returns `data.data[0]`.
    //    If the previous code worked, then `data.data[0]` must have `name` property.
    //    If so, where are localizations? Likely `category.localizations`.

    // Extract slugs safely
    console.log('DEBUG CATEGORY RAW:', JSON.stringify(category, null, 2));

    const slugs = { [locale]: slug };
    const locs = localizations?.data || localizations || [];

    locs.forEach((loc: any) => {
        const attr = loc.attributes || loc;
        if (attr.locale && attr.slug) {
            slugs[attr.locale] = attr.slug;
        }
    });

    console.log('DEBUG SLUGS:', slugs);

    const categorySeries = series?.data || series || []; // Handle v4 nested data

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 container mx-auto">
            <SlugUpdater slugs={slugs} />
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <GlitchText text={title} as="h1" className="text-4xl md:text-6xl font-bold mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-500 transition-colors">{serie.name}</h3>
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
