import { getPageBySlug } from '@/lib/wordpress';
import GlitchText from '@/components/ui/GlitchText';
import { notFound } from 'next/navigation';
import ManifestoContent from './ManifestoContent';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function ManifestoPage({ params }: PageProps) {
    const { locale } = await params;
    // Determine slug based on locale
    const slug = locale === 'en' ? 'manifest' : 'manifiesto';
    const page = await getPageBySlug(slug, locale);

    if (!page) {
        notFound();
    }

    // Parse content to separate Intro and Sections
    // Splitting by <h3> assuming the structure is consistent: Intro... <h3>Section I</h3> Content... <h3>Section II</h3> ...
    const parts = page.content.split('<h3');
    const intro = parts[0];
    // Reconstruct sections. Each part in rest starts with ">Title</h3>Body"
    const sections = parts.slice(1).map((part: string) => {
        const closeTagIndex = part.indexOf('</h3>');
        if (closeTagIndex === -1) return { title: '', content: part }; // Fallback

        // part starts with something like ">I. TITLE</h3><p>..."
        // We need to remove the initial '>' (or attributes if any, but split('<h3') leaves attributes on the previous part? No, split consumes the separator)
        // Wait, split('<h3>') removes '<h3>'. If attributes existed <h3 class="...">, simply splitting by '<h3>' wouldn't catch them. 
        // But WP Classic Editor usually emits plain <h3>. 
        // However, robust splitting: split /<h3[^>]*>/

        // Let's rely on the split logic being handled in the component or simpler here if we assume standard WP output.
        // Simple string manipulation:
        // innerPart starts after the opening tag. 
        // If we split by '<h3', the '>' is usually at the start of the next part if the tag was just '<h3>'.
        // If the tag was '<h3 class="x">', the split point is strict.

        let titleStartIndex = 0;
        if (part.startsWith('>')) titleStartIndex = 1;
        // Search specifically for the closing bracket of the H3 open tag if more complex? 
        // For now, assuming standard <h3>.

        const title = part.substring(titleStartIndex, closeTagIndex);
        // content is everything after </h3>
        const content = part.substring(closeTagIndex + 5);

        return { title, content };
    });

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-32">
            <div className="max-w-3xl mx-auto">
                <div className="mb-16 text-center">
                    <GlitchText text={page.title} as="h1" className="text-5xl md:text-7xl font-bold mb-6" />
                    {/* Render intro (Subtitle/Overview) */}
                    <div
                        className="prose prose-invert prose-lg max-w-none 
                                   [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-6
                                   [&_p]:text-xl [&_p]:text-gray-300 [&_p]:leading-loose
                                   [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: intro }}
                    />
                </div>

                <div className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                    <ManifestoContent sections={sections} />
                </div>
            </div>
        </div>
    );
}
