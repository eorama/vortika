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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categorySeries.map((serie, index) => (
                        <motion.div
                            key={serie.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/series/${serie.slug}`} className="block h-full p-8 rounded-xl glass-panel hover:border-neon-green transition-colors">
                                <h3 className="text-2xl font-bold text-white mb-4">{serie.title}</h3>
                                <p className="text-gray-400">{serie.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
