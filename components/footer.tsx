import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Pick Your Service', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'X' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-xs">
            <span className="font-display text-xl font-bold text-violet-deep">
              SVAYAA
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              The Digital Shop
            </p>
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-lg border border-border p-2 text-foreground/60 transition-colors hover:border-violet-deep/30 hover:text-violet-deep"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-violet-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Svayaa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
