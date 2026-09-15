import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'Track your service delivery status and view past orders on Abhiruchi.',
  robots: { index: false, follow: false },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
