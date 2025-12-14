'use client';

import { SERIES, ARTICLES } from '@/lib/mockData';
import { notFound, useParams } from 'next/navigation'; // useParams for client component
import Link from 'next/link';
import GlitchText from '@/components/ui/GlitchText';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function SeriesDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;

    const series = SERIES.find((s) => s.slug === slug);

    if (!series) {
        return <div className="min-h-screen flex items-center justify-center">Series not found</div>;
    }

    const seriesArticles = ARTICLES.filter((a) => a.seriesId === series.id).sort((a, b) => a.orderInSeries - b.orderInSeries);

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <span className="text-neon-blue font-mono text-sm uppercase tracking-widest mb-2 block">Serie</span>
                    <GlitchText text={series.title} as="h1" className="text-4xl md:text-6xl font-bold mb-6" />
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {series.description}
                    </p>
                </div>

                <div className="space-y-6">
                    {seriesArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/articulo/${article.slug}`} className="group block p-6 rounded-xl glass-panel hover:bg-white/5 transition-colors border-l-4 border-transparent hover:border-neon-blue">
                                <div className="flex items-baseline justify-between mb-2">
                                    <span className="text-neon-blue font-mono text-sm">Parte {article.orderInSeries}</span>
                                    <span className="text-gray-500 text-xs">{article.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                    Leer Artículo <ArrowRight size={16} className="ml-2" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
