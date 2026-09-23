import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Got questions about buying digital marketing services on Svayaa? Find answers about delivery times, refunds, revisions, reports, pricing, and more.',
  alternates: { canonical: '/faq' },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
