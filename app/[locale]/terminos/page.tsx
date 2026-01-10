import LegalPage from '@/components/pages/LegalPage';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Slug mapping: ES -> terminos, EN -> terms
    const slug = locale === 'es' ? 'terminos' : 'terms';
    return <LegalPage params={params} slug={slug} />;
}
