import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { MobileNav } from "@/components/shared/MobileNav";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PizzaStore",
    default: "PizzaStore - Найсмачніша піца в місті", // Fallback
  },
  description: "Замовляйте найсмачнішу гарячу піцу, соковиті бургери та прохолодні напої з доставкою. PizzaStore - ваш улюблений онлайн-ресторан.",
  keywords: ["піца", "бургер", "доставка їжі", "замовити піцу", "pizza", "швидка доставка", "їжа онлайн"],
  authors: [{ name: "PizzaStore Team" }],
  openGraph: {
    title: "PizzaStore - Найсмачніша піца в місті",
    description: "Замовляйте найсмачнішу гарячу піцу, соковиті бургери та прохолодні напої з доставкою.",
    url: "https://pizza-jet-seven.vercel.app",
    siteName: "PizzaStore",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PizzaStore - Замовляй онлайн",
    description: "Замовляйте найсмачнішу піцу та бургери з доставкою просто зараз.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileNav />
            </Providers>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
