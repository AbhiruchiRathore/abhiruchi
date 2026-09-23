'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart-provider';
import { useRegion } from '@/components/region-provider';
import { StarRating } from '@/components/star-rating';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addItem, lastAdded } = useCart();
  const { formatPrice } = useRegion();
  const justAdded = lastAdded === service.id;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card transition-all duration-200 hover:border-violet-deep/30 hover:shadow-[0_8px_30px_rgba(75,35,84,0.08)]">
      <Link href={`/services/${service.slug}`} className="flex-1">
        <div className="relative h-36 overflow-hidden rounded-t-xl bg-violet-soft sm:h-40">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-deep/20 to-transparent" />
          {service.popular && (
            <span className="absolute right-2 top-2 rounded-full bg-violet-deep px-2 py-0.5 text-[10px] font-medium text-white shadow-md">
              Popular
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={`/services/${service.slug}`} className="flex-1">
          <h3 className="font-display text-[15px] font-semibold leading-tight text-foreground sm:text-base">
            {service.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-[13px]">
            {service.tagline}
          </p>
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating rating={service.rating} />
          <span className="text-[11px] text-muted-foreground sm:text-xs">
            {service.rating} ({service.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            {service.customPricing ? (
              <>
                <span className="text-[11px] text-muted-foreground">Custom</span>
                <p className="font-body text-lg font-bold leading-none text-violet-deep sm:text-xl">
                  Custom Pricing
                </p>
              </>
            ) : (
              <>
                <span className="text-[11px] text-muted-foreground">From</span>
                <p className="font-body text-lg font-bold leading-none text-violet-deep sm:text-xl">
                  {formatPrice(service.price)}
                  {service.priceSuffix && (
                    <span className="text-xs font-normal text-muted-foreground">
                      {service.priceSuffix}
                    </span>
                  )}
                </p>
              </>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground">{service.deliveryTime}</span>
        </div>

        <button
          onClick={() =>
            addItem({
              id: service.id,
              type: 'service',
              name: service.name,
              price: service.price,
              icon: service.icon,
              slug: service.slug,
            })
          }
          className={cn(
            'mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200 sm:text-sm',
            justAdded
              ? 'bg-green-700 text-white'
              : 'bg-violet-deep text-white hover:bg-violet-dark'
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
