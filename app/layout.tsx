import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Studio Legale Lo Munno | Avvocato civilista a Bologna, dal 1969",
    template: "%s | Studio Legale Lo Munno",
  },
  description:
    "Studio Legale Lo Munno, Foro di Bologna. Da due generazioni, dal 1969, consulenza e assistenza legale nel diritto civile, di famiglia e del lavoro. Via Santo Stefano 20, Bologna.",
  openGraph: {
    title: "Studio Legale Lo Munno",
    description:
      "Avvocato civilista a Bologna. Due generazioni di consulenza e assistenza legale, dal 1969.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenuto"
          className="sr-only z-[60] rounded-md bg-[var(--dl-ink)] px-4 py-2 text-sm text-[var(--dl-paper)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
