'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { BundleCard } from '@/components/bundle-card';
import { bundles } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Service Packages & Bundles
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Save more with curated service bundles. Perfect for startups, small businesses and growing brands.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <div key={bundle.id} id={bundle.slug}>
                <BundleCard bundle={bundle} />
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-dashed border-violet-deep/30 bg-violet-soft/20 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Need a custom package?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Mix and match any services to create your own bundle. Contact us for a tailored quote.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-violet-deep px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
            >
              Request Custom Package <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
