import { Article, Category, Series } from './types';
import qs from 'qs';

export const WORDPRESS_API_URL = 'https://hl.panoramasdmkt.com/wp-json/wp/v2';

// Helper to fetch from WP API
async function fetchWP(endpoint: string, params: Record<string, any> = {}) {
    const queryString = qs.stringify(params, { encodeValuesOnly: true });
    const url = `${WORDPRESS_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    try {
        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 60 }, // Revalidate every minute
        });

        if (!res.ok) {
            console.error(`WP Error ${res.status}: ${res.statusText} at ${url}`);
            throw new Error(`Failed to fetch from WordPress: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Fetch WP Error:', error);
        return []; // Return empty array to prevent crash on list pages
    }
}

// Helper to get featured image URL from embedded data
function getFeaturedImage(item: any): string {
    // If "fimg_url" or similar from a plugin exists, we might use that.
    // Standard WP REST API with _embed returns 'wp:featuredmedia'.

    // Check for distinct 'featured_media_src_url' (sometimes exposed by plugins)
    if (item.featured_media_src_url) return item.featured_media_src_url;

    // Standard _embed structure
    if (item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]) {
        const media = item._embedded['wp:featuredmedia'][0];
        // Return full size or large
        return media.source_url || '';
    }

    // Fallback if user is using a specific Cloudinary field?
    // User said "se deben tomar desde alli", usually meaning the URL is already pointing to Cloudinary.
    return '';
}

// --- Mappers ---

function mapCategory(item: any): Category {
    return {
        id: item.id.toString(),
        title: item.name,
        description: item.description,
        slug: item.slug,
        iconName: '',
        image: item.meta?.category_image || '',
        translations: item.translations || {},
    };
}

function mapSeries(item: any): Series {
    return {
        id: item.id.toString(),
        title: item.name,
        description: item.description,
        slug: item.slug,
        coverImage: item.meta?.serie_image || '',
        categoryId: item.meta?.serie_categoria || '',
        articleCount: item.meta?.serie_total_partes ? parseInt(item.meta.serie_total_partes, 10) : 0,
        translations: item.translations || {},
    };
}

function mapArticle(item: any): Article {
    // Extract series info from embedded terms
    let seriesName = '';
    let seriesId = '';

    if (item._embedded && item._embedded['wp:term']) {
        // wp:term is an array of arrays (one for each taxonomy)
        const terms = item._embedded['wp:term'];
        for (const taxonomyTerms of terms) {
            if (taxonomyTerms.length > 0 && taxonomyTerms[0].taxonomy === 'series') {
                const series = taxonomyTerms[0];
                seriesName = series.name;
                seriesId = series.id.toString();
                break;
            }
        }
    }

    // Fallback to basic mapped properties if not found in embedded
    if (!seriesId && item.series && item.series.length > 0) {
        seriesId = item.series[0].toString();
    }

    return {
        id: item.id.toString(),
        title: item.title.rendered,
        excerpt: item.meta?.opening_quote || item.excerpt.rendered.replace(/(<([^>]+)>)/gi, ""),
        content: item.content.rendered,
        slug: item.slug,
        seriesId: seriesId,
        seriesName: seriesName,
        orderInSeries: item.meta?.serie_parte ? parseInt(item.meta.serie_parte, 10) : 1,
        publishedAt: item.date,
        readTime: calculateReadingTime(item.content.rendered).toString() + ' min',
        coverImage: getFeaturedImage(item),
        tags: [],
        translations: item.translations || {},
    };
}

// Helper to get translated slugs
export async function getTranslatedSlugs(
    type: 'post' | 'category' | 'series',
    translations?: Record<string, number>
): Promise<Record<string, string>> {
    const slugs: Record<string, string> = {};

    if (!translations) return slugs;

    // Parallel fetch for known locales
    const locales = Object.keys(translations);

    // We only care about locales we support (handled by the caller mostly, but robust here)
    const promises = locales.map(async (locale) => {
        const id = translations[locale];
        if (!id) return;

        let endpoint = '';
        if (type === 'post') endpoint = `/entradas-vortika/${id}`;
        else if (type === 'category') endpoint = `/categorias-v/${id}`;
        else if (type === 'series') endpoint = `/series/${id}`;

        try {
            // Note: We don't need detailed data, just slug. 
            // In future, custom lightweight endpoint could be faster.
            const item = await fetchWP(endpoint);
            if (item && item.slug) {
                slugs[locale] = item.slug;
            }
        } catch (e) {
            console.error(`Failed to fetch translation for ${type} ${id} (${locale})`, e);
        }
    });

    await Promise.all(promises);
    return slugs;
}

// --- Public API ---

export async function getCategories(locale: string = 'es') {
    // Polylang often uses 'lang' parameter.
    const params = {
        per_page: 100,
        lang: locale,
        orderby: 'id', // Order by ID
        order: 'asc', // Oldest to newest
        hide_empty: false,
    };
    const data = await fetchWP('/categorias-v', params);

    // Filter out 'uncategorized' or 'sin-categoria' (standard slugs)
    // Also excluding ID 1 explicitly if needed, but slug check is robust.
    return data
        .filter((cat: any) => !['uncategorized', 'sin-categoria'].includes(cat.slug))
        .map(mapCategory);
}

export async function getCategoryBySlug(slug: string, locale: string = 'es') {
    const data = await fetchWP('/categorias-v', {
        slug: slug,
        lang: locale,
    });
    if (data && data.length > 0) return mapCategory(data[0]);
    return null;
}

export async function getSeries(locale: string = 'es') {
    const [data, categories] = await Promise.all([
        fetchWP('/series', {
            per_page: 100,
            lang: locale,
            hide_empty: false,
        }),
        getCategories(locale)
    ]);

    // Create lookup map
    const catMap = new Map();
    categories.forEach((c: Category) => catMap.set(c.id, c.title));

    return data.map((item: any) => {
        const s = mapSeries(item);
        if (s.categoryId && catMap.has(s.categoryId)) {
            s.categoryName = catMap.get(s.categoryId);
        }
        return s;
    });
}

export async function getSeriesBySlug(slug: string, locale: string = 'es') {
    const data = await fetchWP('/series', {
        slug: slug,
        lang: locale,
    });
    if (data && data.length > 0) return mapSeries(data[0]);
    return null;
}

export async function getArticles(locale: string = 'es', limit: number = 10) {
    const data = await fetchWP('/entradas-vortika', {
        per_page: limit,
        lang: locale,
        _embed: true, // Needed for featured image
        status: 'publish',
    });
    return data.map(mapArticle);
}

export async function getArticleBySlug(slug: string, locale: string = 'es') {
    const data = await fetchWP('/entradas-vortika', {
        slug: slug,
        lang: locale,
        _embed: true,
    });
    if (data && data.length > 0) return mapArticle(data[0]);
    return null;
}

// Helper to filter articles by Series (since WP REST API allows filtering posts by taxonomy term)
export async function getArticlesBySeries(seriesId: string, locale: string = 'es') {
    const data = await fetchWP('/entradas-vortika', {
        series: seriesId, // taxonomy query
        lang: locale,
        _embed: true,
    });
    return data.map(mapArticle);
}

// Pages
function mapPage(item: any) {
    return {
        id: item.id.toString(),
        title: item.title?.rendered || '',
        content: item.content?.rendered || '',
        slug: item.slug,
        date: item.date,
        modified: item.modified,
    };
}

export async function getPageBySlug(slug: string, locale: string = 'es') {
    const params = {
        slug,
        lang: locale,
        _embed: true,
    };
    const data = await fetchWP('/paginas-vortika', params);
    if (!data || data.length === 0) return null;
    return mapPage(data[0]);
}

// Helper to calculate reading time
export function calculateReadingTime(content: string): number {
    if (!content) return 0;
    const strippedContent = content.replace(/(<([^>]+)>)/gi, "");
    const wordsPerMinute = 200;
    const noOfWords = strippedContent.split(/\s/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes;
}
