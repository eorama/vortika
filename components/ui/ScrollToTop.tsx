'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const pathname = usePathname();
    const isArticlePage = pathname?.includes('/articulo/') || pathname?.includes('/article/');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Create a smoother spring layout for the progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Show button when page is scrolled down 20%
        if (latest > 0.2) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Calculating the circumference for the circle progress
    // Radius of the circle
    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    if (!mounted) return null;

    // If not scrolled enough AND not on article page, don't show anything container
    if (!mounted) return null;
    const showContainer = isVisible || isArticlePage;

    if (!showContainer) return null;

    return (
        <motion.div
            className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                pointerEvents: 'auto'
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Reading Progress Circle - Only on article pages, always visible there */}
            {isArticlePage && (
                <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                    {/* Background Circle */}
                    <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 44 44">
                        {/* Track */}
                        <circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3"
                        />
                        {/* Progress Indicator */}
                        <motion.circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            stroke="#00f3ff" // neon-blue
                            strokeWidth="3"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            style={{ pathLength: scaleX }}
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            )}

            {/* Button to Scroll to Top - Only visible when scrolled */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    height: isVisible ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
            >
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 active:scale-95 group mb-1"
                    aria-label="Volver arriba"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </motion.div>
        </motion.div>
    );
}
