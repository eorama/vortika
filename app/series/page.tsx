'use client';

import { SERIES, CATEGORIES } from '@/lib/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';

export default function SeriesPage() {
    return (
        <div className="min-h-screen pt-24 px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <GlitchText text="Series" as="h1" className="text-4xl md:text-6xl font-bold mb-4" />
                    <p className="text-gray-400 max-w-2xl">
                        Narrativas secuenciales para entender el futuro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERIES.map((serie, index) => {
                        const category = CATEGORIES.find(c => c.id === serie.categoryId);

                        return (
                            <motion.div
                                key={serie.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/series/${serie.slug}`} className="group block relative h-80 overflow-hidden rounded-xl glass-panel">
                                    {/* Category Pill */}
                                    {category && (
                                        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                                            <span className="text-xs font-mono text-neon-purple uppercase tracking-widest">
                                                {category.title}
                                            </span>
                                        </div>
                                    )}

                                    {/* Image Placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                    <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-500" />

                                    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-neon-blue transition-colors">
                                            {serie.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                                            {serie.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                                            <span>{serie.articleCount} Artículos</span>
                                            <span className="group-hover:translate-x-2 transition-transform">Explorar -&gt;</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
