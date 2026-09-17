'use client';

import { CartProvider } from '@/components/cart-provider';
import { RegionProvider } from '@/components/region-provider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RegionProvider>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </RegionProvider>
  );
}
