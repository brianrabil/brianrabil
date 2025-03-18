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
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
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
