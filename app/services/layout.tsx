import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Digital Marketing Services',
  description:
    'Browse all digital marketing services on Svayaa. SEO, Google Ads, Meta Ads, social media management, landing pages, and more. Buy online with transparent pricing.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
