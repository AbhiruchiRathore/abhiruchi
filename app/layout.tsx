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
    default: 'Svayaa | Buy Digital Marketing Services Online',
    template: '%s | Svayaa',
  },
  description:
    'Buy professional digital marketing services individually or in bundles. SEO, Google Ads, Meta Ads, social media management, landing pages, and more. No contracts. Fast delivery. US-based.',
  keywords: [
    'digital marketing services',
    'buy marketing services online',
    'SEO services',
    'Google Ads setup',
    'Meta Ads setup',
    'social media management',
    'Instagram post design',
    'landing page design',
    'marketing marketplace',
    'digital marketing marketplace',
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
    title: 'Svayaa | Buy Digital Marketing Services Online',
    description:
      'Buy professional digital marketing services individually or in bundles. No contracts. Fast delivery. Expert marketers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Svayaa | Buy Digital Marketing Services Online',
    description:
      'Buy professional digital marketing services individually or in bundles. No contracts. Fast delivery.',
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
