import Link from 'next/link';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
