export type AmenityStatus = 'yes' | 'no' | 'unknown';

export interface Cafe {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  website: string | null;
  mapsUrl: string | null;
  seating: string | null;
  wifi: AmenityStatus;
  charging: AmenityStatus;
  coffeeMenu: string[];
  beansSold: string[];
  sourcing: string | null;
  priceRange: string | null;
  tags: string[];
  description: string;
  confidenceNotes: string | null;
  sources: string[];
  lat: number | null;
  lng: number | null;
}

export type PriceBand = '₹' | '₹₹' | '₹₹₹';

export interface CafeFilters {
  query: string;
  neighborhood: string | null;
  tag: string | null;
  wifiYes: boolean;
  chargingYes: boolean;
  priceBand: PriceBand | null;
  workFriendly: boolean;
}
