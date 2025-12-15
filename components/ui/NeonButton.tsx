'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Link } from '@/i18n/routing';

interface NeonButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

const NeonButton = ({ children, href, onClick, variant = 'primary', className }: NeonButtonProps) => {
    const baseStyles = "relative px-8 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]",
        secondary: "bg-transparent border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black shadow-[0_0_10px_rgba(188,19,254,0.2)] hover:shadow-[0_0_20px_rgba(188,19,254,0.6)]",
        outline: "bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/10",
    };

    const content = (
        <>
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
        </>
    );

    if (href) {
        return (
            <Link href={href} className={clsx(baseStyles, variants[variant], className)}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={clsx(baseStyles, variants[variant], className)}>
            {content}
        </button>
    );
};

export default NeonButton;
