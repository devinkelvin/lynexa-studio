// Single source of truth for company facts. Change details here, not in templates.
export const SITE = {
  url: 'https://lynexa.co',
  name: 'Lynexa',
  legalName: 'Lynexa Innovations Limited',
  rc: 'RC 8198145',
  tagline: 'Product design, engineering and venture studio in Lagos.',
  email: 'hello@lynexa.co',
  phoneDisplay: '0703 827 1812',
  phoneIntl: '+2347038271812',
  address: {
    lines: [
      'No. 2 Close 3, Olanrewaju Close',
      'Off Road 7, Phase 1, Igbe-Ayeni, Ayeni Estate',
      'Opposite De Butlers Hotel, Ginti-Elepe',
      'Ikorodu, Lagos State, Nigeria'
    ],
    street: 'No. 2 Close 3, Olanrewaju Close, Off Road 7 Phase 1, Igbe-Ayeni, Ayeni Estate, opposite De Butlers Hotel, Ginti-Elepe',
    locality: 'Ikorodu',
    region: 'Lagos State',
    country: 'NG',
    full: 'No. 2 Close 3, Olanrewaju Close, Off Road 7 Phase 1, Igbe-Ayeni, Ayeni Estate, opposite De Butlers Hotel, Ginti-Elepe, Ikorodu, Lagos State, Nigeria'
  },
  linkedin: 'https://linkedin.com/in/kelvin-ekuhoho-a814568b',
  founder: 'Kelvin Ekuhoho',
  // Reply promise used across the site.
  reply: 'within 24 hours on working days',
  // Paste a Cal.com or Calendly link here to switch every "Book a call" button to it.
  // Empty = the button opens WhatsApp with a booking message instead.
  bookingUrl: '',
  // CreateMyCVNow: change cvUrl once its custom domain is connected in Netlify.
  cvUrl: 'https://createmycvnownow.netlify.app/'
};

SITE.whatsapp = '2347038271812';
SITE.whatsappUrl = 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent('Hello Lynexa, I would like to talk about a project.');
SITE.bookingHref = SITE.bookingUrl || ('https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent('Hello Lynexa, I would like to book a 20-minute intro call. My time zone is: '));
SITE.bookingExternal = true;
SITE.mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(SITE.address.full);

export const NAV = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/ventures/', label: 'Ventures' },
  { href: '/insights/', label: 'Insights' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' }
];
