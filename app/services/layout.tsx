import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing Services Online | SEO, Ads & Social | Svayaa',
  description:
   'Browse SEO, Google Ads, Meta Ads, social media management, web design and AI creative services. Buy individually from $49. No contracts, fast delivery.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
