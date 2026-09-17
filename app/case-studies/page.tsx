'use client';

import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { caseStudies } from '@/lib/data';

const extendedCaseStudies = [
  ...caseStudies,
  {
    id: 'c4',
    category: 'Content + Social',
    title: 'D2C Brand | 5x Engagement',
    description: 'Strategic content calendar and Instagram management boosted engagement 5x in 3 months.',
    metric: '5x engagement',
    timeframe: 'in 3 months',
  },
  {
    id: 'c5',
    category: 'Landing Page',
    title: 'SaaS Startup | 42% Conversion',
    description: 'Custom landing page design increased conversion rate from 1.8% to 42% on cold traffic.',
    metric: '42% conversion',
    timeframe: 'in 30 days',
  },
  {
    id: 'c6',
    category: 'Full Stack',
    title: 'Local Business | 3x Revenue',
    description: 'Complete Digital Marketing bundle — social, ads, SEO — tripled monthly revenue.',
    metric: '3x revenue',
    timeframe: 'in 4 months',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Case Studies
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Real results from real businesses. See how our services have helped brands grow.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {extendedCaseStudies.map((cs) => (
              <div
                key={cs.id}
                className="group rounded-xl border border-border bg-white p-6 transition-all hover:border-violet-deep/20 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-violet-soft px-3 py-1 text-xs font-medium text-violet-deep">
                  {cs.category}
                </span>
                <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {cs.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{cs.description}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                  <TrendingUp className="h-5 w-5 text-maroon-rich" />
                  <span className="font-display text-xl font-bold text-maroon-rich">
                    {cs.metric}
                  </span>
                  <span className="text-xs text-muted-foreground">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-br from-violet-deep to-maroon-rich px-6 py-10 text-center sm:px-12">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Ready to be our next success story?
            </h2>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-deep transition-colors hover:bg-white/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
