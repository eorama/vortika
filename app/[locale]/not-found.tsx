'use client';

import { Link } from '@/i18n/routing';
import GlitchText from '@/components/ui/GlitchText';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-8">
                <div className="relative inline-block">
                    <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple opacity-50">
                        404
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <GlitchText text="404" as="div" className="text-6xl md:text-9xl font-bold text-white tracking-widest relative z-10" />
                    </div>
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-white">{t('title')}</h2>
                    <p className="text-gray-400">
                        {t('description')}
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-black bg-neon-blue rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                    >
                        {t('back_home')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
