import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Abhiruchi is a premium digital marketing services marketplace for US businesses. Buy professional marketing services online — no contracts, no agency hassle.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
