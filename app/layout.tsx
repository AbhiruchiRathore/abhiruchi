import './globals.css';
import type { Metadata } from 'next';
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

const siteUrl = 'https://abhiruchi.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Abhiruchi | Buy Digital Marketing Services Online',
    template: '%s | Abhiruchi',
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
  authors: [{ name: 'Abhiruchi' }],
  creator: 'Abhiruchi',
  publisher: 'Abhiruchi',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Abhiruchi',
    title: 'Abhiruchi | Buy Digital Marketing Services Online',
    description:
      'Buy professional digital marketing services individually or in bundles. No contracts. Fast delivery. Expert marketers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhiruchi | Buy Digital Marketing Services Online',
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
      <body className="font-body antialiased">
        <OrganizationJsonLd />
        <MarketplaceJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
