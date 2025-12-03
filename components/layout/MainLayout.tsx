import Link from 'next/link';
import Sidebar from './Sidebar';
import StarBackground from '../ui/StarBackground';
import LanguageSelector from '../ui/LanguageSelector';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <StarBackground />
            <Sidebar />

            {/* Secondary Logo - Top Left */}
            <Link href="/" className="fixed top-6 left-24 z-50 hidden md:block">
                <img
                    src="/logo-full.png"
                    alt="Vōrtika"
                    className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
            </Link>

            <LanguageSelector />
            <main className="ml-0 md:ml-20 min-h-screen">
                {children}
            </main>
        </>
    );
};

export default MainLayout;
