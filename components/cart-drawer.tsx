'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart-provider';
import { services } from '@/lib/data';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-violet-deep" />
            <h2 className="font-display text-base font-semibold text-foreground">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="rounded-full bg-violet-soft px-2 py-0.5 text-xs font-medium text-violet-deep">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-soft">
              <ShoppingBag className="h-8 w-8 text-violet-deep/50" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse our services and add what you need.
              </p>
            </div>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-violet-deep px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
            >
              Shop Services
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {items.map((item) => {
                  const service = services.find((s) => s.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-lg border border-border p-3"
                    >
                      {service ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-violet-soft">
                          <Image src={service.image} alt={item.name} fill sizes="48px" className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-soft">
                          <Package className="h-5 w-5 text-violet-deep" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {item.type}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-muted-foreground hover:text-foreground"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-muted-foreground hover:text-foreground"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-violet-deep">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold text-foreground">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Taxes calculated at checkout. Shipping not required for digital services.
              </p>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-deep px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
