// Starting prices in US dollars. Final prices are always agreed in a written scope.
// Edit the numbers here; every page that shows prices reads from this file.
export const PACKAGES = [
  { key: 'sprint', name: 'Product Sprint', from: 2500, unit: '', weeks: '2–3 weeks', for: 'Founders who need to test an idea or impress investors before building.',
    gets: ['Discovery workshop and written scope', 'User flows and key screens', 'Clickable prototype you can test and demo', 'Recommendations for the build'], service: '/services/product-design/' },
  { key: 'mvp', name: 'MVP Build', from: 12000, unit: '', weeks: '8–14 weeks', for: 'Teams ready to put a first version in customers’ hands.', featured: true,
    gets: ['Everything in Product Sprint', 'Mobile and/or web app engineering', 'Backend, payments and identity checks', 'Testing, release and handover'], service: '/services/mvp-development/' },
  { key: 'website', name: 'Website', from: 1500, unit: '', weeks: '2–4 weeks', for: 'Companies that need a fast, credible site that brings in leads.',
    gets: ['Messaging and page plan', 'Custom design, phone first', 'Fast build with search foundations', 'Working forms and analytics-ready'], service: '/services/web-design-development/' },
  { key: 'brand', name: 'Brand Identity', from: 1500, unit: '', weeks: '2–3 weeks', for: 'New ventures that need to look as credible as they are.',
    gets: ['Logo and visual identity', 'Colour, type and voice', 'Brand guidelines', 'Launch and social templates'], service: '/services/brand-identity/' },
  { key: 'deck', name: 'Pitch Deck', from: 800, unit: '', weeks: '1–2 weeks', for: 'Founders preparing to raise.',
    gets: ['Story and structure', 'Designed deck', 'Product visuals', 'One-pager'], service: '/services/pitch-deck-design/' },
  { key: 'lead', name: 'Fractional Product Lead', from: 2000, unit: '/month', weeks: 'Monthly, 3-month minimum', for: 'Funded teams without a senior product person yet.',
    gets: ['Roadmap and priorities', 'Design and engineering oversight', 'Weekly product rituals', 'Hiring support'], service: '/services/fractional-product-leadership/' }
];
export const usd = (n) => '$' + n.toLocaleString('en-US');
