export type ServiceCategory =
  | 'Social Media'
  | 'Paid Advertising'
  | 'SEO'
  | 'Web Design'
  | 'Content'
  | 'App Marketing'
  | 'App Design';

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceSuffix?: string;
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  category: ServiceCategory;
  icon: string;
  image: string;
  popular?: boolean;
  customPricing?: boolean;
  included: string[];
  revisions: string;
  whatsNeeded: string[];
  deliverables: string[];
  longDescription: string;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  description: string;
  price: number;
  originalPrice: number;
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  items: string[];
  included: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  metric: string;
  timeframe: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  id: string;
  type: 'service' | 'bundle';
  name: string;
  price: number;
  quantity: number;
  icon?: string;
  slug?: string;
}
