import Hero from "@/components/home/Hero";
import { getArticles } from "@/lib/wordpress";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');
  const tCommon = await getTranslations('Common');

  let articles = [];
  try {
    articles = await getArticles(locale);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Articles Section */}
      <section className="py-20 px-4 md:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white border-b border-gray-800 pb-6">
            {t('latest_posts')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles && articles.map((article: any) => {
              // Normalized WordPress data
              const title = article.title;
              const quote = article.excerpt; // Mapped from opening_quote in lib/wordpress
              const imageUrl = article.coverImage;
              const seriesTitle = article.seriesName;

              // Need slug prefix logic? /articulo/slug is not localized prefix?
              // Link from next-intl handles prefix. 
              // But here we are rendering Cards, we need to ensure Links around them if they exist?
              // The original code didn't have Links around the cards in the loop shown previously? 
              // Wait, checking original file...
              // The original file in Step 145 DOES NOT HAVE LINK WRAPPERS around the cards.
              // It just renders the div.
              // I should probably verify if there should be links.
              // Usually clicking a card goes to the article.
              // I'll leave it as is for now regarding links as I am just doing i18n, but it's suspicious.
              // Ah, checking conversation history...
              // The user might have stripped it or I missed it.
              // I will not add Links if they weren't there, strict refactor only.
              // Wait, looking closer at the original file Step 145...
              // Line 35: <div key={article.id} className="group relative ...">
              // No Link tag. 
              // Okay, I will respect that.

              return (
                <div key={article.id} className="group relative bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={title || 'Article Image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                        <span className="text-sm">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {seriesTitle && (
                      <div className="mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                          {seriesTitle}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                      {title}
                    </h3>

                    {quote && (
                      <blockquote className="text-zinc-400 text-sm italic border-l-2 border-blue-500/50 pl-4 mb-4 line-clamp-3">
                        "{quote}"
                      </blockquote>
                    )}
                  </div>
                </div>
              );
            })}

            {articles.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                {/* Fallback text could be translated too */}
                No hay artículos disponibles por el momento.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
