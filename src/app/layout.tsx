import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { LanguageProvider } from "@/i18n/language-provider";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gilgen Configurator",
  description: "Configure your Gilgen door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de-CH"
      className={`${manrope.variable} min-h-dvh font-sans antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
