'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { useRegion } from '@/components/region-provider';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'in-progress' | 'delivered';
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

const ORDERS_KEY = 'svayaa-orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { formatPrice } = useRegion();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) setOrders(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const statusConfig = {
    processing: { icon: Clock, label: 'Processing', color: 'text-amber-600 bg-amber-50' },
    'in-progress': { icon: Loader2, label: 'In Progress', color: 'text-blue-600 bg-blue-50' },
    delivered: { icon: CheckCircle2, label: 'Delivered', color: 'text-green-600 bg-green-50' },
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-6 lg:py-12">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your service delivery status and view past orders.
          </p>

          {orders.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium text-foreground">No orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your submitted service requests will appear here.
              </p>
              <Link
                href="/services"
                className="mt-4 rounded-lg bg-violet-deep px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
              >
                Shop Services
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => {
                const status = statusConfig[order.status];
                return (
                  <div
                    key={order.id}
                    className="rounded-xl border border-border bg-white p-5 transition-all hover:shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-soft">
                          <Package className="h-5 w-5 text-violet-deep" />
                        </div>
                        <div>
                          <p className="font-display text-sm font-semibold text-foreground">
                            {order.id}
                          </p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                      >
                        <status.icon className={`h-3.5 w-3.5 ${order.status === 'in-progress' ? 'animate-spin' : ''}`} />
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 border-t border-border pt-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-foreground/80">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-foreground">
                            ${formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm font-medium text-muted-foreground">Total</span>
                      <span className="font-display text-lg font-bold text-violet-deep">
                        ${formatPrice(order.total)}
                      </span>
                    </div>

                    {order.status !== 'delivered' && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          {['Order Placed', 'In Progress', 'Delivered'].map((step, i) => {
                            const isComplete =
                              (order.status === 'in-progress' && i < 2) ||
                              (order.status === 'delivered' && i < 3);
                            return (
                              <div key={i} className="flex flex-1 items-center gap-2">
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                                    isComplete
                                      ? 'bg-violet-deep text-white'
                                      : 'bg-border text-muted-foreground'
                                  }`}
                                >
                                  {isComplete ? '✓' : i + 1}
                                </div>
                                {i < 2 && (
                                  <div
                                    className={`h-px flex-1 ${isComplete ? 'bg-violet-deep' : 'bg-border'}`}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                          <span>Placed</span>
                          <span>In Progress</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/services"
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent"
              >
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
