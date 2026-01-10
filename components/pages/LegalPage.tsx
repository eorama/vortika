import { getPageBySlug } from '@/lib/wordpress';
import GlitchText from '@/components/ui/GlitchText';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ locale: string }>;
    slug: string;
}

export default async function LegalPage({ params, slug }: PageProps) {
    const { locale } = await params;
    const page = await getPageBySlug(slug, locale);

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 container mx-auto">
            <div className="max-w-4xl mx-auto">
                <GlitchText text={page.title} as="h1" className="text-4xl md:text-5xl font-bold mb-12 text-center" />

                <div
                    className="prose prose-invert prose-neon max-w-none
                        prose-headings:font-bold prose-headings:text-white
                        [&_h2]:text-2xl [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:text-neon-blue
                        [&_h3]:text-xl [&_h3]:mt-12 [&_h3]:mb-6 [&_h3]:text-neon-purple
                        [&_p]:text-gray-300 [&_p]:leading-loose [&_p]:mb-8
                        prose-strong:text-white
                        [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8
                        [&_li]:relative [&_li]:pl-6 [&_li]:mb-4 [&_li]:text-gray-300
                        [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-3
                        [&_li::before]:w-2 [&_li::before]:h-2 [&_li::before]:bg-neon-purple 
                        [&_li::before]:rounded-full [&_li::before]:animate-pulse
                        [&_blockquote]:border-l-4 [&_blockquote]:border-neon-purple
                        [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-8
                        bg-[#0A0A0A]/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm mb-16"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </div>
    );
}
