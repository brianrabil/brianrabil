import React from "react";
import { Metadata } from "next";
import Container from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Brian Rabil",
  description: "Personal Website",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={`bg-white dark:bg-black`}>
          <Header />

          <div>
            <main className=" container px-6 max-w-4xl">
              <Container>{children}</Container>
            </main>
            <Footer />
            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-4 text-center">
                <p>
                  &copy; {new Date().getFullYear()} My Personal Website. All
                  rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
