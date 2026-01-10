import { Link } from '@/i18n/routing';
import { Facebook, Instagram, Twitter, Coffee } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');
    const tHome = useTranslations('HomePage'); // For the subtitle if it matches home subtitle

    return (
        <footer className="w-full bg-black border-t border-white/10 py-12 px-8 mt-auto z-10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo.png"
                            alt="Vōrtika Icon"
                            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                        />
                        <img
                            src="/logo-full.png"
                            alt="Vōrtika"
                            className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </Link>
                    <p className="text-gray-500 text-sm text-center md:text-left max-w-xs">
                        {tHome('latest_posts_subtitle')}
                        {/* Was: Explorando el futuro post-laboral, la IA y la identidad humana. */}
                        {/* Note: I'm reusing the HomePage subtitle key as it seems identical. */}
                    </p>
                </div>

                {/* Socials - Only visible on Mobile now */}
                <div className="flex md:hidden items-center gap-6">
                    <a href="https://facebook.com/vortika" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
                        <Facebook size={20} />
                    </a>
                    <a href="https://instagram.com/vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
                        <Instagram size={20} />
                    </a>
                    <a href="https://x.com/Vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
                        <XIcon size={20} />
                    </a>
                    <a href="https://tiktok.com/@vortika_org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f2ea] transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
                        <TikTokIcon size={20} />
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
                <p>{t('copyright')}</p>
                <div className="flex items-center gap-4">
                    <Link href="/privacidad" className="hover:text-neon-blue transition-colors">{t('privacy')}</Link>
                    <Link href="/terminos" className="hover:text-neon-blue transition-colors">{t('terms')}</Link>
                    <Link href="/cookies" className="hover:text-neon-blue transition-colors">{t('cookies')}</Link>
                </div>
            </div>

            {/* Buy Me a Coffee Button - Custom */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href="https://buymeacoffee.com/vortika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black hover:bg-white/5 text-white font-medium py-3 px-4 rounded-full shadow-lg transition-transform hover:scale-105 border border-[#00f3ff]/30 hover:border-[#00f3ff] group"
                >
                    <Coffee size={20} className="stroke-[#00f3ff]" />
                    <span className="group-hover:text-[#00f3ff] transition-colors">{t('buy_coffee')}</span>
                </a>
            </div>
        </footer>
    );
}
