import cafesJson from '@/assets/data/cafes.json';
import type { Cafe, CafeFilters, PriceBand } from '@/types/cafe';

export const cafes = cafesJson as Cafe[];

const CURATED_TAGS = [
  'specialty coffee',
  'work-friendly',
  'pour-over',
  'in-house roastery',
  'farm-to-cup',
  'pet-friendly',
  'brunch',
  'outdoor',
  'bookstore cafe',
  'patisserie',
  'multi-roaster',
  'vegetarian',
] as const;

export function getNeighborhoods(): string[] {
  const set = new Set(cafes.map((c) => c.neighborhood));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getFilterTags(): string[] {
  const present = new Set(cafes.flatMap((c) => c.tags));
  return CURATED_TAGS.filter((t) => present.has(t));
}

export function getPriceBands(): PriceBand[] {
  return ['₹', '₹₹', '₹₹₹'];
}

/** Normalize free-form priceRange strings into a coarse band for filtering. */
export function priceBandOf(priceRange: string | null | undefined): PriceBand | null {
  if (!priceRange) return null;
  const cleaned = priceRange.replace(/\s+/g, '');
  if (cleaned.startsWith('₹₹₹') || cleaned.startsWith('₹₹–₹₹₹') || cleaned.startsWith('₹₹-₹₹₹')) {
    // Mid–high often listed as ₹₹–₹₹₹; treat as matching both ₹₹ and ₹₹₹ via startsWith logic below
  }
  // Prefer the leftmost band token
  const match = priceRange.match(/₹+/);
  if (!match) return null;
  const symbols = match[0];
  if (symbols.length >= 3) return '₹₹₹';
  if (symbols.length === 2) return '₹₹';
  return '₹';
}

export function cafeMatchesPriceBand(cafe: Cafe, band: PriceBand): boolean {
  const range = cafe.priceRange ?? '';
  // Match if the range mentions this band (e.g. ₹₹–₹₹₹ matches both ₹₹ and ₹₹₹)
  if (band === '₹₹₹') return /₹₹₹/.test(range);
  if (band === '₹₹') return /₹₹(?!₹)/.test(range) || /₹₹–₹₹₹|₹₹-₹₹₹/.test(range);
  // ₹ only: has ₹ but not as part of ₹₹ at start of a band that is only higher
  return /₹(?!₹)/.test(range) || range.startsWith('₹–') || range.startsWith('₹-');
}

export function getCafeById(id: string): Cafe | undefined {
  return cafes.find((c) => c.id === id);
}

export function getCafesByNeighborhood(neighborhood: string): Cafe[] {
  return cafes
    .filter((c) => c.neighborhood === neighborhood)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function isWorkFriendly(cafe: Cafe): boolean {
  return cafe.wifi === 'yes' || cafe.charging === 'yes';
}

export function filterCafes(filters: CafeFilters): Cafe[] {
  const q = filters.query.trim().toLowerCase();

  return cafes
    .filter((cafe) => {
      if (filters.neighborhood && cafe.neighborhood !== filters.neighborhood) return false;
      if (filters.tag && !cafe.tags.includes(filters.tag)) return false;
      if (filters.wifiYes && cafe.wifi !== 'yes') return false;
      if (filters.chargingYes && cafe.charging !== 'yes') return false;
      if (filters.workFriendly && !isWorkFriendly(cafe)) return false;
      if (filters.priceBand && !cafeMatchesPriceBand(cafe, filters.priceBand)) return false;

      if (q) {
        const hay = [
          cafe.name,
          cafe.neighborhood,
          cafe.address,
          cafe.description,
          cafe.sourcing ?? '',
          ...cafe.tags,
          ...cafe.coffeeMenu,
          ...cafe.beansSold,
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function neighborhoodStats(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const cafe of cafes) {
    map.set(cafe.neighborhood, (map.get(cafe.neighborhood) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const DISCLAIMER =
  'Wifi, charging, prices, and hours change often. Treat amenities as hints — confirm on-site. Research snapshot: Sep 2026.';

/** Path-safe neighborhood param (names may contain "/"). */
export function toNeighborhoodParam(name: string): string {
  return name.replace(/\//g, '__');
}

export function fromNeighborhoodParam(param: string): string {
  return param.replace(/__/g, '/');
}

