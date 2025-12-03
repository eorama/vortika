'use client';

import { CATEGORIES } from '@/lib/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import * as Icons from 'lucide-react';

export default function CategoriesPage() {
    return (
        <div className="min-h-screen pt-24 px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <GlitchText text="Categorías" as="h1" className="text-4xl md:text-6xl font-bold mb-4" />
                    <p className="text-gray-400 max-w-2xl">
                        Explora los pilares del cambio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, index) => {
                        // Dynamic Icon
                        const IconComponent = (Icons as unknown as Record<string, any>)[cat.iconName] || Icons.HelpCircle;

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/categorias/${cat.slug}`} className="group block h-full p-6 rounded-xl glass-panel hover:border-neon-purple/50 transition-colors relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <IconComponent size={64} />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-4 text-neon-purple group-hover:text-white transition-colors">
                                            <IconComponent size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 flex-grow">
                                            {cat.description}
                                        </p>
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
