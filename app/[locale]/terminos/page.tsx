import { useTranslations } from 'next-intl';

export default function TermsPage() {
    const t = useTranslations('Terms');

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">{t('title')}</h1>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p>{t('last_updated', { date: new Date().toLocaleDateString() })}</p>

                    <h3>{t('acceptance_title')}</h3>
                    <p>
                        {t('acceptance_text')}
                    </p>

                    <h3>{t('ip_title')}</h3>
                    <p>
                        {t('ip_text_1')}
                    </p>
                    <p>
                        {t('ip_text_2')}
                    </p>

                    <h3>{t('usage_title')}</h3>
                    <p>
                        {t('usage_text')}
                    </p>

                    <h3>{t('disclaimer_title')}</h3>
                    <p>
                        {t('disclaimer_text')}
                    </p>

                    <h3>{t('modifications_title')}</h3>
                    <p>
                        {t('modifications_text')}
                    </p>
                </div>
            </div>
        </div>
    );
}
