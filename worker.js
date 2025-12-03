import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
    async fetch(request, env, ctx) {
        try {
            return await getAssetFromKV(
                {
                    request,
                    waitUntil: ctx.waitUntil.bind(ctx),
                },
                {
                    ASSET_NAMESPACE: env.__STATIC_CONTENT,
                    ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
                }
            );
        } catch (e) {
            // Si el archivo no se encuentra, intentar servir index.html para SPA routing
            const url = new URL(request.url);
            if (!url.pathname.includes('.')) {
                try {
                    return await getAssetFromKV(
                        {
                            request: new Request(`${url.origin}/index.html`, request),
                            waitUntil: ctx.waitUntil.bind(ctx),
                        },
                        {
                            ASSET_NAMESPACE: env.__STATIC_CONTENT,
                            ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
                        }
                    );
                } catch (e2) {
                    return new Response('Not Found', { status: 404 });
                }
            }
            return new Response('Not Found', { status: 404 });
        }
    }
};
