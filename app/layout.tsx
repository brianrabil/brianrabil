import { Providers } from "@/app/providers";
import { Layout } from "@/components/layout";
import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { appConfig } from "@/lib/app-config";

export const metadata: Metadata = {
  title: {
    template: `%s - ${appConfig.fullName}`,
    default: appConfig.title,
  },
  description: appConfig.description,
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "Cloud Infrastructure",
    "AI Solutions",
    "Web Development",
    "DevOps",
    "Next.js",
    "Tanstack Start",
    "MVP",
    "App Developer",
  ],
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: appConfig.title,
    description: appConfig.description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image`,
        alt: appConfig.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.title,
    description: appConfig.description,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image`],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Technology",
  authors: [
    { name: appConfig.fullName, url: process.env.NEXT_PUBLIC_SITE_URL },
  ],
  creator: appConfig.fullName,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
