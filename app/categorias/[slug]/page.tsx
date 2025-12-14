'use client';

import { CATEGORIES, SERIES } from '@/lib/mockData';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import GlitchText from '@/components/ui/GlitchText';
import { motion } from 'framer-motion';

export default function CategoryDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;

    const category = CATEGORIES.find((c) => c.slug === slug);

    if (!category) {
        return <div className="min-h-screen flex items-center justify-center">Category not found</div>;
    }

    const categorySeries = SERIES.filter((s) => s.categoryId === category.id);

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <GlitchText text={category.title} as="h1" className="text-4xl md:text-6xl font-bold mb-6" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {category.description}
                    </p>
                </div>

                {categorySeries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 mb-6 rounded-full border-2 border-neon-blue flex items-center justify-center animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-neon-blue/20 blur-md"></div>
                        </div>
                        <GlitchText text="El futuro se está cargando" as="h2" className="text-3xl font-bold mb-4 text-white" />
                        <p className="text-lg text-gray-400 max-w-xl">
                            Lo que viene no espera, pero se está diseñando ahora mismo. Estamos construyendo esta serie para que tengas las herramientas antes de que el cambio sea inevitable.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categorySeries.map((serie, index) => (
                            <motion.div
                                key={serie.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/series/${serie.slug}`}
                                    className="group block relative h-full rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                                >
                                    {/* Gradient Border Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/80 pointer-events-none" />

                                    {/* Inner Content with 1px margin */}
                                    <div className="relative m-[1px] bg-[#0A0A0A] rounded-[11px] p-8 h-full hover:bg-[#0f0f0f] transition-colors">
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">{serie.title}</h3>
                                        <p className="text-gray-400">{serie.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
