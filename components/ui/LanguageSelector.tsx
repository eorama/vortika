'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = ({ className = "relative" }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('ES');

    const languages = [
        { code: 'ES', name: 'Español' },
        { code: 'EN', name: 'English' },
    ];

    const handleLanguageChange = (code: string) => {
        setCurrentLang(code);
        setIsOpen(false);
        // TODO: Implement actual language switching logic with next-intl
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
                        className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${currentLang === lang.code ? 'text-neon-blue' : 'text-gray-400'
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
