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
    slug: 'zengly', name: 'ZenglyPay', page: true,
    sector: 'Fintech, social finance',
    summary: 'A social-finance app for young Nigerians, built around how people actually share, celebrate and plan with money.',
    status: ['progress', 'App launching December 2026'],
    site: ['https://zenglypay.com/', 'zenglypay.com'],
    cats: ['fintech', 'product-design', 'web', 'brand'],
    role: ['Product strategy', 'UX/UI design', 'Design system', 'Brand identity', 'Marketing site', 'Investor materials']
  },
  {
    slug: 'swiftly', name: 'Swiftly', page: true,
    sector: 'Ticketing for transport, movies and events',
    summary: 'A proposed ticketing app for bus, train and flight seats, cinema and events: compare, pay and keep every ticket in one wallet.',
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
  landlink: { alt: 'LandLink concept design: a laptop showing title verification for a plot in Ikorodu, with a survey plan matched to the registry and five checks, beside a phone showing the buyer’s verification progress.' },
  sparkhive: { alt: 'SparkHive concept design: a laptop showing an idea board with problem, experiment and MVP-scope notes and a road-to-MVP tracker, beside a phone showing team updates.' },
  lexforum: { alt: 'LexForum concept design: a laptop showing a legal research assistant answering a question about deeds of assignment with sources to review, beside a phone showing the lawyers’ community feed.' },
  swiftly: { alt: 'Swiftly concept design: a laptop comparing Lagos to Ibadan bus and train departures with fares, plus concert and cinema tickets, beside a phone holding a bus ticket and event tickets in one wallet.' }
};
