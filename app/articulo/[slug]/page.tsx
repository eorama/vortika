import { ARTICLES, SERIES } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';

export function generateStaticParams() {
    return ARTICLES.map((article) => ({
        slug: article.slug,
    }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = ARTICLES.find((a) => a.slug === params.slug);

    if (!article) {
        notFound();
    }

    const series = SERIES.find((s) => s.id === article.seriesId);
    const nextArticle = ARTICLES.find((a) => a.seriesId === article.seriesId && a.orderInSeries === article.orderInSeries + 1);
    const prevArticle = ARTICLES.find((a) => a.seriesId === article.seriesId && a.orderInSeries === article.orderInSeries - 1);

    return <ArticleClient article={article} series={series} nextArticle={nextArticle} prevArticle={prevArticle} />;
}
