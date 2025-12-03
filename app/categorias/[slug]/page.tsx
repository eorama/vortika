import { CATEGORIES, SERIES } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import CategoryDetailClient from './CategoryDetailClient';

export function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        slug: category.slug,
    }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
    const category = CATEGORIES.find((c) => c.slug === params.slug);

    if (!category) {
        notFound();
    }

    const categorySeries = SERIES.filter((s) => s.categoryId === category.id);

    return <CategoryDetailClient category={category} categorySeries={categorySeries} />;
}
