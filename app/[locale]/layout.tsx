import type { Metadata } from "next";
import { Offside, Cairo } from "next/font/google";
import "../globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SlugProvider } from '@/components/providers/SlugProvider';

const offside = Offside({
  weight: "400",
  variable: "--font-offside",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'en' ? "Vōrtika | What's coming won't wait" : "Vōrtika | Lo que viene no espera",
    description: locale === 'en' ? "Exploring the post-labor future, AI, and human identity." : "Explorando el futuro post-laboral, la IA y la identidad humana.",
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${offside.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <SlugProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </SlugProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
