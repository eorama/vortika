import type { Metadata } from "next";
import { Offside, Cairo } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const offside = Offside({
  weight: "400",
  variable: "--font-offside",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vōrtika | Lo que viene no espera",
  description: "Explorando el futuro post-laboral, la IA y la identidad humana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${offside.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
