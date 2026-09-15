import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Packages & Bundles',
  description:
    'Save more with curated digital marketing service bundles. Perfect for startups, small businesses and growing brands. Transparent pricing in USD.',
  alternates: { canonical: '/packages' },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
