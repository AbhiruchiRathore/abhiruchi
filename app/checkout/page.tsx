'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Tag,
  X,
  Loader2,
  ShoppingBag,
  ClipboardList,
  Send,
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { useCart } from '@/components/cart-provider';
import { useRegion } from '@/components/region-provider';
import { useToast } from '@/hooks/use-toast';
import { services, getServiceBySlug } from '@/lib/data';
import Image from 'next/image';
import { Package as PackageIcon } from 'lucide-react';

const WEB3FORMS_KEY = 'fa3a2094-8417-4fac-a648-499d0e5958d0';
const ORDERS_KEY = 'svayaa-orders';

const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  GROWTH20: 20,
  SVAYAA15: 15,
};

interface SavedOrder {
  id: string;
  date: string;
  status: 'processing' | 'in-progress' | 'delivered';
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { toast } = useToast();
  const { formatPrice } = useRegion();

  const [step, setStep] = useState<'details' | 'review' | 'confirmation'>('details');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  // Per-item detail fields
  const [itemDetails, setItemDetails] = useState<Record<string, Record<string, string>>>({});

  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = subtotal - discountAmount;

  const applyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      setAppliedDiscount(PROMO_CODES[code]);
      setPromoError('');
      toast({ title: 'Promo code applied!', description: `${PROMO_CODES[code]}% discount applied.` });
    } else {
      setPromoError('Invalid promo code');
      setAppliedDiscount(0);
    }
  };

  const getDetailFields = (item: (typeof items)[0]) => {
    const service = item.slug ? getServiceBySlug(item.slug) : undefined;
    if (service) return service.whatsNeeded;
    return ['Project details or requirements'];
  };

  const handleDetailChange = (itemId: string, field: string, value: string) => {
    setItemDetails((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] ?? {}), [field]: value },
    }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email) {
      toast({ title: 'Please fill in your name and email', variant: 'destructive' });
      return;
    }
    setStep('review');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const id = 'SVA-' + Date.now().toString(36).toUpperCase().slice(-8);
    const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const itemsSummary = items
      .map((item) => {
        const details = itemDetails[item.id] ?? {};
        const detailLines = Object.entries(details)
          .map(([k, v]) => `  - ${k}: ${v}`)
          .join('\n');
        return `${item.name} × ${item.quantity} — $${(item.price * item.quantity).toLocaleString()}\n${detailLines}`;
      })
      .join('\n\n');

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', `New Service Request — ${id}`);
    formData.append('from_name', 'Svayaa Website');
    formData.append('name', contact.name);
    formData.append('email', contact.email);
    formData.append('phone', contact.phone || 'Not provided');
    formData.append('company', contact.company || 'Not provided');
    formData.append('order_id', id);
    formData.append('order_total', `$${total.toLocaleString()}`);
    formData.append('promo_code', promoCode || 'None');
    formData.append('order_items', itemsSummary);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        // Save order to localStorage
        const savedOrders: SavedOrder[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]');
        savedOrders.unshift({
          id,
          date: orderDate,
          status: 'processing',
          items: items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
          total,
        });
        localStorage.setItem(ORDERS_KEY, JSON.stringify(savedOrders));

        setOrderId(id);
        setSubmitting(false);
        setStep('confirmation');
        clearCart();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setSubmitting(false);
      toast({ title: 'Failed to submit. Please try again.', variant: 'destructive' });
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <>
        <Header />
        <CartDrawer />
        <main className="bg-white">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-soft">
              <ShoppingBag className="h-8 w-8 text-violet-deep/50" />
            </div>
            <h1 className="mt-4 font-display text-xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some services to your cart before checking out.
            </p>
            <Link
              href="/services"
              className="mt-6 rounded-lg bg-violet-deep px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
            >
              Shop Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (step === 'confirmation') {
    return (
      <>
        <Header />
        <CartDrawer />
        <main className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-12 lg:py-20">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Request Submitted!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you. We&apos;ve received your service request and will contact you within 24 hours to get started.
              </p>
              <div className="mt-4 rounded-lg border border-border bg-violet-soft/30 px-4 py-3">
                <p className="text-xs text-muted-foreground">Request Number</p>
                <p className="font-display text-lg font-bold text-violet-deep">{orderId}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                What happens next?
              </h2>
              {[
                'Our team reviews your request and the details you provided.',
                'We contact you within 24 hours to confirm and get started.',
                'Our experts begin work and deliver within the stated timeframe.',
                'Track your delivery status in the Orders page.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-soft text-xs font-semibold text-violet-deep">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/orders"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
              >
                View My Orders <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
          <Link
            href="/services"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-violet-deep"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Service Request
          </h1>

          {/* Progress steps */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'details' ? 'text-violet-deep' : 'text-muted-foreground'}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step === 'details' ? 'bg-violet-deep text-white' : 'bg-violet-soft text-violet-deep'}`}>1</span>
              Service Details
            </div>
            <div className="h-px w-8 bg-border" />
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'review' ? 'text-violet-deep' : 'text-muted-foreground'}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step === 'review' ? 'bg-violet-deep text-white' : 'bg-violet-soft text-violet-deep'}`}>2</span>
              Review & Submit
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  {/* Contact info */}
                  <div className="rounded-xl border border-border p-5">
                    <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                      Contact Information
                    </h2>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full name *"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email address *"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                        required
                      />
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                        />
                        <input
                          type="text"
                          placeholder="Company name (optional)"
                          value={contact.company}
                          onChange={(e) => setContact({ ...contact, company: e.target.value })}
                          className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Per-item detail fields */}
                  <div className="rounded-xl border border-border p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-violet-deep" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Service Requirements
                      </h2>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Fill in the details below for each service so our team can get started quickly.
                    </p>

                    <div className="space-y-6">
                      {items.map((item, idx) => {
                        const fields = getDetailFields(item);
                        const service = services.find((s) => s.id === item.id);
                        return (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <div className="mb-3 flex items-center gap-2">
                              {service ? (
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-violet-soft">
                                  <Image src={service.image} alt={item.name} fill sizes="32px" className="object-cover" />
                                </div>
                              ) : (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-soft">
                                  <PackageIcon className="h-4 w-4 text-violet-deep" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {idx + 1}. {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="space-y-2.5">
                              {fields.map((field) => (
                                <div key={field}>
                                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                                    {field}
                                  </label>
                                  <textarea
                                    rows={2}
                                    placeholder={`Enter ${field.toLowerCase()}`}
                                    value={itemDetails[item.id]?.[field] ?? ''}
                                    onChange={(e) => handleDetailChange(item.id, field, e.target.value)}
                                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-violet-deep"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
                  >
                    Review & Submit <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {step === 'review' && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div className="rounded-xl border border-border p-5">
                    <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                      Review Your Request
                    </h2>

                    <div className="mb-4 rounded-lg bg-violet-soft/30 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Contact</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                      {contact.company && <p className="text-sm text-muted-foreground">{contact.company}</p>}
                    </div>

                    <div className="space-y-3">
                      {items.map((item, idx) => {
                        const details = itemDetails[item.id] ?? {};
                        const fields = getDetailFields(item);
                        return (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="text-sm font-semibold text-foreground">
                              {idx + 1}. {item.name} × {item.quantity}
                            </p>
                            <div className="mt-2 space-y-1">
                              {fields.map((field) => (
                                <div key={field} className="text-xs">
                                  <span className="font-medium text-muted-foreground">{field}: </span>
                                  <span className="text-foreground/80">{details[field] || '— Not provided —'}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-20 rounded-xl border border-border bg-violet-soft/20 p-5">
                <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  {items.map((item) => {
                    const service = services.find((s) => s.id === item.id);
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        {service ? (
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
                            <Image src={service.image} alt={item.name} fill sizes="40px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                            <PackageIcon className="h-5 w-5 text-violet-deep" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          ${formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Promo code */}
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-lg border border-border py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-violet-deep"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="rounded-lg border border-violet-deep px-4 py-2.5 text-sm font-medium text-violet-deep transition-colors hover:bg-violet-soft"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <X className="h-3 w-3" /> {promoError}
                    </p>
                  )}
                  {appliedDiscount > 0 && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-green-600">
                      <Check className="h-3 w-3" /> {appliedDiscount}% discount applied
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Try: WELCOME10, GROWTH20, SVAYAA15
                  </p>
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount ({appliedDiscount}%)</span>
                      <span className="font-medium text-green-600">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-display text-base font-bold text-foreground">Total</span>
                    <span className="font-display text-xl font-bold text-violet-deep">
                      ${formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-maroon-soft/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    No payment required now. Submit your request and our team will contact you to get started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
