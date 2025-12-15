import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
    const t = useTranslations('Privacy');

    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">{t('title')}</h1>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p>{t('last_updated', { date: new Date().toLocaleDateString() })}</p>

                    <h3>{t('intro_title')}</h3>
                    <p>
                        {t('intro_text')}
                    </p>

                    <h3>{t('data_title')}</h3>
                    <p>
                        {t('data_text')}
                    </p>
                    <ul>
                        <li>{t('data_list_1')}</li>
                        <li>{t('data_list_2')}</li>
                        <li>{t('data_list_3')}</li>
                    </ul>
                    <p>
                        {t('data_text_2')}
                    </p>

                    <h3>{t('usage_title')}</h3>
                    <p>
                        {t('usage_text')}
                    </p>
                    <ul>
                        <li>{t('usage_list_1')}</li>
                        <li>{t('usage_list_2')}</li>
                        <li>{t('usage_list_3')}</li>
                    </ul>

                    <h3>{t('cookies_title')}</h3>
                    <p>
                        {t('cookies_text')}
                    </p>

                    <h3>{t('contact_title')}</h3>
                    <p>
                        {t('contact_text')}
                    </p>
                </div>
            </div>
        </div>
    );
}
