// /locale/layout.tsx
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { ViewTransition } from "react";
import { Header } from "./components/header/Header";
import { Aside } from "./components/aside/Aside";
import { Footer } from "./components/footer/Footer";
import CursorLight from "./components/cursor-light/CursorLight";
import { NextIntlClientProvider } from "next-intl";
import { headers } from "next/headers";
import { ReactNode } from "react";
import "../globals.css";
import { locales } from "./consts/locales";
import { Toaster } from "sonner";

import es_ES from "@i18n/messages/es-ES.json";
import en_US from "@i18n/messages/en-US.json";
import ca_ES from "@i18n/messages/ca-ES.json";
import uk_UA from "@i18n/messages/uk-UA.json";

const messagesMap = {
  "es-ES": es_ES,
  "en-US": en_US,
  "ca-ES": ca_ES,
  "uk-UA": uk_UA,
};

type Locale = (typeof locales)[number];

const onest = Onest({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: {
    default: "YK - Servicios profesionales de tecnología",
    template: "YK - %s",
  },
  description: "Servicios profesionales de tecnología",
  metadataBase: new URL("https://tudominio.com"),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = messagesMap[locale as Locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme') || 'system';
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (saved === 'system' && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${onest.className} antialiased flex flex-col min-h-screen dark:bg-black bg-white`}>
        <NextIntlClientProvider key={locale} messages={messages}>
          <ViewTransition name="page">
            <CursorLight />

            {/* PAGE CONTENT */}
            <Header />
            <Aside />
            <main className="w-full flex flex-col flex-1 selection:text-black selection:bg-white">
              {children}
            </main>
            <Footer />

            <div id="cursor-light" className="md:flex hidden" />
          </ViewTransition>
        </NextIntlClientProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}