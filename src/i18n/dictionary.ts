/**
 * Every translatable string on the Nivice Apartmani one-pager, in Montenegrin
 * (Latin script, the default) and English.
 *
 * `sr` is the source of truth for the shape: `Strings` is derived from it, so
 * `en` cannot drift out of sync without a type error. Language-neutral data —
 * photo URLs, apartment ids, amenity icon ids, anchor targets — stays in
 * src/data/site.ts and is looked up by the same keys used here.
 */

export type Lang = 'sr' | 'en';

const sr = {
  /** Document title per language. */
  title: 'Nivice Apartmani — Apartmani u Herceg Novom, Crna Gora',

  nav: {
    home: 'Početna',
    apartments: 'Apartmani',
    amenities: 'Sadržaji',
    location: 'Lokacija',
    gallery: 'Galerija',
    contact: 'Kontakt',
  },
  navAria: 'Sekcije',
  backToTop: 'nazad na vrh',
  menuOpen: 'Otvori meni',
  menuClose: 'Zatvori meni',
  headerCta: 'Pošalji upit',
  languageLabel: 'Jezik',

  hero: {
    alt: 'Zaliv u Herceg Novom sa kulom Starog grada i Orjenom u pozadini',
    region: 'Herceg Novi · Crna Gora',
    headline: 'Apartmani u Herceg Novom, korak od mora',
    subtitle:
      'Četiri udobna apartmana za kratkoročni najam u Herceg Novom — mirna lokacija, blizina plaže i sve što vam treba za prijatan odmor.',
    cta: 'Pošalji upit',
    secondary: 'Pogledaj apartmane',
    statApartments: 'Apartmani',
    statPrice: 'Cene',
    statSurroundings: 'Okruženje',
    statSurroundingsValue: 'Nekoliko koraka do mora',
    priceLabel: 'od 70 EUR / noć',
  },

  intro: {
    eyebrow: 'Dobrodošli',
    heading: 'Malo mesto za odmor, tik uz more',
    body:
      'Nivice Apartmani nudi četiri udobna apartmana u Herceg Novom, na crnogorskoj obali Jadrana, nedaleko od mora. Svaki apartman je samostalan — ima svoju kuhinju i kupatilo, kao i terasu ili prozor sa pogledom na zaliv ili prema planinama. Podjednako odgovaraju parovima, porodicama i manjim grupama, a dostupni su za kratke boravke, bilo da je to produženi vikend ili nekoliko mirnih nedelja.',
  },

  apartmentsSection: {
    eyebrow: 'Naši apartmani',
    heading: 'Četiri apartmana za vaš odmor',
    intro: 'Izaberite apartman koji vam najviše odgovara.',
    rateLine: 'Svi apartmani od 70 EUR po noći',
    tapHint: 'Dodirnite fotografiju da je vidite preko celog ekrana.',
    openPhoto: (name: string) =>
      `Prikaži fotografiju apartmana ${name} preko celog ekrana`,
    pricePrefix: 'Od',
    priceNight: 'po noći',
    cardCta: 'Pošalji upit',
  },

  /** Keyed by the apartment ids in src/data/site.ts. */
  apartments: {
    'apartment-1': {
      name: 'Apartman 1',
      capacity: 'Do 4 gosta',
      description:
        'Dvosoban apartman sa balkonom i pogledom na more. Spavaća soba sa bračnim krevetom i dnevni boravak sa sofa na razvlačenje.',
      alt: 'Svetao deo za ručavanje u apartmanu sa velikim prozorima prema Jadranu',
    },
    'apartment-2': {
      name: 'Apartman 2',
      capacity: 'Do 2 gosta',
      description:
        'Studio apartman sa malom kuhinjom i terasom. Idealan za parove koji traže mirnu bazu blizu plaže.',
      alt: 'Osunčan deo apartmana pored otvorenih balkonskih vrata okrenutih moru',
    },
    'apartment-3': {
      name: 'Apartman 3',
      capacity: 'Do 5 gostiju',
      description:
        'Prostran apartman sa dve spavaće sobe i velikom terasom. Pogodan za porodice ili grupu prijatelja.',
      alt: 'Dnevni boravak sa sofom i velikim prozorima prema moru',
    },
    'apartment-4': {
      name: 'Apartman 4',
      capacity: 'Do 3 gosta',
      description:
        'Apartman sa jednom spavaćom sobom i pogledom na grad. Tiha strana zgrade, blizu starog grada.',
      alt: 'Dnevni boravak apartmana koji se otvara na privatnu terasu sa pogledom na planine',
    },
  } as Record<string, { name: string; capacity: string; description: string; alt: string }>,

  amenities: {
    eyebrow: 'Sadržaji',
    heading: 'Sve što vam treba za prijatan boravak',
    intro:
      'Svaki apartman je potpuno opremljen, pa možete doći sa jednom torbom i odmah početi odmor.',
    items: {
      ac: 'Klima uređaj',
      wifi: 'Wi-Fi',
      kitchen: 'Kuhinja',
      balcony: 'Terasa ili balkon',
      sea: 'Pogled na more',
      parking: 'Parking',
      laundry: 'Veš mašina',
      tv: 'TV',
      linen: 'Posteljina i peškiri',
      beach: 'Blizina plaže',
    } as Record<string, string>,
  },

  location: {
    eyebrow: 'Lokacija',
    heading: 'Herceg Novi, Crna Gora',
    body:
      'Apartmani se nalaze u Herceg Novom, u mirnom delu grada, na kratkoj šetnji od plaže i šetališta.',
    chips: [
      'Stari grad',
      'Šetalište uz more',
      'Kafići na obali',
      'Orjen',
      'Izleti brodom i plaže',
    ],
    mapAria: 'Ilustrovana mapa obale oko Herceg Novog',
    caption: 'Ilustracija mape — prava mapa može biti ugrađena kasnije',
    panelAlt: 'Sumrak nad zalivom i planinama u Herceg Novom',
  },

  gallery: {
    eyebrow: 'Galerija',
    heading: 'Pogled kroz apartmane',
    note: 'Fotografije su privremene i biće zamenjene fotografijama vlasnika.',
    tapHint: 'Dodirnite fotografiju da je vidite preko celog ekrana.',
    caption: 'Privremena fotografija',
    photoAlt: (index: number) => `Utisci sa obale i iz apartmana ${index}`,
    openPhoto: (index: number) => `Prikaži fotografiju ${index} preko celog ekrana`,
  },

  inquiry: {
    eyebrow: 'Kontakt',
    heading: 'Pošaljite upit',
    intro: 'Popunite formu i javićemo vam se u vezi dostupnosti i detalja.',
    rateLine: 'Svi apartmani od 70 EUR po noći',
    rateNote: 'Cene su navedene po noći. Pitajte za duže boravke u svojoj poruci.',
    labels: {
      name: 'Ime i prezime',
      email: 'Email',
      phone: 'Telefon',
      optional: '(opciono)',
      arrival: 'Dolazak',
      departure: 'Odlazak',
      guests: 'Broj gostiju',
      apartment: 'Apartman',
      message: 'Poruka',
    },
    placeholders: {
      name: 'Vaše ime',
      email: 'Vaš email',
      phone: '+382 ... (opciono)',
      message: 'Napišite vašu poruku',
    },
    selectPlaceholder: 'Izaberite apartman',
    required: 'obavezno',
    submit: 'Pošalji upit',
    sending: 'Šalje se…',
    errors: {
      name: 'Molimo unesite vaše ime.',
      emailRequired: 'Molimo unesite vaš email.',
      emailInvalid: 'Molimo unesite ispravan email.',
      generic: 'Došlo je do greške pri slanju upita. Pokušajte ponovo.',
    },
    success: {
      heading: 'Hvala na upitu!',
      body: 'Vaš upit je poslat. Javićemo vam se u najkraćem roku.',
      again: 'Pošaljite novi upit',
    },
    footerNote: 'Ime i email su sve što nam je potrebno za odgovor.',
    panelLine: 'Pošaljite nam datume i pitanja — odgovorićemo vam sa slobodnim terminima i detaljima.',
    panelNote: 'Direktni kontakt podaci biće dodati uskoro.',
  },

  footer: {
    location: 'Herceg Novi, Crna Gora',
    rateLine: 'Svi apartmani od 70 EUR po noći',
    sectionsHeading: 'Sekcije',
    contactHeading: 'Kontaktirajte nas',
    contactSoon: 'Kontakt podaci uskoro.',
    cta: 'Pošalji upit',
    note: 'Fotografije su privremene i biće zamenjene fotografijama vlasnika.',
  },

  lightbox: {
    dialog: 'Pregled fotografija',
    close: 'Zatvori fotografiju preko celog ekrana',
    previous: 'Prethodna fotografija',
    next: 'Sledeća fotografija',
    hint: 'Strelice za listanje · Esc za zatvaranje',
  },
};

export type Strings = typeof sr;

const en: Strings = {
  title: 'Nivice Apartmani — Apartments in Herceg Novi, Montenegro',

  nav: {
    home: 'Home',
    apartments: 'Apartments',
    amenities: 'Amenities',
    location: 'Location',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  navAria: 'Sections',
  backToTop: 'back to top',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  headerCta: 'Send inquiry',
  languageLabel: 'Language',

  hero: {
    alt: 'The bay in Herceg Novi with the old town tower and Mount Orjen in the background',
    region: 'Herceg Novi · Montenegro',
    headline: 'Apartments in Herceg Novi, steps from the sea',
    subtitle:
      'Four comfortable short-term rental apartments in Herceg Novi — a quiet location, close to the beach, and everything you need for a relaxing stay.',
    cta: 'Send inquiry',
    secondary: 'View apartments',
    statApartments: 'Apartments',
    statPrice: 'Prices',
    statSurroundings: 'Surroundings',
    statSurroundingsValue: 'A few steps from the sea',
    priceLabel: 'from 70 EUR / night',
  },

  intro: {
    eyebrow: 'Welcome',
    heading: 'A small place to rest, right by the sea',
    body:
      'Nivice Apartmani offers four comfortable apartments in Herceg Novi, on the Montenegrin coast of the Adriatic, a short way from the sea. Each apartment stands on its own — it has its own kitchen and bathroom, plus a terrace or a window looking out over the bay or towards the mountains. They suit couples, families and smaller groups alike, and are available for short stays, whether that is a long weekend or a few quiet weeks.',
  },

  apartmentsSection: {
    eyebrow: 'Our apartments',
    heading: 'Four apartments for your stay',
    intro: 'Choose the apartment that suits you best.',
    rateLine: 'All apartments from 70 EUR per night',
    tapHint: 'Tap a photo to see it full screen.',
    openPhoto: (name: string) => `Show a full-screen photo of ${name}`,
    pricePrefix: 'From',
    priceNight: 'per night',
    cardCta: 'Send inquiry',
  },

  apartments: {
    'apartment-1': {
      name: 'Apartment 1',
      capacity: 'Up to 4 guests',
      description:
        'One-bedroom apartment with a balcony and sea view. A bedroom with a double bed and a living room with a sofa bed.',
      alt: 'A bright dining corner in an apartment with large windows facing the Adriatic',
    },
    'apartment-2': {
      name: 'Apartment 2',
      capacity: 'Up to 2 guests',
      description:
        'Studio apartment with a small kitchen and a terrace. Ideal for couples looking for a quiet base near the beach.',
      alt: 'A sunny part of the apartment beside open balcony doors facing the sea',
    },
    'apartment-3': {
      name: 'Apartment 3',
      capacity: 'Up to 5 guests',
      description:
        'Spacious apartment with two bedrooms and a large terrace. Suitable for families or a group of friends.',
      alt: 'A living room with a sofa and large windows facing the sea',
    },
    'apartment-4': {
      name: 'Apartment 4',
      capacity: 'Up to 3 guests',
      description:
        'One-bedroom apartment with a city view. A quiet side of the building, close to the old town.',
      alt: 'The living room of an apartment opening onto a private terrace with mountain views',
    },
  },

  amenities: {
    eyebrow: 'Amenities',
    heading: 'Everything you need for a comfortable stay',
    intro:
      'Every apartment is fully equipped, so you can arrive with a single bag and start your holiday straight away.',
    items: {
      ac: 'Air conditioning',
      wifi: 'Wi-Fi',
      kitchen: 'Kitchen',
      balcony: 'Terrace or balcony',
      sea: 'Sea view',
      parking: 'Parking',
      laundry: 'Washing machine',
      tv: 'TV',
      linen: 'Bed linen and towels',
      beach: 'Close to the beach',
    },
  },

  location: {
    eyebrow: 'Location',
    heading: 'Herceg Novi, Montenegro',
    body:
      'The apartments are located in Herceg Novi, in a quiet part of town, a short walk from the beach and the promenade.',
    chips: [
      'Old town',
      'Seaside promenade',
      'Waterfront cafés',
      'Orjen',
      'Boat trips and beaches',
    ],
    mapAria: 'Illustrated map of the coastline around Herceg Novi',
    caption: 'Map illustration — a live map can be embedded here later',
    panelAlt: 'Dusk over the bay and the mountains in Herceg Novi',
  },

  gallery: {
    eyebrow: 'Gallery',
    heading: 'A look through the apartments',
    note: 'These photos are temporary and will be replaced with the owner\'s own photos.',
    tapHint: 'Tap a photo to see it full screen.',
    caption: 'Temporary photo',
    photoAlt: (index: number) => `Views from the coast and from the apartments ${index}`,
    openPhoto: (index: number) => `Show photo ${index} full screen`,
  },

  inquiry: {
    eyebrow: 'Contact',
    heading: 'Send an inquiry',
    intro: 'Fill in the form and we will get back to you about availability and details.',
    rateLine: 'All apartments from 70 EUR per night',
    rateNote: 'Prices are per night. Ask about longer stays in your message.',
    labels: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      optional: '(optional)',
      arrival: 'Arrival',
      departure: 'Departure',
      guests: 'Number of guests',
      apartment: 'Apartment',
      message: 'Message',
    },
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      phone: '+382 ... (optional)',
      message: 'Write your message',
    },
    selectPlaceholder: 'Select an apartment',
    required: 'required',
    submit: 'Send inquiry',
    sending: 'Sending…',
    errors: {
      name: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please enter a valid email address.',
      generic: 'Something went wrong while sending your inquiry. Please try again.',
    },
    success: {
      heading: 'Thank you for your inquiry!',
      body: 'Your inquiry has been sent. We will get back to you shortly.',
      again: 'Send another inquiry',
    },
    footerNote: 'Your name and email are all we need in order to reply.',
    panelLine: 'Send us your dates and questions — we will reply with availability and details.',
    panelNote: 'Direct contact details will be added soon.',
  },

  footer: {
    location: 'Herceg Novi, Montenegro',
    rateLine: 'All apartments from 70 EUR per night',
    sectionsHeading: 'Sections',
    contactHeading: 'Contact us',
    contactSoon: 'Contact details coming soon.',
    cta: 'Send inquiry',
    note: 'These photos are temporary and will be replaced with the owner\'s own photos.',
  },

  lightbox: {
    dialog: 'Photo viewer',
    close: 'Close the full-screen photo',
    previous: 'Previous photo',
    next: 'Next photo',
    hint: 'Arrow keys to browse · Esc to close',
  },
};

export const dictionary: Record<Lang, Strings> = { sr, en };

/** Language names for the switcher — the same in both languages, as spoken. */
export const languageNames: Record<Lang, string> = {
  sr: 'Crnogorski',
  en: 'English',
};
