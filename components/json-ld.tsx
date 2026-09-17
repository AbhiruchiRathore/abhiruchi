export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Svayaa',
    description:
      'Buy professional digital marketing services individually or in bundles. SEO, Google Ads, Meta Ads, social media management, and more.',
    url: 'https://svayaa.com',
    logo: 'https://svayaa.com/logo.png',
    sameAs: [
      'https://instagram.com/svayaa',
      'https://linkedin.com/company/svayaa',
      'https://facebook.com/svayaa',
      'https://twitter.com/svayaa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-555-0192',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  price,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Svayaa',
    },
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function MarketplaceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Svayaa',
    url: 'https://svayaa.com',
    description:
      'Premium digital marketing services marketplace. Buy SEO, Google Ads, Meta Ads, social media management, and more online.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://svayaa.com/services?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd(faqs: { question: string; answer: string }[]) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
