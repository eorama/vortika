import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['es', 'en'],

    // Used when no locale matches
    defaultLocale: 'es',

    // The default locale should not have a prefix (e.g. / instead of /es)
    localePrefix: 'as-needed',

    // Web-app specific pathnames handling
    pathnames: {
        '/': '/',
        '/series': {
            es: '/series',
            en: '/series'
        },
        '/series/[slug]': {
            es: '/series/[slug]',
            en: '/series/[slug]'
        },
        '/categorias': {
            es: '/categorias',
            en: '/categories'
        },
        '/categorias/[slug]': {
            es: '/categorias/[slug]',
            en: '/categories/[slug]'
        },
        '/articulo/[slug]': {
            es: '/articulo/[slug]',
            en: '/article/[slug]'
        },
        '/manifiesto': {
            es: '/manifiesto',
            en: '/manifesto'
        },
        '/suscribirse': {
            es: '/suscribirse',
            en: '/subscribe'
        },
        '/privacidad': {
            es: '/privacidad',
            en: '/privacy'
        },
        '/terminos': {
            es: '/terminos',
            en: '/terms'
        },
        '/cookies': {
            es: '/cookies',
            en: '/cookies'
        }
    }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
