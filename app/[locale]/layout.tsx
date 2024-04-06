import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Index");

  return {
    title: `${t("title")} | aeroxee`,
    description: t("description"),
    authors: {
      name: "aeroxee",
      url: "https://github.com/aeroxee",
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const navbarTranslation = useTranslations("Navbar");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader height={5} showSpinner={false} zIndex={10000} />
          <Navbar
            home={navbarTranslation("home")}
            about={navbarTranslation("about")}
            blog={navbarTranslation("blog")}
            category={navbarTranslation("category")}
            contact={navbarTranslation("contact")}
            dashboard={navbarTranslation("dashboard")}
            overview={navbarTranslation("overview")}
            profile={navbarTranslation("profile")}
            settings={navbarTranslation("settings")}
            locale={locale}
            dark={navbarTranslation("dark")}
            light={navbarTranslation("light")}
            system={navbarTranslation("system")}
            gallery={navbarTranslation("gallery")}
          />
          {children}
          <Toaster />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
