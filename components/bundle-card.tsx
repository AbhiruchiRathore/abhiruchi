'use client';

import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart-provider';
import { useRegion } from '@/components/region-provider';
import { StarRating } from '@/components/star-rating';
import type { Bundle } from '@/lib/types';

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const { addItem, lastAdded } = useCart();
  const { formatPrice } = useRegion();
  const justAdded = lastAdded === bundle.id;
  const discount = Math.round(
    ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
  );

  return (
    <div className="flex w-[280px] shrink-0 snap-start flex-col rounded-xl border border-border bg-card transition-all duration-200 hover:border-violet-deep/30 hover:shadow-[0_8px_30px_rgba(75,35,84,0.08)] sm:w-full">
      {bundle.badge && (
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-violet-deep to-maroon-rich px-4 py-2">
          <span className="text-xs font-semibold text-white">{bundle.badge}</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white">
            Save {discount}%
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-base font-semibold leading-tight text-foreground sm:text-lg">
          {bundle.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          {bundle.description}
        </p>

        <ul className="mt-3 space-y-1.5">
          {bundle.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/80">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-deep" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-violet-deep">
            {formatPrice(bundle.price)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(bundle.originalPrice)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating rating={bundle.rating} />
          <span className="text-[11px] text-muted-foreground">
            {bundle.rating} ({bundle.reviewCount})
          </span>
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground">{bundle.deliveryTime}</p>

        <button
          onClick={() =>
            addItem({
              id: bundle.id,
              type: 'bundle',
              name: bundle.name,
              price: bundle.price,
              slug: bundle.slug,
            })
          }
          className={cn(
            'mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
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
