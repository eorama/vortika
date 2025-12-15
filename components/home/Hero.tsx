'use client';

import { motion } from 'framer-motion';
import GlitchText from '../ui/GlitchText';
import NeonButton from '../ui/NeonButton';
import { useTranslations } from 'next-intl';

const Hero = () => {
    const t = useTranslations('HomePage');
    const tNav = useTranslations('Navigation');
    const tCommon = useTranslations('Common');
    const tUI = useTranslations('UI');

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8">

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <GlitchText
                        text={t('hero_title')}
                        as="h1"
                        className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight"
                    />
                </motion.div>

                {/* Subtitle / Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl font-mono"
                >
                    {t('subtitle')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 mt-8"
                >
                    <NeonButton href="/categorias" variant="primary">
                        {t('categories_title')}
                    </NeonButton>
                    <NeonButton href="/manifiesto" variant="secondary">
                        {t('manifesto_cta')}
                    </NeonButton>
                    <NeonButton href="/suscribirse" variant="outline">
                        {tNav('subscribe')}
                    </NeonButton>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{tUI('scroll')}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
