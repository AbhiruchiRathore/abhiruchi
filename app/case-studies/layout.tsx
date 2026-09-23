import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real results from real businesses. See how Svayaa\'s digital marketing services have helped brands grow — 3x ROAS, 65% more leads, top 3 rankings, and more.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
