import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services, getServiceBySlug } from '@/lib/data';
import { ServiceDetailClient } from '@/components/service-detail-client';
import { ServiceJsonLd } from '@/components/json-ld';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.name} — From $${service.price}`,
    description: service.longDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — Abhiruchi`,
      description: service.tagline,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd
        name={service.name}
        description={service.longDescription}
        price={service.price}
        rating={service.rating}
        reviewCount={service.reviewCount}
      />
      <ServiceDetailClient slug={slug} />
    </>
  );
}
