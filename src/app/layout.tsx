import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kitty Fits',
  description: 'Entrenadora personal | Venezuela',
  url: 'https://kittyfits.com',
  telephone: '+584140589140',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'VE',
    addressRegion: 'Venezuela',
  },
  sameAs: [
    'https://www.instagram.com/kittyy_fits/',
    'https://www.tiktok.com/@kittyfits_22',
  ],
}

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
  description: "Si no vienes por todo, ¿a qué vienes?",
  keywords: [
    "entrenadora personal",
    "entrenamiento personal",
    "asesorias online",
    "fitness venezuela",
    "kitty fits",
  ],
  authors: [{ name: 'Kitty Fits' }],
  creator: 'Kitty Fits',
  alternates: {
    canonical: 'https://kittyfits.com',
  },
  openGraph: {
    title: "Kitty Fits | Entrenadora Personal",
    description: "Si no vienes por todo, ¿a qué vienes?",
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
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0"
                style={{display:'none',visibility:'hidden'}}
              />
            `,
          }}
        />
        <ContactModalProvider>
          <Analytics />
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
