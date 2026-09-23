'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRegion } from '@/components/region-provider';
import { regions } from '@/lib/regions';

export function RegionSelector({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground/70 transition-colors hover:border-violet-deep/30',
          open && 'border-violet-deep/30'
        )}
        aria-label="Select region"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="text-base leading-none">{region.flag}</span>
        <span className="hidden sm:inline">{region.currency}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-border bg-white py-1 shadow-xl animate-scale-in">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRegion(r);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent',
                region.id === r.id && 'bg-violet-soft/50'
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-lg leading-none">{r.flag}</span>
                <span className="font-medium text-foreground">{r.name}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{r.currency}</span>
                {region.id === r.id && <Check className="h-3.5 w-3.5 text-violet-deep" />}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
