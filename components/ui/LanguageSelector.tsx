'use client';

import { useState, useTransition } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const LanguageSelector = ({ className = "relative" }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const currentLang = locale === 'en' ? 'EN' : 'ES';

    const languages = [
        { code: 'es', label: 'ES', name: 'Español' },
        { code: 'en', label: 'EN', name: 'English' },
    ];

    const handleLanguageChange = (nextLocale: string) => {
        setIsOpen(false);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className={`z-50 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:border-neon-blue/50 transition-all duration-300 group"
            >
                <Globe size={18} className="text-gray-400 group-hover:text-neon-blue transition-colors" />
                <span className="text-sm font-mono text-white">{currentLang}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden min-w-[120px]"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                disabled={isPending}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${locale === lang.code ? 'text-neon-blue' : 'text-gray-400'
                                    }`}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
