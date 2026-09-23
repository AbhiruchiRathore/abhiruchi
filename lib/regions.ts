export interface Region {
  id: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number;
}

export const regions: Region[] = [
  { id: 'us', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 1 },
  { id: 'in', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 83 },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 0.79 },
  { id: 'eu', name: 'Europe', flag: '🇪🇺', currency: 'EUR', symbol: '€', rate: 0.92 },
  { id: 'au', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', rate: 1.52 },
  { id: 'me', name: 'Middle East', flag: '🇦🇪', currency: 'AED', symbol: 'AED', rate: 3.67 },
];

export const defaultRegion = regions[0];

export function formatRegionalPrice(usdPrice: number, region: Region): string {
  const converted = Math.round(usdPrice * region.rate);
  if (region.id === 'in') {
    return `${region.symbol}${converted.toLocaleString('en-IN')}`;
  }
  if (region.id === 'me') {
    return `${region.symbol} ${converted.toLocaleString('en-US')}`;
  }
  return `${region.symbol}${converted.toLocaleString('en-US')}`;
}
