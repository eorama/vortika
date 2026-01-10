import LegalPage from '@/components/pages/LegalPage';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Slug mapping: ES -> privacidad, EN -> privacy
    const slug = locale === 'es' ? 'privacidad' : 'privacy';
    return <LegalPage params={params} slug={slug} />;
}
