// Insights articles. Newest first. `body` is trusted HTML written by the studio.
// Keep claims practical and checkable; link to primary sources for any fact that can change (fees, regulations).
export const ARTICLES = [
  {
    slug: 'scope-an-mvp-in-12-weeks',
    title: 'How to scope an MVP you can ship in 12 weeks',
    description: 'A practical method for cutting a product idea down to a first version that real customers can use within three months.',
    date: '2026-11-12', minutes: 6, topic: 'Product strategy',
    body: `
<p>Most first products that run late were not built slowly. They were scoped badly. The team agreed to build everything the pitch deck promised, and every week of building revealed another feature that “had to” be in version one.</p>
<p>Twelve weeks is long enough to design, build and release a focused product, and short enough to keep a founder honest. Here is the method we use to get there.</p>
<h2>1. Write the problem as one sentence a customer would say</h2>
<p>Not “a platform for financial inclusion”, but “splitting a bill with friends shouldn’t take a spreadsheet and three reminders.” If you cannot write the sentence, you are not ready to scope. If you can, every feature now has a test: does it help solve that sentence?</p>
<h2>2. Name the first customer, not the market</h2>
<p>“Young Nigerians” is a market. “Students in Lagos who pay for shared flats and group outings” is a first customer. The narrower the first customer, the fewer features you need, because you only have to serve their situation well.</p>
<h2>3. Map the one journey that matters</h2>
<p>Draw the steps your first customer takes from opening the product to getting value: sign up, verify, do the core thing, see the result. That journey is your MVP. Everything that is not on it goes onto a list called “later”, and the list is written down, so nobody has to fight for it in a meeting.</p>
<h2>4. Cut with three questions</h2>
<ul>
<li><b>Can it be manual for now?</b> Admin dashboards, reports and many back-office tasks can be done by a person for the first hundred users.</li>
<li><b>Can a provider do it?</b> Payments, identity checks, messaging and email are solved problems. Integrate; do not build.</li>
<li><b>Will a user notice if it is missing in month one?</b> If not, it waits.</li>
</ul>
<h2>5. Design the unhappy paths early</h2>
<p>A failed payment, a slow network, a wrong OTP, an expired session. These are not edge cases in markets with patchy connectivity; they are daily life. Scoping them in from the start is cheaper than discovering them in the app store reviews.</p>
<h2>6. Split the 12 weeks honestly</h2>
<p>A typical shape: one to two weeks of discovery and scope, two to three weeks of design and a clickable prototype, six to seven weeks of engineering in short cycles with a demo at each step, and a week for testing and release. App store review adds time for mobile apps, so plan the release window, not just the build.</p>
<h2>7. Decide what “done” means before you start</h2>
<p>Write down the signal that tells you version one worked: a number of active users, completed transactions, a pilot partner signed. A scope without a success measure keeps growing, because there is never a reason to stop.</p>
<p>If you want a quick sense of timing for your own idea, try our <a href="/mvp-planner/">MVP timeline planner</a>. It is indicative, not a quote, but it is a useful start for the conversation.</p>`
  },
  {
    slug: 'fintech-design-for-real-conditions',
    title: 'Designing fintech apps for mid-range Android phones and patchy networks',
    description: 'What changes when you design money apps for the devices and networks your customers actually use, not the ones in the design studio.',
    date: '2026-11-12', minutes: 7, topic: 'Product design',
    body: `
<p>Most fintech design is reviewed on a new phone, on office Wi-Fi, by people who already trust the product. Most customers will use it on a two-year-old Android phone, on mobile data that drops in a moving bus, for money they cannot afford to lose. Designing for the second situation is what separates a product people tolerate from one they trust.</p>
<h2>Assume the network will fail mid-transaction</h2>
<p>The most anxious moment in any money app is the gap between pressing “Send” and seeing confirmation. If the connection drops there, the customer does not know whether the money left. Design that moment explicitly:</p>
<ul>
<li>Show a clear pending state, not a spinner that never ends.</li>
<li>Make transactions safe to retry, so a second tap never sends twice.</li>
<li>When the app reconnects, tell the customer what actually happened, in plain words.</li>
</ul>
<h2>Respect data and storage</h2>
<p>Large app downloads and heavy screens cost customers money. Keep the install small, load images only when needed, and avoid autoplaying video. A balance screen should appear quickly even when the rest of the content is still loading.</p>
<h2>Design every failure screen</h2>
<p>Wrong PIN, expired OTP, failed verification, provider downtime, insufficient balance. Each one needs its own message that says what happened and what to do next. “Something went wrong” makes people call customer service, or leave.</p>
<h2>Make security visible, not scary</h2>
<p>Let people hide their balance in public. Explain why identity checks are needed in terms of what they unlock, such as higher limits, not as hurdles. Confirm sensitive actions with a short summary of who, what and how much, before the PIN.</p>
<h2>Build trust in small moments</h2>
<p>Clear receipts that can be shared on WhatsApp, recognisable bank names and logos, and transaction history that matches the bank statement all do more for trust than a security badge on the home screen.</p>
<h2>Test where your customers are</h2>
<p>Test on a mid-range Android phone with a throttled connection, outdoors, in one hand. Test with first-time users, not your team. You will find more in one afternoon of that than in a week of design reviews.</p>
<p>These principles shaped our work on <a href="/work/zengly/">Zengly</a>, a social-finance app launching in December 2026. If you are building a money product, <a href="/start-a-project/">tell us about it</a>.</p>`
  },
  {
    slug: 'what-investors-want-in-a-prototype',
    title: 'What early investors look for in a product prototype',
    description: 'A prototype will not raise money on its own, but a good one answers the questions investors ask first. Here is how to make yours do that.',
    date: '2026-11-12', minutes: 5, topic: 'Fundraising',
    body: `
<p>At pre-seed, investors are mostly backing the team and the problem. A prototype helps when it makes both more convincing: it shows that you understand the customer deeply, and that you can turn that understanding into something real.</p>
<h2>It shows the problem, not just the product</h2>
<p>Start the demo with the customer’s situation in one sentence, then show the moment the product solves it. A tour of every screen loses people. One clear journey, from problem to “that’s useful”, keeps them.</p>
<h2>It looks like a product, not a mood board</h2>
<p>Real content, real names, realistic numbers and a coherent design system make a prototype feel like a company. Lorem ipsum and placeholder boxes make it feel like an idea. You do not need every screen, but the ones you show should be finished.</p>
<h2>It is honest about what is real</h2>
<p>Say clearly what is a clickable prototype and what is working software. Investors see many demos; overstating progress is easy to spot and expensive to recover from. A well-labelled prototype plus a clear build plan is more credible than a fragile “live” product.</p>
<h2>It answers the obvious risks</h2>
<p>For a fintech product that usually means: how people sign up and verify, how money moves and through which providers, and what happens when something fails. A few designed screens for those moments show that you have thought about regulation and trust, not just the happy path.</p>
<h2>It comes with evidence</h2>
<p>A prototype becomes much stronger with what you learned from it: how many target customers tested it, what they tried to do, and what you changed as a result. Even ten honest conversations beat none.</p>
<h2>It fits in the deck</h2>
<p>Use two or three screens in your pitch deck, keep a link to the clickable version ready, and record a short video walkthrough for investors who review decks on their phones.</p>
<p>We design prototypes and investor materials together, so the story and the product say the same thing. See <a href="/services/pitch-deck-design/">pitch deck design</a> or our <a href="/pricing/">Product Sprint</a>.</p>`
  },
  {
    slug: 'choosing-a-payment-provider-nigeria',
    title: 'Choosing a payment provider for your Nigerian MVP',
    description: 'The questions to ask before you integrate Paystack, Flutterwave, Monnify or another provider, so your first version does not paint you into a corner.',
    date: '2026-11-12', minutes: 6, topic: 'Engineering',
    body: `
<p>For most Nigerian products, taking payments means choosing a provider such as <a href="https://paystack.com/" rel="noopener noreferrer">Paystack</a>, <a href="https://flutterwave.com/" rel="noopener noreferrer">Flutterwave</a> or <a href="https://monnify.com/" rel="noopener noreferrer">Monnify</a>. All of them can take card and bank transfer payments. The differences that matter show up later, so it pays to ask the right questions before you write any code.</p>
<h2>What payment methods do your customers actually use?</h2>
<p>Cards, bank transfers, USSD and dedicated virtual accounts behave very differently. If your customers mostly pay by transfer, check how each provider handles transfer payments and how quickly they are confirmed.</p>
<h2>Do you need to pay out, not just collect?</h2>
<p>Marketplaces, savings and split-payment products need transfers to many recipients, sometimes automatically. Payout features, limits and approval processes vary, so check them against your product’s main journey.</p>
<h2>What does settlement look like?</h2>
<p>Ask when collected money reaches your account and on which days. Settlement timing affects your cash flow, and for some products, your customer promise.</p>
<h2>What will compliance require of you?</h2>
<p>Each provider has onboarding and verification requirements for your business, and some products, such as wallets or anything that holds customer funds, can need licences or a licensed partner. Get advice early; it can change your architecture.</p>
<h2>How good is the developer experience?</h2>
<p>A reliable test mode, clear webhook events, idempotent requests and responsive support save weeks. Read the API documentation before you decide, not after.</p>
<h2>What does it cost at your expected volume?</h2>
<p>Fees and caps change, so check each provider’s current pricing page rather than a blog post, and model them against your expected transaction sizes.</p>
<h2>Build so you can switch</h2>
<p>Whichever you choose, keep payment logic behind your own small service on the server. Never trust a success message from the app alone: verify every payment server-side with the provider before giving value. Then, if you need to add or change providers later, the rest of your product does not have to change.</p>
<p>We integrate payments and identity checks as part of <a href="/services/product-engineering/">product engineering</a>. If you are deciding now, <a href="/start-a-project/">we are happy to talk it through</a>.</p>`
  }
];

export const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
