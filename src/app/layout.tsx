import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kitty Fits | Entrenadora Personal",
  description: "Si no vienes a todo, ¿a qué vienes?",
  openGraph: {
    title: "Kitty Fits | Entrenadora Personal",
    description: "Si no vienes a todo, ¿a qué vienes?",
    url: "https://kittyfits.com",
    siteName: "Kitty Fits",
    locale: "es_VE",
    type: "website",
  },
};

import { ContactModalProvider } from "../context/ContactModalContext";
import ContactModal from "../components/ContactModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContactModalProvider>
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
