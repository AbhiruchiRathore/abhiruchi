'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart-provider';
import { SearchModal } from '@/components/search-modal';
import { ContactModal } from '@/components/contact-modal';
import { RegionSelector } from '@/components/region-selector';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Pick Your Service', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-200',
          scrolled
            ? 'border-border bg-white/90 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-white'
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 lg:px-6">
          <div className="flex items-center gap-6">
<Link href="/" className="flex flex-col">
              <span className="font-display text-lg font-bold leading-none tracking-tight text-violet-deep sm:text-xl">
                SVAYAA
              </span>
              <span className="hidden text-[10px] font-medium tracking-[0.15em] text-muted-foreground sm:block">
                THE DIGITAL SHOP
              </span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-violet-deep',
                    pathname === link.href
                      ? 'text-violet-deep'
                      : 'text-foreground/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden rounded-lg p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-violet-deep sm:block"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Shopping cart"
              className="relative hidden rounded-lg p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-violet-deep sm:block"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon-rich px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <RegionSelector />

            <button
              onClick={() => setContactOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg bg-violet-deep px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-violet-dark sm:flex sm:px-4 sm:py-2 sm:text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              Contact
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-violet-deep/30 hover:bg-violet-soft lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-display text-lg font-bold text-violet-deep">
                SVAYAA
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-violet-soft text-violet-deep'
                      : 'text-foreground/80 hover:bg-accent'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Link
                href="/orders"
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
                className="flex items-center gap-2 rounded-lg bg-violet-deep px-4 py-3 text-sm font-medium text-white"
              >
                <MessageSquare className="h-4 w-4" /> Contact Us
              </button>
            </nav>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
