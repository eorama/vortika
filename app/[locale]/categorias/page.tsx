import { getCategories } from '@/lib/strapi';
import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { HelpCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function CategoriesPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations('Categories');
    const tCommon = await getTranslations('Common');

    let categories = [];
    try {
        categories = await getCategories(locale);
    } catch (error) {
        console.error("Failed to fetch categories", error);
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories && categories.map((cat: any, index: number) => {
                        const { name, slug, description, cover } = cat;
                        const IconComponent = HelpCircle; // Default

                        return (
                            <div
                                key={cat.id}
                                className="h-full"
                            >
                                <Link
                                    href={{ pathname: '/categorias/[slug]', params: { slug } }}
                                    className="group block relative h-full rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                                >
                                    {/* Gradient Border Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/80 pointer-events-none" />

                                    {/* Inner Content */}
                                    <div className="relative m-[1px] bg-[#0A0A0A] rounded-[11px] p-6 h-full flex flex-col hover:bg-[#0f0f0f] transition-colors">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <IconComponent size={64} />
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="mb-4 text-neon-purple group-hover:text-white transition-colors">
                                                <IconComponent size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">
                                                {name}
                                            </h3>
                                            <p className="text-sm text-gray-400 flex-grow line-clamp-3">
                                                {description}
                                            </p>
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
