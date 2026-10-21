import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import { OrganizationJsonLd, MarketplaceJsonLd } from '@/components/json-ld';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = 'https://svayaa.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Svayaa | Global Digital Marketing Services for Business',
    template: '%s | Svayaa',
  },
  description:
    'Buy SEO, Google Ads, Meta Ads and social media marketing services online. Trusted by businesses worldwide. Flexible bundles, no contracts, fast delivery.',
  keywords: [
    'digital marketing services for small business',
    'social media marketing for small business',
    'google ads management services',
    'digital marketing packages for small business',
    'social media management',
    'digital marketing for startups',
    'SEO services',
    'online marketing services'
  ],
  authors: [{ name: 'Svayaa' }],
  creator: 'Svayaa',
  publisher: 'Svayaa',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Svayaa',
    title: 'Svayaa | Global Digital Marketing Services for Business',
    description:
      'SEO, Google Ads, Meta Ads and social media marketing for businesses worldwide. Buy individually or in bundles. No contracts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Svayaa | Global Digital Marketing Services for Business',
    description:
      'SEO, Google Ads, Meta Ads and social media marketing for businesses worldwide. No contracts.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  verification: {
    google: 'EGymwHs6bBV1tdlqverqp7q1rVw6W-nAmDNkZYS0nXA',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4B2354',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TQHFSTWN');`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQHFSTWN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <OrganizationJsonLd />
        <MarketplaceJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
