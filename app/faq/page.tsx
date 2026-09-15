'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { faqs } from '@/lib/data';

const extendedFaqs = [
  ...faqs,
  {
    id: 'f7',
    question: 'Which payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), and digital wallets. All payments are processed through secure, encrypted payment gateways.',
  },
  {
    id: 'f8',
    question: 'Do I need to be in the US to buy services?',
    answer: 'No. While our services are designed for US-based businesses and priced in USD, we serve customers worldwide. All communication and deliverables are in English.',
  },
  {
    id: 'f9',
    question: 'How do I communicate with my assigned expert?',
    answer: 'After checkout, you receive a brief questionnaire. Once submitted, you are connected with your assigned expert via email. You can track progress and communicate through your Orders dashboard.',
  },
  {
    id: 'f10',
    question: 'What if I am not satisfied with the results?',
    answer: 'Every service includes revisions. If you are still not satisfied after revisions, contact us within 7 days of delivery. We will work with you to make it right or provide a partial refund based on the work completed.',
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(extendedFaqs[0].id);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Got questions? We&apos;ve got answers. Everything you need to know about buying services on Abhiruchi.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {extendedFaqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-border bg-white"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {faq.question}
                  </span>
                  {openId === faq.id ? (
                    <Minus className="h-5 w-5 shrink-0 text-violet-deep" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openId === faq.id && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-violet-soft/20 p-6 text-center">
            <p className="font-display text-base font-semibold text-foreground">
              Still have questions?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-violet-deep px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
