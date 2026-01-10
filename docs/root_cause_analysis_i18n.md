# Root Cause Analysis: Language Switching Errors

## Issue Description
Users experienced errors (404 Page Not Found or "Disintegrated") when switching languages on dynamic pages (e.g., Articles, Categories, Series). For example, switching from Spanish to English on a specific category page would lead to a broken URL or failure to load content.

## Root Cause
The `LanguageSelector` component relies on a client-side mapping to construct the URL for the target language. By default, Next.js Internationalization (`next-intl`) merely swaps the locale prefix (e.g., `/es/category/foo` -> `/en/category/foo`).

However, WordPress content often uses **localized slugs**.
- Spanish: `/categorias/accion-presente`
- English: `/categories/present-action`

The application was missing the logic to inform the Language Selector about these relationships. When the user switched languages, the application attempted to navigate to `/en/categories/accion-presente` (using the Spanish slug with the English prefix). Since WordPress requires the English slug (`present-action`) to find the content in English, this resulted in a 404 error.

## Corrective Actions Implemented
We implemented a **Reliable Mapping System** that bridges the gap between the application and the CMS's multilingual capabilities (Polylang).

1.  **API Enhancement**: We updated the WordPress API client (`lib/wordpress.ts`) to read the `translations` field provided by Polylang for every dynamic entity (Posts, Categories, Series).
2.  **Slug Resolution**: We implemented a helper function `getTranslatedSlugs` that explicitly fetches the slugs for all linked translations of the current content.
3.  **Context Integration**: We updated all dynamic pages (`[slug]/page.tsx`) to fetch these translated slugs during page load and inject them into the application's routing context (`SlugProvider`).

## Result
Now, when a user visits a Spanish page (e.g., "Acción en el Presente"), the application secretly knows that the English equivalent is "Present Action". When the user clicks "English", the application constructs the correct URL (`/en/categories/present-action`), ensuring a seamless and error-free transition.

## Verification
Verified successfully with Category pages:
- **Before**: Switching language failed or kept incorrect slug.
- **After**: Switching from `/es/categorias/accion-presente` correctly navigates to `/en/categories/present-action`.
