'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Package } from 'lucide-react';
import Image from 'next/image';
import { services, bundles } from '@/lib/data';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return { services: [], bundles: [] };
    const q = query.toLowerCase();
    return {
      services: services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      ),
      bundles: bundles.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-0 w-full max-w-xl -translate-x-1/2 p-4 pt-[10vh]">
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xl animate-scale-in">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, bundles..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button onClick={onClose} aria-label="Close search">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-2">
            {query.trim() === '' && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Start typing to search our services and bundles
              </div>
            )}

            {query.trim() !== '' && results.services.length === 0 && results.bundles.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No results found for &ldquo;{query}&rdquo;
              </div>
            )}

            {results.services.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Services
                </p>
                {results.services.map((s) => {
                  return (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                    >
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-violet-soft">
                        <Image src={s.image} alt={s.name} fill sizes="36px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.tagline}</p>
                      </div>
                      <span className="text-sm font-semibold text-violet-deep">
                        ${s.price}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            {results.bundles.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Bundles
                </p>
                {results.bundles.map((b) => (
                  <Link
                    key={b.id}
                    href={`/packages#${b.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-soft">
                      <Package className="h-4 w-4 text-maroon-rich" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-violet-deep">
                      ${b.price}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
