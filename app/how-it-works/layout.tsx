import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Get started in 3 simple steps: Choose your services, pay securely, and our experts deliver on time. No contracts. Transparent pricing. Expert delivery.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
