import { SERIES, ARTICLES } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import SeriesDetailClient from './SeriesDetailClient';

export function generateStaticParams() {
    return SERIES.map((series) => ({
        slug: series.slug,
    }));
}

export default function SeriesDetailPage({ params }: { params: { slug: string } }) {
    const series = SERIES.find((s) => s.slug === params.slug);

    if (!series) {
        notFound();
    }

    const seriesArticles = ARTICLES.filter((a) => a.seriesId === series.id).sort((a, b) => a.orderInSeries - b.orderInSeries);

    return <SeriesDetailClient series={series} seriesArticles={seriesArticles} />;
}
