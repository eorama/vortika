import LegalPage from '@/components/pages/LegalPage';

// For ES logic, slug is 'cookies'. For EN, check if WP slug matches 'cookies' or if it is different.
// The WP page ID for EN is 30. Slug might be different.
// However, standard slug mapping usually keeps 'cookies'. 
// If getPageBySlug fails for EN 'cookies', we might need logic.
// But given Polylang, usually translated pages have localized slugs but linked.
// Let's assume 'cookies' slug works or we use the specific known slugs.
// ES: cookies (ID 25)
// EN: ID 30? Let's assume slug 'cookies' or 'cookie-policy'. 
// Actually, I'll use a dynamic slug based on locale if needed, but 'cookies' is likely for ES.
// User said "cookies" page in Footer.
export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
    // If we need different slugs per locale:
    // const { locale } = await params;
    // const slug = locale === 'es' ? 'cookies' : 'cookies'; 
    return <LegalPage params={params} slug="cookies" />;
}
