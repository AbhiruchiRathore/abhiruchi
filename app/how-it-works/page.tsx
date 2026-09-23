'use client';

import Link from 'next/link';
import {
  MousePointerClick,
  CreditCard,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';

const steps = [
  {
    icon: MousePointerClick,
    number: '1',
    title: 'Pick Your Service',
    titleFull: 'Pick Your Service',
    description: 'Choose what you need and add it to your cart.',
    details: [
      'Browse services by category',
      'Compare pricing and delivery times',
      'Read customer reviews',
      'Add individual services or bundles',
    ],
  },
  {
    icon: CreditCard,
    number: '2',
    title: 'Place Your Order',
    titleFull: 'Place Your Order',
    description: 'No big upfront payment. Just tell us what you need and we\u2019ll take it from there.',
    details: [
      'No big upfront payment required',
      'Tell us what you need',
      'We handle the rest',
      'Instant order confirmation',
    ],
  },
  {
    icon: Rocket,
    number: '3',
    title: 'We Get It Done',
    titleFull: 'We Get It Done',
    description: 'Our experts jump in and deliver your work, hassle-free.',
    details: [
      'Experts begin within 24 hours',
      'Track progress in your dashboard',
      'Revisions included with every service',
      'On-time delivery guaranteed',
    ],
  },
];

const guarantees = [
  { icon: ShieldCheck, title: 'Secure Payment', desc: 'Bank-level encryption for every transaction' },
  { icon: Clock, title: 'On-Time Delivery', desc: '98% of orders delivered on or before deadline' },
  { icon: DollarSign, title: 'Transparent Pricing', desc: 'No hidden fees, no surprises at checkout' },
  { icon: Award, title: 'Expert Quality', desc: 'Every service handled by verified professionals' },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              How It Works
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Get started in 3 simple steps. It&apos;s quick, easy and secure. No contracts, no hassle — just results.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl border border-border p-5 sm:flex-row sm:items-start sm:p-7"
              >
                <div className="flex items-center gap-3 sm:flex-col sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-deep text-white">
                    <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-3xl font-bold text-violet-deep/20">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {step.titleFull}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-deep" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <div key={i} className="rounded-xl border border-border bg-violet-soft/20 p-4 text-center">
                <g.icon className="mx-auto h-7 w-7 text-violet-deep" strokeWidth={1.5} />
                <p className="mt-2 text-sm font-semibold text-foreground">{g.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-deep px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
            >
              Shop Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
