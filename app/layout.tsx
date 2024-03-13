import React from "react";
import { Metadata } from "next";
import Container from "../lib/components/container";
import Header from "../lib/components/header";
import Footer from "../lib/components/footer";
import "../global.css";

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
          <Header siteTitle={"Brian Rabil"} />
          <div>
            <main>
              <Container>{children}</Container>
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
