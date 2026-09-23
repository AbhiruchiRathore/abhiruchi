'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { ServiceCard } from '@/components/service-card';
import { services, categories } from '@/lib/data';
import type { ServiceCategory } from '@/lib/types';
import * as Icons from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const filtered = useMemo(() => {
    let result = activeCategory === 'All'
      ? [...services]
      : services.filter((s) => s.category === activeCategory);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [activeCategory, sortBy]);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              All Services
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Browse our complete catalog of digital marketing services. Add what you need to your cart and checkout in minutes.
            </p>
          </div>

          {/* Category filters */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === 'All'
                  ? 'bg-violet-deep text-white'
                  : 'border border-border text-foreground/70 hover:border-violet-deep/30'
              }`}
            >
              All Services
            </button>
            {categories.map((cat) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Sparkles;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name as ServiceCategory)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === cat.name
                      ? 'bg-violet-deep text-white'
                      : 'border border-border text-foreground/70 hover:border-violet-deep/30'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort + count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'service' : 'services'} found
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-foreground outline-none focus:border-violet-deep"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
