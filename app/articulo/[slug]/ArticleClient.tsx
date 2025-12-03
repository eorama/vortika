/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Article, Series } from '@/lib/types';

interface ArticleClientProps {
    article: Article;
    series?: Series;
    nextArticle?: Article;
    prevArticle?: Article;
}

export default function ArticleClient({ article, series, nextArticle, prevArticle }: ArticleClientProps) {
    return (
        <article className="min-h-screen pt-24 pb-32 px-8 md:px-16">
            <div className="max-w-3xl mx-auto">
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
                        <span>{article.readTime} lectura</span>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none mb-16">
                    <p className="lead text-xl text-gray-300 italic border-l-4 border-neon-purple pl-4 mb-8">
                        {article.excerpt}
                    </p>
                    <div className="text-gray-300 leading-relaxed">
                        {/* Placeholder for markdown content */}
                        <p>
                            Aquí iría el contenido completo del artículo. En una implementación real, esto se renderizaría desde Markdown o HTML almacenado en la base de datos.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h3>El Futuro es Ahora</h3>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
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
