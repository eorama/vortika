import { Article, Category, Series } from './types';
import qs from 'qs';

export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://hlvortika.eliezerorama.online';

export async function fetchAPI(path: string, urlParamsObject: Record<string, any> = {}) {
    // Merge default params
    const mergedOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store' as RequestCache, // Dynamic data
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
        encodeValuesOnly: true, // prettify URL
    });

    const requestUrl = `${STRAPI_API_URL}${path}${queryString ? `?${queryString}` : ''}`;

    try {
        const response = await fetch(requestUrl, mergedOptions);
        if (!response.ok) {
            console.error("Strapi Response Error:", response.status, response.statusText, 'URL:', requestUrl);
            throw new Error(`An error occured please try again`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API Error:', error);
        throw new Error(`Please check if your Strapi server is running and accessible. Error: ${error}`);
    }
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if it's already an absolute URL
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Otherwise prepend the Strapi URL
    return `${STRAPI_API_URL}${url}`;
}

// Data Mappers (Helper to normalize Strapi v4 response)
function mapStrapiArticle(item: any): Partial<Article> {
    const attrs = item.attributes || item; // Handle flattened or v4 behavior
    const coverUrl = attrs.cover?.data?.attributes?.url || attrs.cover?.url || null;

    return {
        id: item.id.toString(),
        title: attrs.title,
        excerpt: attrs.cita || attrs.excerpt || '', // "Cita de apertura"
        content: attrs.content || '',
        slug: attrs.slug,
        coverImage: getStrapiMedia(coverUrl) || '',
        // Handle series relation if present
        seriesId: attrs.series?.data?.id?.toString(),
        // Add other fields as needed
    };
}


export async function getArticles(locale: string = 'es') {
    const data = await fetchAPI('/api/articulos', {
        populate: '*',
        locale: locale
    });
    // Map to our app's format if possible, or return raw. 
    // Let's return raw with a helper or mapped.
    // The prompt asks to list Articulos with Title, Cita (excerpt), Cover Image, Series Name.
    // I'll return the raw list but mapped for convenience in the component, or just the raw data.
    // Returning raw Strapi data allows components to be specific, but a service usually abstracts.
    return data.data;
}

export async function getCategories(locale: string = 'es') {
    const data = await fetchAPI('/api/categories', {
        populate: '*',
        sort: ['createdAt:desc'],
        locale: locale
    });
    return data.data;
}

export async function getCategoryBySlug(slug: string, locale: string = 'es') {
    // Filter by slug
    // Strapi filter syntax: filters[field][$eq]=value
    const data = await fetchAPI('/api/categories', {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: '*',
        locale: locale
    });

    // Check if we found it
    if (data.data && data.data.length > 0) {
        return data.data[0];
    }
    return null;
}

// Helper to calculate reading time
export function calculateReadingTime(content: string): number {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes;
}

export async function getSeries(locale: string = 'es') {
    // Populate categories to show series list
    const data = await fetchAPI('/api/series', {
        populate: {
            category: { populate: '*' },
            articulos: { populate: '*' }
        },
        locale: locale
    });
    return data.data;
}

export async function getSeriesBySlug(slug: string, locale: string = 'es') {
    // We need deep populate to get Articles sort by createdAt ASC (Parte 1... Part N)
    // Strapi standard populate=* works for 1st level.
    // For series -> articles, we need to ensure articles are populated.
    // Default Strapi populate=* usually includes relations like articles.
    // However, we want to sort articles by createdAt ASC.
    // Strapi v4 populate syntax for sorting relations:
    // populate[articles][sort]=createdAt:asc

    const data = await fetchAPI('/api/series', {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            articulos: {
                sort: ['createdAt:asc'],
                populate: '*',
            },
            category: {
                populate: '*',
            },
        },
        locale: locale
    });

    if (data.data && data.data.length > 0) {
        return data.data[0];
    }
    return null;
}

export async function getArticleBySlug(slug: string, locale: string = 'es') {
    const data = await fetchAPI('/api/articulos', {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            serie: {
                populate: '*',
            },
        },
        locale: locale
    });

    if (data.data && data.data.length > 0) {
        return data.data[0];
    }
    return null;
}

