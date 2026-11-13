// Insights articles. Newest first. `body` is trusted HTML written by the studio.
// Keep claims practical and checkable; link to primary sources for any fact that can change (fees, regulations).
export const ARTICLES = [
  {
    slug: 'ndpa-2023-for-product-teams',
    title: 'What Nigeria’s Data Protection Act means for your product',
    seoTitle: 'Nigeria’s Data Protection Act for product teams',
    description: 'A product team’s guide to the NDPA 2023: lawful bases, consent, breach reporting within 72 hours and the design decisions that make compliance easier.',
    date: '2026-11-13', topic: 'Product strategy',
    sources: [
      ['KPMG Nigeria: Nigeria Data Protection Act 2023 review', 'https://assets.kpmg.com/content/dam/kpmg/ng/pdf/nigeria-data-protection-act2023_kpmg-review.pdf'],
      ['Afriwise: Data breach obligations under the NDPA 2023', 'https://www.afriwise.com/blog/data-breaches-compliance-obligations-under-the-nigerian-data-protection-act-2023']
    ],
    body: `
<p>The Nigeria Data Protection Act 2023 (NDPA) applies to almost every digital product that serves Nigerians. Most founders meet it late, when a partner bank or investor asks about compliance. It is far cheaper to design for it from the first sprint. This is a product team’s view, not legal advice; your lawyer should confirm how it applies to you.</p>
<h2>Know your lawful basis for every piece of data</h2>
<p>The Act lets you process personal data on a set of lawful bases, including consent, a contract with the person, legal obligations and, newly, legitimate interest. Legitimate interest does not apply where it would override the person’s rights or where they would not reasonably expect the processing. In practice: list every field your product collects, why, and on which basis. Fields with no clear reason should go.</p>
<h2>Design consent that holds up</h2>
<p>Where you rely on consent, especially for sensitive data, it has to be for a specific purpose and can be withdrawn. Bundled checkboxes and pre-ticked boxes make that hard to prove, and the burden of proof sits with you. Separate optional consents (marketing, analytics) from what the product needs to work, and make withdrawing as easy as giving.</p>
<h2>Plan for a breach before you have one</h2>
<p>Under section 40, a reportable breach must be notified to the Nigeria Data Protection Commission within 72 hours of becoming aware of it. Where it is likely to cause high risk to people, they must be told immediately, with steps they can take to protect themselves. That timeline is only realistic if logging, alerting and a written response plan exist before launch.</p>
<h2>Check whether you are of “major importance”</h2>
<p>Organisations whose data processing is of significant value to the economy, society or security of Nigeria are classed as data controllers or processors of major importance, with registration duties. Fintech, health and identity products should check early. Fines for non-compliance can reach the greater of ₦10 million or 2% of the previous year’s revenue for organisations of major importance.</p>
<h2>Transfers outside Nigeria need a recorded basis</h2>
<p>Many products run on cloud services hosted abroad. The Act allows cross-border transfers on set conditions, and you must record the basis you rely on. Keep a simple register of every vendor that touches personal data, where it stores it and why.</p>
<h2>Turn the Act into product decisions</h2>
<ul>
<li>Collect less: every field you don’t store is one you can’t leak.</li>
<li>Give people controls: download, correct and delete their data from settings.</li>
<li>Write a privacy notice in plain language, and keep it in step with the product.</li>
<li>Build an audit trail for consent and for access to sensitive records.</li>
</ul>
<p>We design these patterns into the products we build, from onboarding to settings. See our <a href="/fintech/">fintech work</a> or <a href="/start-a-project/">tell us about your product</a>.</p>`
  },
  {
    slug: 'performance-budgets-for-african-users',
    title: 'Performance budgets: building fast products for African users',
    seoTitle: 'Performance budgets for African users',
    description: 'Why speed is a product feature in markets with costly data and mid-range phones, and how to set and keep a performance budget using Core Web Vitals.',
    date: '2026-11-13', topic: 'Engineering',
    sources: [
      ['Core Web Vitals thresholds explained (CoreWebVitals.io)', 'https://corewebvitals.io/core-web-vitals']
    ],
    body: `
<p>A slow product isn’t only frustrating. Where mobile data is expensive and many people use mid-range Android phones, every extra megabyte and second costs customers money and patience. Speed is a feature, and like any feature it needs an owner and a target.</p>
<h2>Start from Google’s Core Web Vitals</h2>
<p>Core Web Vitals give a shared language for “fast”. A page is considered good when Largest Contentful Paint (when the main content appears) is 2.5 seconds or less, Interaction to Next Paint (how quickly it responds to taps) is 200 milliseconds or less, and Cumulative Layout Shift (how much things jump around) is 0.1 or less. Google assesses these at the 75th percentile of real visits, so the slower phones in your audience count.</p>
<h2>Set a budget before you design</h2>
<p>A performance budget is a limit the team agrees not to cross, such as total page weight, JavaScript size or time to first content on a mid-range phone over a slow connection. Agreeing it before design keeps heavy hero videos and oversized libraries from sneaking in.</p>
<h2>Where the weight usually comes from</h2>
<ul>
<li><b>Images:</b> serve modern formats such as WebP or AVIF at the size they are shown, and lazy-load anything below the fold.</li>
<li><b>JavaScript:</b> every library is downloaded, parsed and run on the phone. Ship less, and load features only when they are needed.</li>
<li><b>Fonts:</b> host them yourself, subset them and limit the number of weights.</li>
<li><b>Third-party scripts:</b> chat widgets, trackers and embeds are often the heaviest things on a page.</li>
</ul>
<h2>Test like your customers</h2>
<p>Use throttled network and CPU settings in your browser tools, and test on a real mid-range Android phone. Lab tools such as Lighthouse help you find problems; real-user data tells you whether you fixed them.</p>
<h2>Make it part of shipping</h2>
<p>Check the budget in code review and in your release checklist, and treat a regression like any other bug. This website, for example, is built to load its main content in under two seconds on a mobile connection.</p>
<p>Want a fast product from day one? See our <a href="/services/product-engineering/">product engineering</a> service.</p>`
  },
  {
    slug: 'ux-writing-for-money-apps',
    title: 'UX writing for money apps: words that build trust',
    description: 'How the words in a fintech app decide whether people feel safe: confirmations, errors, fees and the moments that matter most.',
    date: '2026-11-13', topic: 'Product design',
    body: `
<p>In a money app, words do much of the work that a teller once did. They reassure, explain and warn. Good interface writing makes people feel in control; vague or clever writing makes them anxious, and anxious customers call support or leave.</p>
<h2>Say exactly what will happen</h2>
<p>A button should name the action and, where money moves, the amount: “Send ₦25,000” is better than “Continue”. Before anything irreversible, show a short summary of who, what and how much.</p>
<h2>Never hide fees</h2>
<p>Show fees before the customer confirms, not on the receipt. A line such as “Fee: ₦50. Total: ₦25,050” prevents more complaints than any support script.</p>
<h2>Write errors that help</h2>
<p>Every error should say what happened and what to do next, in plain words. “Your bank didn’t respond. Your money hasn’t left your account. Try again in a few minutes” is better than “Transaction failed (code 91)”.</p>
<h2>Be honest about pending states</h2>
<p>When a transfer is processing, say so, and say what the customer can expect: “This usually takes under a minute. We’ll notify you when it arrives.” Silence in that moment is when trust breaks.</p>
<h2>Match the tone to the moment</h2>
<p>A playful tone can work for celebrations and rewards; Zengly’s Vaniti feature leans into the joy of spraying money at a party. The same voice in an error or a security alert feels careless. Calm and clear wins whenever money is at risk.</p>
<h2>Keep a shared vocabulary</h2>
<p>Pick one word for each thing and use it everywhere: “wallet” or “account”, “send” or “transfer”. Mixed terms make people wonder whether two things are different.</p>
<p>We write interface copy as part of our <a href="/services/product-design/">product design</a> work. Read more in <a href="/insights/fintech-design-for-real-conditions/">designing fintech for real conditions</a>.</p>`
  },
  {
    slug: 'write-a-product-brief',
    title: 'How to write a product brief a studio can quote accurately',
    seoTitle: 'How to write a product brief for an accurate quote',
    description: 'What to include in a product brief so a design and development studio can give you a realistic scope, timeline and price the first time.',
    date: '2026-11-13', topic: 'Product strategy',
    body: `
<p>The quality of a quote depends on the quality of the brief. A one-line idea gets a wide guess; a clear brief gets a scope and price you can plan around. You don’t need a long document, just answers to the questions every studio will ask.</p>
<h2>1. The problem and who has it</h2>
<p>Describe the customer and the problem in a few sentences. Who are they, what do they do today, and why is that painful? This shapes everything else.</p>
<h2>2. What success looks like</h2>
<p>Name the outcome for the first version: a pilot with a partner, a number of active users, a working demo for investors. Studios scope differently for each.</p>
<h2>3. The core journey</h2>
<p>List the main steps a customer takes, from signing up to getting value. Then list the features you think you need, and mark which are essential for launch and which can wait.</p>
<h2>4. Platforms and integrations</h2>
<p>Web, iOS, Android or all three? Which services must it connect to, such as payments, identity checks, maps or messaging? Integrations often decide the timeline.</p>
<h2>5. What already exists</h2>
<p>Share anything you have: sketches, designs, an existing app, brand guidelines, research or competitors you admire. Starting points save time and money.</p>
<h2>6. Timeline and budget range</h2>
<p>Give a real deadline if there is one, and a budget range, even a rough one. It isn’t a negotiating weakness; it lets the studio suggest the best plan for what you can spend, instead of a plan you can’t afford.</p>
<h2>7. Who decides</h2>
<p>Say who will make decisions and how quickly. Slow approvals stretch projects more than slow engineering does.</p>
<p>Our <a href="/start-a-project/">project form</a> walks you through these questions in three short steps, and the <a href="/mvp-planner/">MVP timeline planner</a> gives you an indicative timeline first. See <a href="/pricing/">starting prices</a> too.</p>`
  },
  {
    slug: 'scope-an-mvp-in-12-weeks',
    title: 'How to scope an MVP you can ship in 12 weeks',
    description: 'A practical method for cutting a product idea down to a first version that real customers can use within three months.',
    date: '2026-11-12', topic: 'Product strategy',
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
    seoTitle: 'Designing fintech apps for real phones and networks',
    description: 'What changes when you design money apps for the devices and networks your customers actually use, not the ones in the design studio.',
    date: '2026-11-12', topic: 'Product design',
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
    date: '2026-11-12', topic: 'Fundraising',
    body: `
<p>At pre-seed, investors are mostly backing the team and the problem. A prototype helps when it makes both more convincing: it shows that you understand the customer deeply, and that you can turn that understanding into something real.</p>
<h2>It shows the problem, not just the product</h2>
<p>Start the demo with the customer’s situation in one sentence, then show the moment the product solves it. A tour of every screen loses people. One clear journey, from problem to “that’s useful”, keeps them.</p>
<h2>It looks like a product, not a mood board</h2>
<p>Real content, real names, realistic numbers and a coherent design system make a prototype feel like a company. Placeholder text and empty boxes make it feel like an idea. You do not need every screen, but the ones you show should be finished.</p>
<h2>It is honest about what is real</h2>
<p>Say clearly what is a clickable prototype and what is working software. Investors see many demos; overstating progress is easy to spot and expensive to recover from. A well-labelled prototype plus a clear build plan is more credible than a fragile “live” product.</p>
<h2>It answers the obvious risks</h2>
<p>For a fintech product that usually means: how people sign up and verify, how money moves and through which providers, and what happens when something fails. A few designed screens for those moments show that you have thought about compliance and trust, not just the happy path.</p>
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
    date: '2026-11-12', topic: 'Engineering',
    sources: [['Paystack', 'https://paystack.com/'], ['Flutterwave', 'https://flutterwave.com/'], ['Monnify', 'https://monnify.com/']],
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

// Reading time is calculated from the text (about 200 words a minute), so it is always accurate.
for (const a of ARTICLES) a.minutes = Math.max(2, Math.round(a.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200));

export const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
