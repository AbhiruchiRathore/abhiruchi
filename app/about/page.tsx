'use client';

import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Award, Clock, Star, DollarSign } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { stats } from '@/lib/data';

export default function AboutPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              About Abhiruchi
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              We&apos;re on a mission to make professional digital marketing accessible to every business. No contracts, no complexity — just expert services you can buy online, on demand.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-6 text-center">
              <Target className="mx-auto h-8 w-8 text-violet-deep" strokeWidth={1.5} />
              <h2 className="mt-3 font-display text-lg font-semibold text-foreground">Our Mission</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Empower businesses with affordable, professional marketing services — no agency retainers required.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6 text-center">
              <Eye className="mx-auto h-8 w-8 text-violet-deep" strokeWidth={1.5} />
              <h2 className="mt-3 font-display text-lg font-semibold text-foreground">Our Vision</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                A world where any business can buy marketing services as easily as buying a product online.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6 text-center">
              <Heart className="mx-auto h-8 w-8 text-violet-deep" strokeWidth={1.5} />
              <h2 className="mt-3 font-display text-lg font-semibold text-foreground">Our Values</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Transparency, quality, and customer-first thinking in everything we do.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Why Businesses Choose Us
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { icon: DollarSign, title: 'Transparent Pricing', desc: 'Every price is upfront. No hidden fees, no surprises, no agency markups.' },
                { icon: Clock, title: 'Fast Delivery', desc: 'Most services delivered within 1-7 days. We respect your timeline.' },
                { icon: Award, title: 'Expert Quality', desc: 'Every service is handled by verified marketing professionals with proven track records.' },
                { icon: Star, title: 'Customer Satisfaction', desc: '4.7/5 average rating from 10,000+ happy customers across the US.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-border p-4">
                  <item.icon className="h-5 w-5 shrink-0 text-violet-deep" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-xl bg-violet-soft/30 p-4 text-center">
                <p className="font-display text-xl font-bold text-violet-deep sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-br from-violet-deep to-maroon-rich px-6 py-10 text-center sm:px-12">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Ready to grow your brand?
            </h2>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-deep transition-colors hover:bg-white/90"
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


