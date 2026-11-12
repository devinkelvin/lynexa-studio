// Portfolio. Statuses must stay truthful: 'live' only for things a visitor can use today.
import { SITE } from '../site.mjs';
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
    status: ['progress', 'App launching December 2026'],
    site: ['https://zenglypay.com/', 'zenglypay.com'],
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
    slug: 'createmycvnow', name: 'CreateMyCVNow', page: false, href: SITE.cvUrl,
    sector: 'Careers, AI',
    summary: 'An AI-powered CV checker and builder for Nigerian job seekers, with ATS scoring and downloadable templates.',
    status: ['live', 'Live'],
    cats: ['web', 'product-design'],
    role: ['Product design', 'Web app engineering', 'AI features', 'Payments integration']
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

// Concept interface designs for studio ventures that have no shipped product yet. Always labelled "Concept design".
export const VENTURE_MOCK = {
  landlink: { alt: 'LandLink concept design: a phone showing title verification progress for a plot in Ikorodu, a survey plan matched to the registry, and a verified-owner card.' },
  sparkhive: { alt: 'SparkHive concept design: an idea board with problem, experiment and MVP-scope notes, a road-to-MVP progress bar and a team card.' },
  lexforum: { alt: 'LexForum concept design: a legal research assistant answering a question about deeds of assignment with sources to review, and a community feed on a phone.' },
  swiftly: { alt: 'Swiftly concept design: a phone listing Lagos to Ibadan departures with fares, an e-ticket, and an event to add at the destination.' }
};
