// Service content. Each entry renders /services/<slug>/.
// Keep claims factual: no prices, guaranteed timelines or outcomes.

export const PILLARS = [
  {
    key: 'understand', title: 'Understand the idea',
    text: 'Before anything is designed, we pressure-test the idea with you: who it is for, what problem it solves, what the first version must do and what can wait.',
    links: ['venture-strategy', 'fractional-product-leadership']
  },
  {
    key: 'design', title: 'Design the experience',
    text: 'Product flows, interfaces and a brand that fit together. Designed for how people in your market actually behave, then tested in a clickable prototype.',
    links: ['product-design', 'brand-identity']
  },
  {
    key: 'build', title: 'Build the product',
    text: 'Mobile apps, web apps and the systems behind them: payments, identity checks, data and AI features, engineered so the next team can keep going.',
    links: ['mvp-development', 'product-engineering', 'web-design-development']
  },
  {
    key: 'launch', title: 'Bring it to market',
    text: 'The website, the investor story and the launch plan, so the product has somewhere to land and a way to raise or sell.',
    links: ['pitch-deck-design', 'web-design-development']
  }
];

export const SERVICES = [
  {
    slug: 'product-design',
    name: 'Product design',
    nav: 'Product design',
    title: 'Product Design & UX/UI Design Studio in Lagos',
    description: 'UX research, user flows, UI design, prototypes and design systems for fintech, mobile and web products. Product design from Lynexa, Lagos.',
    lead: 'Research, flows, interfaces and design systems for products people pick up and understand, especially where money, trust and everyday habits are involved.',
    short: 'Research, UX flows, UI and design systems for mobile and web products.',
    problem: 'Most products do not fail because the idea was bad. They fail because the first screens confuse people, the key action takes too long, or nobody trusts the app with their money.',
    includes: [
      ['User and market research', 'Interviews, competitor teardown and a clear picture of how your customers handle the problem today.'],
      ['Flows and information architecture', 'Every path through the product mapped, including the awkward ones: failed payments, pending verification, empty states.'],
      ['Interface design', 'High-fidelity screens for iOS, Android and web, designed in Figma with real content, not lorem ipsum.'],
      ['Design systems', 'Tokens, components and usage rules so the product stays consistent as it grows and as new designers join.'],
      ['Prototyping and testing', 'Clickable prototypes you can put in front of users and investors before a line of code is written.'],
      ['Developer handoff', 'Annotated specs, states and motion notes your engineers can build from without guessing.']
    ],
    deliverables: ['Research summary and product principles', 'User flows covering happy and failure paths', 'High-fidelity UI in Figma', 'Component library and design tokens', 'Clickable prototype', 'Handoff specification for engineering'],
    work: ['zengly'],
    fitYes: ['You are building a consumer app, fintech product or internal tool and want it to feel considered', 'You have engineers but no senior product designer', 'You need a prototype to test with users or show investors'],
    fitNo: ['You only need a logo or social graphics', 'You need final screens within a few days with no time for flows'],
    faqs: [
      ['Do you design in Figma?', 'Yes. You receive the Figma files, including components and prototypes, as part of the handoff.'],
      ['Can you work with our existing developers?', 'Yes. We regularly hand designs to in-house teams and stay available during the build to answer questions and review what gets implemented.'],
      ['Do you design for both iOS and Android?', 'Yes. We design one coherent product and adapt the patterns where each platform expects something different.']
    ]
  },
  {
    slug: 'mvp-development',
    name: 'MVP design and development',
    nav: 'MVP development',
    title: 'MVP Design & Development for Startups',
    description: 'Lynexa scopes, designs and builds first versions of mobile and web products for founders: Flutter, React and Next.js, with payments and identity checks integrated.',
    lead: 'A first version that real customers can use: scoped tightly, designed properly and built on foundations you will not have to throw away.',
    short: 'Scoped, designed and engineered first versions of mobile and web products.',
    problem: 'Founders often get stuck between a pitch deck and a product. The deck promises too much, the build tries to do everything, and the money runs out before anyone outside the team has used it.',
    includes: [
      ['Scope definition', 'We agree on the smallest product that proves the idea, and write down what is deliberately left out.'],
      ['Product and interface design', 'Flows and screens for the MVP, with a design system that can carry later versions.'],
      ['Mobile and web engineering', 'Cross-platform mobile apps in Flutter or React Native; web apps in React and Next.js; backends in Node.js or Python.'],
      ['Payments and verification', 'Integration with providers such as Paystack, Flutterwave and Mono, plus BVN/NIN identity checks where the product needs them.'],
      ['Testing and release', 'QA across devices, staged releases, app store submission support and monitoring once it is live.'],
      ['Handover', 'Repositories, documentation and design files transferred so your future team can take over.']
    ],
    deliverables: ['Written MVP scope and release plan', 'Designed and tested product flows', 'Working mobile and/or web application', 'Backend, database and integrations', 'Deployment and monitoring setup', 'Code, documentation and design files'],
    work: ['zengly', 'swiftly'],
    fitYes: ['You have a validated problem and a clear first customer', 'You need design and engineering from one accountable team', 'You want to show investors a working product rather than slides'],
    fitNo: ['You want every feature on the roadmap in version one', 'You are still deciding what problem to solve (start with venture strategy instead)'],
    faqs: [
      ['How long does an MVP take?', 'It depends on scope, integrations and how fast decisions get made. We give you a timeline in the written scope after discovery, not before we understand the product.'],
      ['Who owns the code?', 'You do. Repositories, design files and documentation created for your project are transferred to you as set out in our agreement.'],
      ['Which technology will you use?', 'We choose based on your product and team. Our usual choices are Flutter or React Native for mobile, React and Next.js for web, and Node.js or Python for backends.']
    ]
  },
  {
    slug: 'web-design-development',
    name: 'Web design and development',
    nav: 'Websites',
    title: 'Website Design & Development for Startups and Businesses',
    description: 'Marketing sites, product sites and landing pages designed and engineered by Lynexa in Lagos: fast, accessible, search-friendly and built to convert.',
    lead: 'Marketing sites, product sites and landing pages that explain what you do in seconds and make the next step obvious.',
    short: 'Fast, accessible marketing and product websites built to convert.',
    problem: 'Your website is usually the first product a customer or investor touches. A slow, vague or broken site quietly undoes the credibility the rest of the business has earned.',
    includes: [
      ['Messaging and structure', 'What the site needs to say, in what order, for each audience: customers, partners, investors.'],
      ['Visual and interaction design', 'Layouts, type and motion designed for your brand, desktop and mobile treated as equals.'],
      ['Front-end engineering', 'Hand-built static sites, Next.js or React, depending on what the site needs to do and who will maintain it.'],
      ['Performance and accessibility', 'Optimised images and fonts, minimal JavaScript, semantic markup and WCAG-minded contrast and focus states.'],
      ['Search foundations', 'Clean URLs, metadata, structured data, sitemaps and redirects from any old pages.'],
      ['Forms and launch', 'Working lead capture, analytics if you want it, domain and hosting set up on Netlify, Vercel or your stack.']
    ],
    deliverables: ['Sitemap and page-by-page messaging', 'Desktop and mobile designs', 'Production website deployed to your domain', 'Working enquiry forms', 'SEO metadata, sitemap and redirects', 'Editing and maintenance notes'],
    work: ['zengly'],
    fitYes: ['You are launching, raising or rebranding and the current site no longer fits', 'You need a product site that explains something complex simply', 'You care about speed and how the site works on a phone'],
    fitNo: ['You need a large e-commerce catalogue (we will point you to a specialist platform)'],
    faqs: [
      ['Can we edit the site ourselves?', 'Yes. Depending on your needs we can build on a CMS or keep content in simple files with clear editing notes. We agree this before the build starts.'],
      ['Do you write the copy?', 'We shape the messaging and write or edit copy with you. You remain the final word on what your business says.'],
      ['Where will the site be hosted?', 'Usually Netlify or Vercel, which are fast and low-cost to run. If you already have hosting we can deploy there.']
    ]
  },
  {
    slug: 'brand-identity',
    name: 'Brand identity and design systems',
    nav: 'Brand identity',
    title: 'Brand Identity & Design Systems for Startups',
    description: 'Naming support, logo, colour, type, voice and brand guidelines from Lynexa: identities designed to work inside the product, not only on a poster.',
    lead: 'Identities that work where your customers actually meet you: on a phone screen, in a notification, on a payment confirmation.',
    short: 'Marks, colour, type, voice and guidelines that work inside the product.',
    problem: 'Many young brands are designed for a launch poster, then fall apart inside the app: colours fail contrast, the logo does not fit an icon, and every new screen invents its own style.',
    includes: [
      ['Positioning and voice', 'What you stand for, who you are talking to and how you sound, written down so everyone uses the same words.'],
      ['Logo and mark', 'A primary logo, app icon and small-size marks that hold up at 16 pixels and on a billboard.'],
      ['Colour and typography', 'A palette tested for accessibility on light and dark surfaces, with type choices for product and marketing.'],
      ['Brand in the product', 'How the brand shows up in the interface: illustration, motion, empty states and moments of delight.'],
      ['Guidelines', 'A practical guide your team and partners can follow without calling you every time.']
    ],
    deliverables: ['Brand positioning and voice notes', 'Logo suite and app icon', 'Colour and type system with accessibility checks', 'Product UI brand tokens', 'Brand guidelines document', 'Source files and exports'],
    work: ['zengly'],
    fitYes: ['You are launching a new product or company', 'Your product and marketing look like two different companies', 'You need a brand that investors and regulated partners take seriously'],
    fitNo: ['You need a one-off flyer or social post'],
    faqs: [
      ['Do you help with naming?', 'We can support naming as part of positioning work. Trademark searches and legal clearance should be done with a qualified lawyer.'],
      ['Will the brand work in our app?', 'That is the point of how we work. Every identity is tested on real product screens before it is finalised.']
    ]
  },
  {
    slug: 'product-engineering',
    name: 'Product engineering and integrations',
    nav: 'Product engineering',
    title: 'Product Engineering, API Integration & AI Features',
    description: 'Backend systems, API integrations, payment rails, identity verification and AI-powered features for products that have outgrown their first version.',
    lead: 'For products that already exist and need to grow up: new features, payment and identity integrations, AI capabilities and the backend to support them.',
    short: 'Backends, APIs, payment and identity integrations, and AI features.',
    problem: 'After launch, products slow down. Features take longer, integrations are bolted on, and nobody is sure the system will hold up when usage grows.',
    includes: [
      ['Architecture review', 'An honest look at your current codebase, data model and infrastructure, with a prioritised plan.'],
      ['API and payment integrations', 'Connecting payment providers, banking APIs, identity checks and third-party services reliably, with failure states handled.'],
      ['AI-powered features', 'Practical uses of language models and automation inside your product, designed with clear limits and human fallback.'],
      ['Feature development', 'New capabilities designed and engineered by the same team, so what ships matches what was designed.'],
      ['Reliability and maintenance', 'Monitoring, error handling, performance work and ongoing support after release.']
    ],
    deliverables: ['Architecture and risk assessment', 'Integration designs and implementation', 'Shipped features with tests', 'Monitoring and alerting setup', 'Technical documentation'],
    work: ['zengly'],
    fitYes: ['You have a live or nearly-live product that needs new capability', 'You are integrating money movement or identity verification', 'You want to add AI features without creating new risks'],
    fitNo: ['You need a hardware or embedded systems team'],
    faqs: [
      ['Can you work in our existing codebase?', 'Yes. We start with a review so we understand the code before changing it, and we follow your conventions unless there is a good reason not to.'],
      ['How do you approach AI features?', 'We start with the user problem, not the model. We design what happens when the AI is wrong, keep sensitive data protected and make costs visible before scaling.']
    ]
  },
  {
    slug: 'venture-strategy',
    name: 'Product strategy and venture building',
    nav: 'Venture strategy',
    title: 'Product Strategy, Discovery & Venture Building',
    description: 'Discovery sprints, market research, positioning and product roadmaps for founders shaping a new venture. Product strategy from Lynexa, Lagos.',
    lead: 'For founders with an idea and a lot of open questions. We help you decide what to build first, for whom, and how it could become a business.',
    short: 'Discovery, positioning, roadmaps and venture shaping for new ideas.',
    problem: 'Ideas usually arrive as a solution in search of a clear problem. Building straight away spends money on assumptions nobody has tested.',
    includes: [
      ['Discovery workshops', 'Structured sessions to unpack the idea, the customer, the market and the risks.'],
      ['Market and competitor research', 'Who else is solving this, how customers cope today, and where the opening really is.'],
      ['Positioning', 'A sharp statement of who it is for, what it does and why it beats the alternatives.'],
      ['Product roadmap', 'The first version defined tightly, with later phases sequenced by evidence rather than enthusiasm.'],
      ['Business model framing', 'How the product could make money, what it costs to run and what needs to be true for it to work.']
    ],
    deliverables: ['Discovery brief', 'Customer and market summary', 'Positioning statement', 'MVP scope and phased roadmap', 'Key assumptions and how to test them'],
    work: ['swiftly', 'zengly'],
    fitYes: ['You have an idea and want to test it before committing to a full build', 'You are a business exploring a new digital product line', 'You need a clear plan to share with co-founders or investors'],
    fitNo: ['You have already validated the idea and need it built now (see MVP development)'],
    faqs: [
      ['Is this the same as the venture partnership model?', 'No. This is a paid strategy engagement. Venture partnerships are a separate, selective arrangement described on our <a href="/ventures/">ventures page</a>.'],
      ['Will you sign an NDA?', 'Yes. We are happy to sign a mutual NDA before you share sensitive details.']
    ]
  },
  {
    slug: 'pitch-deck-design',
    name: 'Investor pitch materials',
    nav: 'Pitch decks',
    title: 'Investor Pitch Deck Design for Startups',
    description: 'Pitch decks, one-pagers and product demo visuals that explain your startup clearly to investors. Narrative and design support from Lynexa.',
    lead: 'Decks, one-pagers and product visuals that make your story easy to follow and your product easy to believe.',
    short: 'Pitch decks, one-pagers and demo visuals for fundraising.',
    problem: 'Investors read a lot of decks quickly. A good business can lose attention to a confusing narrative, unreadable charts or product screenshots that look unfinished.',
    includes: [
      ['Narrative structure', 'Problem, insight, product, market, traction and ask, ordered so each slide earns the next.'],
      ['Slide design', 'A clean, branded deck with readable charts and real product visuals.'],
      ['Financial model visuals', 'Clear presentation of the numbers you provide. We design the visual layer; the figures remain yours.'],
      ['One-pager and demo assets', 'A short leave-behind and product walkthrough visuals or video.'],
      ['Rehearsal support', 'Feedback on how the story lands when you present it.']
    ],
    deliverables: ['Pitch deck (presenting and sending versions)', 'Investor one-pager', 'Product mockups for the deck', 'Editable source files'],
    work: ['zengly'],
    fitYes: ['You are preparing for a pre-seed or seed raise', 'Your product is strong but the story is not landing', 'You need product visuals before the product is finished'],
    fitNo: ['You need financial advice or a valuation (talk to a qualified adviser)'],
    faqs: [
      ['Do you help us raise money?', 'We help you tell the story clearly. We are not a broker or financial adviser and we do not guarantee investment.'],
      ['Can you design product screens for the deck before the product exists?', 'Yes, as long as they are clearly presented as designs or prototypes rather than a live product.']
    ]
  },
  {
    slug: 'fractional-product-leadership',
    name: 'Fractional product leadership',
    nav: 'Product leadership',
    title: 'Fractional Product & Design Leadership',
    description: 'Senior product and design leadership on a part-time basis: design reviews, roadmap decisions, team coaching and architecture input for early-stage teams.',
    lead: 'Senior product and design judgement, part-time, for teams that need leadership before they are ready to hire it full-time.',
    short: 'Part-time senior product and design leadership for growing teams.',
    problem: 'Early teams often have strong builders but nobody whose job is to say no, keep the product coherent and make the hard trade-offs before they become expensive.',
    includes: [
      ['Product direction', 'Roadmap reviews, prioritisation and decision-making alongside the founders.'],
      ['Design leadership', 'Regular design critiques, design system stewardship and quality bar for what ships.'],
      ['Team coaching', 'Support for junior designers and product managers, and help shaping future hires.'],
      ['Technical input', 'A product view on architecture decisions, vendors and integrations.']
    ],
    deliverables: ['Agreed cadence of reviews and workshops', 'Roadmap and prioritisation notes', 'Design quality reviews', 'Hiring support materials'],
    work: [],
    fitYes: ['You have recently raised and are growing the team', 'Your designers or PMs need senior support', 'The product is drifting and needs a single point of view'],
    fitNo: ['You need full-time, on-site staff (we can help you hire instead)'],
    faqs: [
      ['How much time is involved?', 'We agree a regular cadence that fits your stage, and review it together as needs change.'],
      ['Is this remote?', 'Mostly. We are based in Lagos and work with teams across time zones, with in-person sessions in Lagos where useful.']
    ]
  }
];

// Smaller capabilities shown on /services without their own page.
export const ALSO = [
  ['Mobile app development', 'Flutter and React Native apps for iOS and Android, from first build to app store release.', '/services/mvp-development/'],
  ['AI-powered products', 'Assistants, automation and smart features designed with clear limits and human fallback.', '/services/product-engineering/'],
  ['Maintenance and optimisation', 'Monitoring, fixes, performance and steady improvement once your product is live.', '/services/product-engineering/'],
  ['Venture partnerships', 'Selective arrangements for founders where Lynexa contributes more than delivery.', '/ventures/']
];

export const svcBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
