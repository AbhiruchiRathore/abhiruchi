'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { regions, defaultRegion, type Region } from '@/lib/regions';

interface RegionContextValue {
  region: Region;
  setRegion: (region: Region) => void;
  formatPrice: (usdPrice: number) => string;
}

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

const STORAGE_KEY = 'svayaa-region';

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>(defaultRegion);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const found = regions.find((r) => r.id === stored);
        if (found) setRegionState(found);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    try {
      localStorage.setItem(STORAGE_KEY, newRegion.id);
    } catch {
      // ignore
    }
  };

  const formatPrice = (usdPrice: number) => {
    const converted = Math.round(usdPrice * region.rate);
    if (region.id === 'in') {
      return `${region.symbol}${converted.toLocaleString('en-IN')}`;
    }
    if (region.id === 'me') {
      return `${region.symbol} ${converted.toLocaleString('en-US')}`;
    }
    return `${region.symbol}${converted.toLocaleString('en-US')}`;
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, formatPrice }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within RegionProvider');
  return ctx;
}
