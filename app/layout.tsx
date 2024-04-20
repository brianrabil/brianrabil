import React from "react";
import { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Brian Rabil",
  description: "Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
