import { Link } from '@/i18n/routing';
import Sidebar from './Sidebar';
import StarBackground from '../ui/StarBackground';
import LanguageSelector from '../ui/LanguageSelector';
import ScrollToTop from '../ui/ScrollToTop';

import Footer from './Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <StarBackground />
            <Sidebar />

            {/* Mobile Header Bar (Black Background) */}
            {/* Mobile Header Bar (Black Background) */}
            <div className="md:hidden fixed top-0 left-0 w-full h-20 bg-black z-50 border-b border-white/10 flex items-center px-4">
                {/* Logo - Mobile */}
                <Link href="/">
                    <img
                        src="/logo-full.png"
                        alt="Vōrtika"
                        className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                    />
                </Link>

                {/* Language Selector - Mobile (positioned to left of menu button) */}
                <div className="ml-auto mr-14">
                    <LanguageSelector />
                </div>
            </div>

            {/* Language Selector - Desktop */}
            <LanguageSelector className="hidden md:block fixed top-6 right-6 z-50" />

            {/* Secondary Logo - Desktop */}
            <Link href="/" className="fixed top-6 left-24 z-50 hidden md:block">
                <img
                    src="/logo-full.png"
                    alt="Vōrtika"
                    className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
            </Link>

            <main className="ml-0 md:ml-20 min-h-screen flex flex-col pt-20 md:pt-0">
                {/* Added pt-20 on mobile to account for fixed header */}
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
            </main>
            <ScrollToTop />
        </>
    );
};

export default MainLayout;
