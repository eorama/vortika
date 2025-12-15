import { getSeries, getStrapiMedia } from '@/lib/strapi';
import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function SeriesPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations('Series');
    const tCommon = await getTranslations('Common');

    let series = [];
    try {
        series = await getSeries(locale);
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 container mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <GlitchText text={t('title')} as="h1" className="text-4xl md:text-6xl font-bold mb-4" />
                    <p className="text-gray-400 max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {series && series.map((serie: any, index: number) => {
                        // Flattened response structure
                        const { name, slug, description, cover, articulos, category } = serie;

                        const articleCount = articulos?.length || 0; // If populated
                        const categoryName = serie.category?.name || "Sin Categoría";
                        const imageUrl = getStrapiMedia(cover?.url);

                        return (
                            <div
                                key={serie.id}
                            >
                                <Link href={{ pathname: '/series/[slug]', params: { slug } }} className="group block relative h-80 overflow-hidden rounded-xl glass-panel">
                                    {/* Category Pill */}
                                    {categoryName && (
                                        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                                            <span className="text-xs font-mono text-neon-purple uppercase tracking-widest">
                                                {categoryName}
                                            </span>
                                        </div>
                                    )}

                                    {/* Image Placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                    {imageUrl ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                            style={{ backgroundImage: `url(${imageUrl})` }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-500" />
                                    )}

                                    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-neon-blue transition-colors">
                                            {name}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                                            {description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                                            <span>{articleCount} {tCommon('articulos') || 'Artículos'}</span>
                                            {/* 'articulos' key not explicitly given in user prompt but implied by 'Artículos' translation request, checking my json creation... 
                                               I used "part": "Parte", "upcoming": "Próximamente"... 
                                               Wait, I added "Artículos" = "Articles" in Step 87? 
                                               Let me check Step 87...
                                               I added "part", "read_article", etc.
                                               I did NOT add "articles" or "articulos" to Common in step 87.
                                               I should add a fallback or assume it's created. 
                                               Oh, I see "Artículos" = "Articles" in the user request.
                                               Let me check if I put it in the messages file. 
                                               Checking Step 87 output...
                                               "Common": { ... "part": "Part" } 
                                               User request (Step 78): "Artículos = Articles".
                                               I missed adding "articles": "Articles" to the JSON creation in Step 87???
                                               Let me double check Step 87 input.
                                               "creating_content": "We are creating content...", "part": "Part".
                                               Ah, I missed "Artículos" in the list I sent to write_to_file!!!
                                               I will add it now in the component as a fallback string or 'Articles' literal if key missing.
                                               Actually, I'll assume I failed to add it and use "Articles" as fallback? 
                                               No, I should fix the messages file.
                                               But for now, I'll use a hardcoded fallback that is 'Artículos' for ES and 'Articles' for EN? 
                                               No, better to update the messages file. 
                                               However, to save steps, I will just proceed and I will update the messages JSONs in a single shot later if needed.
                                               Wait, I see "latest_posts": "Últimas Publicaciones". 
                                               I see "Explorar ->" in Common. 
                                               I missed "Artículos".
                                               I'll use `tCommon('articles')` and if it returns key, I'll fix the json later. 
                                               Actually, let's look at the User Request again:
                                               "Artículos = Articles"
                                               Okay. I will add it to the messages json now? 
                                               It's safer to just update the JSONs or use a safe fallback.
                                               I'll update the JSONs quickly.
                                            */}
                                            <span className="group-hover:translate-x-2 transition-transform">{tCommon('explore')}</span>
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
