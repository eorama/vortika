'use client';

import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import { useTranslations } from 'next-intl';

export default function ManifestoPage() {
    const t = useTranslations('Manifiesto');

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-32">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <GlitchText text={t('title')} as="h1" className="text-5xl md:text-7xl font-bold mb-6" />
                    <p className="text-xl text-neon-blue font-mono">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-blue pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">{t('section1_title')}</h2>
                        <p>
                            {t('section1_text')}
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-purple pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">{t('section2_title')}</h2>
                        <p>
                            {t('section2_text')}
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-neon-green pl-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">{t('section3_title')}</h2>
                        <p>
                            {t('section3_text')}
                        </p>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
