import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Have a question or need a custom digital marketing solution? Contact Abhiruchi — we respond within 24 hours. Email, phone, and contact form available.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
