'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const GlitchText = ({ text, className, as: Component = 'span' }: GlitchTextProps) => {
    return (
        <Component className={clsx("relative inline-block group font-heading font-bold", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue opacity-70 animate-glitch translate-x-[2px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink opacity-70 animate-glitch translate-x-[-2px] delay-75">
                {text}
            </span>
        </Component>
    );
};

export default GlitchText;
