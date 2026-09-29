/**
 * Single source of truth for the Nivice Apartmani one-pager — the parts that do
 * not depend on the language: the brand name, the supplied photo URLs, the
 * apartment ids and photos, the amenity icons and the anchor targets.
 *
 * All translatable copy lives in src/i18n/dictionary.ts, keyed by the ids below,
 * so nothing is written twice and the language switcher can swap the whole page.
 *
 * NOTE ON CONTENT: the organisation name, location and nightly rate come from
 * the owner's brief. Phone, email, street address and any policy (cancellation,
 * check-in, deposit, pets, smoking) are deliberately absent — they are never
 * invented and are flagged in the UI as "uskoro" / "coming soon".
 */

export const site = {
  name: 'Nivice Apartmani',
  priceFrom: 70,
} as const;

/** Temporary stock photos supplied with the brief — to be swapped for the owner's own. */
export const images = {
  hero: 'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/835cb97f735b4019.jpg',
  locationPanel:
    'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/d47cd4ff61f842fd.jpg',
  gallery: [
    'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/9439fbfdd4cd4de7.jpg',
    'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/92ff70eae556439f.jpg',
    'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/b4ba9f1054284f33.jpg',
    'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/d720b14ce26a4f8a.jpg',
  ],
} as const;

export interface Apartment {
  /** Language-neutral id — the copy for it lives in the i18n dictionary. */
  id: string;
  image: string;
}

export const apartments: Apartment[] = [
  {
    id: 'apartment-1',
    image:
      'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/9e570050ed04417a.jpg',
  },
  {
    id: 'apartment-2',
    image:
      'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/685a4b63e7234127.jpg',
  },
  {
    id: 'apartment-3',
    image:
      'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/e2d1f64067dc4d9c.jpg',
  },
  {
    id: 'apartment-4',
    image:
      'https://d38kszyerljeoa.cloudfront.net/builder/ebbab54c-b8af-49c7-8244-472c5ac995d9/1bf718f219044602.jpg',
  },
];

/** Amenity ids in display order; each id is both an icon key and a copy key. */
export const amenityKeys = [
  'ac',
  'wifi',
  'kitchen',
  'balcony',
  'sea',
  'parking',
  'laundry',
  'tv',
  'linen',
  'beach',
] as const;

/** Anchor targets; the visible labels come from `dictionary[lang].nav`. */
export const navLinks = [
  { key: 'home', href: '#top' },
  { key: 'apartments', href: '#apartments' },
  { key: 'amenities', href: '#amenities' },
  { key: 'location', href: '#location' },
  { key: 'gallery', href: '#gallery' },
  { key: 'contact', href: '#contact' },
] as const;

/** Apartment cards announce which apartment a visitor is curious about, so the
 *  inquiry form can pre-select it. Keeps the two sections in sync without a store. */
export const APARTMENT_SELECT_EVENT = 'nivice:select-apartment';

export function announceApartmentSelection(id: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(APARTMENT_SELECT_EVENT, { detail: id }));
}
