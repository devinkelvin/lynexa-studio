// Portfolio. Statuses must stay truthful: 'live' only for things a visitor can use today.
export const CATEGORIES = [
  ['fintech', 'Fintech'],
  ['product-design', 'Product design'],
  ['web', 'Web'],
  ['brand', 'Brand identity'],
  ['venture', 'Venture building']
];

export const PROJECTS = [
  {
    slug: 'zengly', name: 'Zengly', page: true,
    sector: 'Fintech, social finance',
    summary: 'A social-finance app for young Nigerians, built around how people actually share, celebrate and plan with money.',
    status: ['progress', 'App in pre-launch'],
    cats: ['fintech', 'product-design', 'web', 'brand'],
    role: ['Product strategy', 'UX/UI design', 'Design system', 'Brand identity', 'Marketing site', 'Investor materials']
  },
  {
    slug: 'swiftly', name: 'Swiftly', page: true,
    sector: 'Mobility, experience commerce',
    summary: 'A proposed platform for how Africa moves and gathers: transport, tickets and experiences in one place.',
    status: ['concept', 'Proposed venture, internal prototype'],
    cats: ['venture', 'web'],
    role: ['Product specification', 'Venture strategy', 'Marketing site prototype', 'Fare comparison research']
  },
  {
    slug: 'landlink', name: 'LandLink', page: false,
    sector: 'Property technology',
    summary: 'Automating property and land registry processes so transactions are easier to verify.',
    status: ['concept', 'Studio venture in development'],
    cats: ['venture']
  },
  {
    slug: 'sparkhive', name: 'SparkHive', page: false,
    sector: 'Productivity',
    summary: 'A collaborative space for taking ideas from first spark to a working MVP.',
    status: ['concept', 'Studio venture in development'],
    cats: ['venture']
  },
  {
    slug: 'lexforum', name: 'LexForum', page: false,
    sector: 'Legal technology',
    summary: 'A community for Nigerian legal professionals, with AI-assisted research and discussion.',
    status: ['concept', 'Studio venture in development'],
    cats: ['venture']
  }
];
