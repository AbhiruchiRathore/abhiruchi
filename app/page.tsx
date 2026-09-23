'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  MousePointerClick,
  CreditCard,
  Rocket,
  Star,
  Plus,
  Minus,
  Quote,
  TrendingUp,
  Users,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  Globe,
  Target,
  Share2,
  Code,
  Palette,
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { ServiceCard } from '@/components/service-card';
import { BundleCard } from '@/components/bundle-card';
import { StarRating } from '@/components/star-rating';
import { services, bundles, testimonials, caseStudies, faqs, stats } from '@/lib/data';
import { useCart } from '@/components/cart-provider';

export default function Home() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ServicesSection />
        <BundlesSection />
        <StatsBar />
        <TestimonialsSection />
        <CaseStudiesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
  linkText,
  linkHref,
}: {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-[2rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-[15px]">
            {subtitle}
          </p>
        )}
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-violet-deep transition-colors hover:text-violet-dark"
        >
          {linkText} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F7]">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-soft/40 blur-3xl" />
      <div className="absolute -left-10 top-1/3 h-64 w-64 rounded-full bg-maroon-soft/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:px-6 lg:pt-14 lg:pb-20">
        {/* Two image cards side-by-side at the top */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <Link
            href="/services/google-ads-setup"
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_4px_24px_rgba(75,35,84,0.06)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(75,35,84,0.12)]"
          >
            <div className="relative aspect-[1672/941]">
              <Image
                src="/card1.png"
                alt="Paid Media advertising campaigns"
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          <Link
            href="/services/aeo-geo-audit"
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_4px_24px_rgba(75,35,84,0.06)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(75,35,84,0.12)]"
          >
            <div className="relative aspect-[1672/941]">
              <Image
                src="/ai_tool.png"
                alt="AEO and GEO optimization for AI search"
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        {/* Hero text section */}
        <div className="mt-10 text-center sm:mt-14 lg:mt-16">
          <h1 className="font-display text-[1.875rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.5rem] lg:leading-[1.1]">
            Your brand called.
            <br />
            <span className="italic text-violet-deep">It wants a glow-up.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-base lg:text-[17px]">
            From scroll-stopping content to paid ads, SEO, GEO &amp; AI — everything your brand needs to win online, all in one place.
          </p>

          {/* CTA button */}
          <div className="mt-7 flex justify-center sm:mt-8">
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 rounded-full bg-violet-deep px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(75,35,84,0.25)] transition-all duration-300 hover:bg-violet-dark hover:shadow-[0_6px_28px_rgba(75,35,84,0.35)] sm:px-10 sm:py-4 sm:text-base"
            >
              Shop Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Service icon row */}
          <div className="mt-10 flex items-center justify-center gap-8 sm:mt-12 sm:gap-12 lg:gap-16">
            {[
              { icon: Globe, label: 'AEO & GEO' },
              { icon: Share2, label: 'Social Media' },
              { icon: Target, label: 'Paid Ads' },
              { icon: Code, label: 'Web & App Dev' },
              { icon: Palette, label: 'AI Creative Design' },
            ].map((item, i) => (
              <Link
                key={i}
                href="/services"
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-deep/20 bg-white transition-all duration-300 group-hover:border-violet-deep/40 group-hover:bg-violet-soft sm:h-14 sm:w-14">
                  <item.icon
                    className="h-5 w-5 text-violet-deep sm:h-6 sm:w-6"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[11px] font-medium text-foreground/70 transition-colors group-hover:text-violet-deep sm:text-xs">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="border-t border-border bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Pick and choose the exact services you need. Every service is handled by expert marketers and designers."
          linkText="View All Services"
          linkHref="/services"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Custom service card */}
        <Link
          href="/contact"
          className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-violet-deep/30 bg-violet-soft/30 p-8 text-center transition-all hover:border-violet-deep/50 hover:bg-violet-soft/50 sm:mt-6"
        >
          <h3 className="font-display text-lg font-semibold text-foreground">
            Need something custom?
          </h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Get a tailored solution for your business goals. Just reach out.
          </p>
          <span className="mt-4 flex items-center gap-1.5 rounded-lg bg-violet-deep px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark">
            Request Custom Service <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function BundlesSection() {
  return (
    <section className="bg-violet-soft/30 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          title="Popular Bundles"
          subtitle="Save more with curated service bundles. Perfect for startups, small businesses and growing brands."
          linkText="View All Bundles"
          linkHref="/packages"
        />

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x-mandatory sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: MousePointerClick,
      title: '1. Pick Your Service',
      description: 'Choose what you need and add it to your cart.',
    },
    {
      icon: CreditCard,
      title: '2. Place Your Order',
      description: 'No big upfront payment. Just tell us what you need and we\u2019ll take it from there.',
    },
    {
      icon: Rocket,
      title: '3. We Get It Done',
      description: 'Our experts jump in and deliver your work, hassle-free.',
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-[2rem]">
              How It Works
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-[15px]">
              Get started in 3 simple steps. It&apos;s quick, easy and secure.
            </p>
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            No contracts &nbsp;•&nbsp; Pay as you go &nbsp;•&nbsp; Expert delivery
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-border bg-white p-5 text-center transition-all hover:border-violet-deep/20 hover:shadow-sm sm:p-6"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-soft">
                <step.icon className="h-6 w-6 text-violet-deep" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-violet-deep/20 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const icons = [Users, Star, Award, Clock];
  return (
    <section className="border-y border-border bg-gradient-to-r from-violet-deep to-maroon-rich py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="text-center">
                <Icon className="mx-auto mb-2 h-6 w-6 text-white/70" strokeWidth={1.5} />
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real businesses. Real results."
          linkText="View More Reviews"
          linkHref="/case-studies"
        />

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x-mandatory sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex w-[280px] shrink-0 snap-start flex-col rounded-xl border border-border bg-white p-5 transition-all hover:border-violet-deep/20 hover:shadow-sm sm:w-auto"
            >
              <Quote className="h-7 w-7 text-violet-deep/20" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <StarRating rating={t.rating} size="md" />
                <p className="mt-2 font-display text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section className="bg-violet-soft/30 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          title="Real Results. Real Growth."
          subtitle="See how our services have helped businesses like yours."
          linkText="View All Case Studies"
          linkHref="/case-studies"
        />

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-white p-5 transition-all hover:border-violet-deep/20 hover:shadow-md sm:p-6"
            >
              <span className="inline-block rounded-full bg-violet-soft px-2.5 py-0.5 text-[11px] font-medium text-violet-deep">
                {cs.category}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground sm:text-lg">
                {cs.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{cs.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-maroon-rich" />
                <span className="font-display text-xl font-bold text-maroon-rich">
                  {cs.metric}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{cs.timeframe}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers."
          linkText="View All FAQs"
          linkHref="/faq"
        />

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border border-border bg-white"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
              >
                <span className="text-sm font-medium text-foreground sm:text-[15px]">
                  {faq.question}
                </span>
                {openId === faq.id ? (
                  <Minus className="h-4 w-4 shrink-0 text-violet-deep" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {openId === faq.id && (
                <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-deep via-violet-dark to-maroon-rich px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

          <div className="relative">
            <p className="text-sm font-medium text-white/70">
              Ready to grow your brand?
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Get the right marketing services.
              <br />
              Right now.
            </h2>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-violet-deep transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Shop Services <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-white/60">
              Fast &nbsp;•&nbsp; Secure &nbsp;•&nbsp; Reliable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
