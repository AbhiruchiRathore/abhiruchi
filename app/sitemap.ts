import { MetadataRoute } from 'next';
import { services } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://svayaa.com';
  const staticPages = [
    '',
    '/services',
    '/packages',
    '/how-it-works',
    '/case-studies',
    '/faq',
    '/about',
    '/contact',
    '/login',
  ];

  const servicePages = services.map((s) => `/services/${s.slug}`);

  return [...staticPages, ...servicePages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : path.startsWith('/services/') ? 0.8 : 0.6,
  }));
}
