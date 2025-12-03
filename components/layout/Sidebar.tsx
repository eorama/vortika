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
                className="fixed top-4 right-4 z-50 p-2 text-white bg-black/50 backdrop-blur-md rounded-md md:hidden border border-white/10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <motion.aside
                className={clsx(
                    "fixed left-0 top-0 h-full z-40 w-20 flex flex-col items-center py-8 bg-black/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
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
                <nav className="flex-1 flex flex-col gap-8 w-full items-center">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="relative group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/5"
                            >
                                <div className={clsx(
                                    "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                                    isActive ? "opacity-100 bg-neon-blue/10 shadow-[0_0_15px_rgba(0,243,255,0.3)]" : "group-hover:opacity-100 group-hover:bg-white/5"
                                )} />

                                <Icon
                                    size={24}
                                    className={clsx(
                                        "relative z-10 transition-colors duration-300",
                                        isActive ? "text-neon-blue" : "text-gray-400 group-hover:text-white"
                                    )}
                                />

                                {/* Tooltip */}
                                <span className="absolute left-14 px-3 py-1 bg-black/90 border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                                    {item.name}
                                </span>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute left-0 w-1 h-8 bg-neon-blue rounded-r-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Settings */}
                <div className="mt-auto flex flex-col items-center gap-5 pb-2">
                    {/* Social Links */}
                    <a href="https://facebook.com/vortika" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                        <Facebook size={20} />
                    </a>
                    <a href="https://instagram.com/vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                        <Instagram size={20} />
                    </a>
                    <a href="https://x.com/Vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <XIcon size={18} />
                    </a>
                    <a href="https://tiktok.com/@vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f2ea] transition-colors">
                        <TikTokIcon size={20} />
                    </a>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
