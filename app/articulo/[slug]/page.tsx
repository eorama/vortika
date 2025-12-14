/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ARTICLES, SERIES } from '@/lib/mockData';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Helper to calculate reading time
function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} min de lectura`;
}

export default function ArticlePage() {
    const params = useParams() as { slug: string };
    const slug = params?.slug;

    const article = ARTICLES.find((a) => a.slug === slug);

    if (!article) {
        return <div className="min-h-screen flex items-center justify-center">Article not found</div>;
    }

    const series = SERIES.find((s) => s.id === article.seriesId);
    const nextArticle = ARTICLES.find((a) => a.seriesId === article.seriesId && a.orderInSeries === article.orderInSeries + 1);
    const prevArticle = ARTICLES.find((a) => a.seriesId === article.seriesId && a.orderInSeries === article.orderInSeries - 1);

    const readTime = calculateReadingTime(article.content || '');

    return (
        <article className="min-h-screen pt-24 pb-32 px-8 md:px-16">
            <div className="max-w-5xl mx-auto">
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 mb-12">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        {series && (
                            <Link href={`/series/${series.slug}`} className="text-neon-blue text-sm font-mono uppercase tracking-widest hover:underline mb-4 block">
                                {series.title} / Parte {article.orderInSeries}
                            </Link>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm font-mono">
                            <span>{article.publishedAt}</span>
                            <span>•</span>
                            <span>{readTime}</span>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none text-gray-200">
                        <p className="lead text-xl text-gray-300 italic border-l-4 border-neon-purple pl-4 mb-8">
                            {article.excerpt}
                        </p>
                        <div
                            className="text-gray-200 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div className="border-t border-white/10 pt-12 flex justify-between items-center">
                    {prevArticle ? (
                        <Link href={`/articulo/${prevArticle.slug}`} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors">
                            <ArrowLeft size={20} />
                            <div className="text-left">
                                <span className="block text-xs font-mono">Anterior</span>
                                <span className="hidden md:block font-bold">{prevArticle.title}</span>
                            </div>
                        </Link>
                    ) : <div />}

                    {nextArticle ? (
                        <Link href={`/articulo/${nextArticle.slug}`} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors text-right">
                            <div className="text-right">
                                <span className="block text-xs font-mono">Siguiente</span>
                                <span className="hidden md:block font-bold">{nextArticle.title}</span>
                            </div>
                            <ArrowRight size={20} />
                        </Link>
                    ) : (
                        <Link href="/series" className="text-neon-purple hover:text-white transition-colors">
                            Ver más series
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
