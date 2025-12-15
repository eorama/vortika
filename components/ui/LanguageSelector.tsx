'use client';

import { useState, useTransition } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useSlugs } from '@/components/providers/SlugProvider';
import { routing } from '@/i18n/routing';

const LanguageSelector = ({ className = "relative" }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const { slugs } = useSlugs();

    const currentLang = locale === 'en' ? 'EN' : 'ES';

    const languages = [
        { code: 'es', label: 'ES', name: 'Español' },
        { code: 'en', label: 'EN', name: 'English' },
    ];

    const findKeyForTemplate = (tmpl: string) => {
        // @ts-expect-error -- Pathnames typing is complex
        for (const [key, value] of Object.entries(routing.pathnames)) {
            if (key === tmpl) return key;
            if (typeof value === 'object') {
                if (Object.values(value).includes(tmpl)) return key;
            } else {
                if (value === tmpl) return key;
            }
        }
        return tmpl; // Return original if not found (fallback)
    };

    const handleLanguageChange = (nextLocale: string) => {
        setIsOpen(false);
        const nextParams = { ...params };
        let nextPathname = pathname;

        // If we have a localized slug for the next locale
        if (slugs[nextLocale] && 'slug' in nextParams) {
            const currentSlug = nextParams.slug as string;
            // Try to convert the current pathname to a template
            if (currentSlug && pathname.includes(currentSlug)) {
                nextPathname = pathname.replace(currentSlug, '[slug]');
            }

            // Update the slug param
            // @ts-expect-error -- Typed params
            nextParams.slug = slugs[nextLocale];
        } else {
            // For static pages, we might need to find the key too if pathname is localized
            // e.g. /manifesto -> key: /manifiesto
            // But if we don't have slugs, next-intl usually maps pathname automatically?
            // next-intl docs says: "If you provide a pathname, it must be one of the keys defined in pathnames"
            // OR "a localized pathname". 
            // To be safe, let's try to map it.
            // However, for static pages without params, simple replacement usually works if passed correct structure.
            // But let's apply the lookup universally to be safe.
        }

        // Find the canonical route key
        const routeKey = findKeyForTemplate(nextPathname);

        startTransition(() => {
            // @ts-expect-error -- Params matching for dynamic routes
            router.replace({ pathname: routeKey, params: nextParams }, { locale: nextLocale });
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
