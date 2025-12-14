'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Grid, BookOpen, Zap, Menu, X as CloseIcon, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

const NAV_ITEMS = [
    { name: 'Categorías', path: '/categorias', icon: Grid },
    { name: 'Manifiesto', path: '/manifiesto', icon: BookOpen },
    { name: 'Suscribirse', path: '/suscribirse', icon: Zap },
];

const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="fixed top-5 right-4 z-[80] p-2 text-white bg-black/50 backdrop-blur-md rounded-md md:hidden border border-white/10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <motion.aside
                className={clsx(
                    "fixed left-0 top-0 h-full z-[70] flex flex-col items-center py-8 bg-black/95 backdrop-blur-xl border-r border-white/5 transition-all duration-300",
                    "w-64 md:w-20", // Mobile: w-64, Desktop: w-20
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Logo / Brand */}
                <div className="mb-12">
                    <Link href="/" className="block relative w-12 h-12 hover:scale-110 transition-transform duration-300">
                        <img
                            src="/logo.png"
                            alt="Vōrtika Logo"
                            className="w-full h-full object-contain"
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-6 w-full px-4 md:px-0 md:items-center">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                                className={clsx(
                                    "relative group flex items-center md:justify-center gap-4 p-3 md:p-0 md:w-12 md:h-12 rounded-xl transition-all duration-300",
                                    isActive ? "bg-white/5 md:bg-transparent" : "hover:bg-white/5"
                                )}
                            >
                                <div className={clsx(
                                    "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hidden md:block",
                                    isActive ? "opacity-100 bg-neon-blue/10 shadow-[0_0_15px_rgba(0,243,255,0.3)]" : "group-hover:opacity-100 group-hover:bg-white/5"
                                )} />

                                <Icon
                                    size={24}
                                    className={clsx(
                                        "relative z-10 transition-colors duration-300",
                                        isActive ? "text-neon-blue" : "text-gray-400 group-hover:text-white"
                                    )}
                                />

                                {/* Mobile Text Label */}
                                <span className={clsx(
                                    "md:hidden font-mono text-sm uppercase tracking-wider",
                                    isActive ? "text-white font-bold" : "text-gray-400 group-hover:text-white"
                                )}>
                                    {item.name}
                                </span>

                                {/* Desktop Tooltip */}
                                <span className="hidden md:block absolute left-14 px-3 py-1 bg-black/90 border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                                    {item.name}
                                </span>

                                {/* Active Indicator (Desktop) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="hidden md:block absolute left-0 w-1 h-8 bg-neon-blue rounded-r-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Settings - Removed Socials for menu cleanup */}
                <div className="mt-auto pb-4"></div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
