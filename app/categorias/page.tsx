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
                                <Link
                                    href={`/categorias/${cat.slug}`}
                                    className="group block relative h-full rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                                >
                                    {/* Gradient Border Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/80 pointer-events-none" />

                                    {/* Inner Content with 1px margin for the thinner border effect */}
                                    <div className="relative m-[1px] bg-[#0A0A0A] rounded-[11px] p-6 h-full flex flex-col hover:bg-[#0f0f0f] transition-colors">
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
