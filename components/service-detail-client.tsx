'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clock,
  RefreshCw,
  Package,
  ArrowRight,
  ShoppingCart,
  Zap,
  FileText,
  Star,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { ServiceCard } from '@/components/service-card';
import { StarRating } from '@/components/star-rating';
import { getServiceBySlug, getRelatedServices } from '@/lib/data';
import { useCart } from '@/components/cart-provider';
import { useRegion } from '@/components/region-provider';

export function ServiceDetailClient({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const related = getRelatedServices(service);
  const { addItem, lastAdded } = useCart();
  const { formatPrice } = useRegion();
  const justAdded = lastAdded === service.id;

  const handleAddToCart = () => {
    addItem({
      id: service.id,
      type: 'service',
      name: service.name,
      price: service.price,
      icon: service.icon,
      slug: service.slug,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
          <Link
            href="/services"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-violet-deep"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="relative h-56 overflow-hidden rounded-xl bg-violet-soft sm:h-72 lg:h-96">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-deep/15 to-transparent" />
                {service.popular && (
                  <span className="absolute right-3 top-3 rounded-full bg-violet-deep px-3 py-1 text-xs font-medium text-white shadow-md">
                    Popular
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {service.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {service.longDescription}
              </p>

              <DetailSection icon={Package} title="What's Included">
                <ul className="space-y-2">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection icon={Clock} title="Delivery Time">
                <p className="text-sm text-foreground/80">{service.deliveryTime}</p>
              </DetailSection>

              <DetailSection icon={RefreshCw} title="Number of Revisions">
                <p className="text-sm text-foreground/80">{service.revisions}</p>
              </DetailSection>

              <DetailSection icon={Zap} title="How It Works">
                <ol className="space-y-3">
                  {[
                    'Add this service to your cart and complete checkout.',
                    'Receive a confirmation email with a brief questionnaire.',
                    'Fill out the brief and submit your requirements.',
                    'Our experts begin work and deliver within the stated timeframe.',
                    'Review the deliverables and request revisions if needed.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-soft text-xs font-semibold text-violet-deep">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </DetailSection>

              <DetailSection icon={FileText} title="What We Need From You">
                <ul className="space-y-2">
                  {service.whatsNeeded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection icon={Package} title="Expected Deliverables">
                <ul className="space-y-2">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-maroon-rich" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection icon={Star} title="Customer Reviews">
                <div className="mb-4 flex items-center gap-4 rounded-lg bg-violet-soft/50 p-4">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-violet-deep">
                      {service.rating}
                    </p>
                    <StarRating rating={service.rating} size="md" className="mt-1" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {service.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct =
                        star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 3 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-3 text-xs text-muted-foreground">{star}</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {sampleReviews.map((review, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-soft text-xs font-semibold text-violet-deep">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.name}</p>
                          <StarRating rating={review.rating} className="mt-0.5" />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-20 rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-baseline gap-2">
                  {service.customPricing ? (
                    <span className="font-display text-3xl font-bold text-violet-deep">
                      Custom Pricing
                    </span>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <span className="font-display text-3xl font-bold text-violet-deep">
                        {formatPrice(service.price)}
                        {service.priceSuffix && (
                          <span className="text-base font-normal text-muted-foreground">
                            {service.priceSuffix}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <StarRating rating={service.rating} size="md" />
                  <span className="text-sm text-muted-foreground">
                    {service.rating} ({service.reviewCount.toLocaleString()})
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-violet-soft/40 px-3 py-2.5">
                  <Clock className="h-4 w-4 text-violet-deep" />
                  <span className="text-sm text-foreground/80">{service.deliveryTime}</span>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-maroon-soft/40 px-3 py-2.5">
                  <RefreshCw className="h-4 w-4 text-maroon-rich" />
                  <span className="text-sm text-foreground/80">{service.revisions}</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    justAdded
                      ? 'bg-green-700 text-white'
                      : 'border border-violet-deep text-violet-deep hover:bg-violet-soft'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-deep px-4 py-3 text-sm font-medium text-white transition-all hover:bg-violet-dark"
                >
                  Buy Now <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-600" /> Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-600" /> No Hidden Fees
                  </span>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h2 className="mb-5 font-display text-xl font-bold text-foreground sm:text-2xl">
                Related Services
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-border pt-5">
      <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <Icon className="h-5 w-5 text-violet-deep" strokeWidth={1.5} />
        {title}
      </h3>
      {children}
    </div>
  );
}

const sampleReviews = [
  {
    name: 'Jennifer K.',
    rating: 5,
    text: 'Absolutely fantastic work! Delivered on time and exceeded my expectations. Will definitely order again.',
  },
  {
    name: 'Michael R.',
    rating: 5,
    text: 'Professional, responsive, and the quality was top-notch. Highly recommend this service to anyone looking for real results.',
  },
  {
    name: 'Sarah L.',
    rating: 4,
    text: 'Great service overall. The delivery was a day late but the quality made up for it. Very happy with the results.',
  },
];
