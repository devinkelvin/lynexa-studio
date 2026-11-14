// Insights articles. Newest first. `body` is trusted HTML written by the studio.
// Keep claims practical and checkable; link to primary sources for any fact that can change (fees, regulations).
export const ARTICLES = [
  {
    slug: 'whatsapp-business-api-pricing',
    title: 'What WhatsApp Business messages cost your product in 2026',
    seoTitle: 'WhatsApp Business API pricing in 2026',
    description: 'How Meta now charges for WhatsApp Business Platform messages, what changed on 1 October 2026 and how to design your messaging so the bill stays predictable.',
    date: '2026-11-14', topic: 'Growth',
    sources: [
      ['Meta for Developers: Pricing on the WhatsApp Business Platform', 'https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing.md'],
      ['Zendesk: Announcing upcoming changes to WhatsApp Business messaging pricing', 'https://support.zendesk.com/hc/en-us/articles/11113277351322-Announcing-upcoming-changes-to-WhatsApp-Business-messaging-pricing'],
      ['Courier: WhatsApp pricing changes, October 1, 2026', 'https://www.courier.com/blog/whatsapp-pricing-changes-october-2026'],
      ['Techpoint Africa: WhatsApp will charge businesses per message, starting October 1', 'https://techpoint.africa/insight/techpoint-digest-1414/'],
      ['Legit.ng: Meta introduces per-message billing for WhatsApp Business users', 'https://www.legit.ng/business-economy/technology/1663021-meta-introduces-message-billing-whatsapp-business-users-drops-24-hour-flat-rate']
    ],
    body: `
<p>For many Nigerian products, WhatsApp is where customers actually read messages: order updates, OTPs, payment receipts and support replies. If you send those through the WhatsApp Business Platform (the API, not the free WhatsApp Business app), almost every message you send now has a price, and the rules changed twice in just over a year. Here is how the pricing works today and what it means for how you design your messaging.</p>
<h2>You pay per message, not per conversation</h2>
<p>Since 1 July 2025, Meta has charged per delivered message instead of per 24-hour conversation. Under the old model, one fee covered a whole conversation window; now each chargeable message is priced on its own. The price depends on two things: the category of the message and the country calling code of the recipient’s number. Nigeria (+234) has its own rate in Meta’s country list rather than sharing a regional price.</p>
<h2>The message categories</h2>
<p>Messages you start are sent as approved templates, and every template has a category:</p>
<ul>
<li><b>Marketing:</b> promotions, offers, re-engagement. Marketing templates are charged unless they fall inside a free Click to WhatsApp window (see below).</li>
<li><b>Utility:</b> updates linked to something the customer did, such as an order confirmation or a delivery update.</li>
<li><b>Authentication:</b> one-time passcodes for login or verification.</li>
</ul>
<p>You accept the charge for whatever category a template has at the time you send it, and Meta makes you responsible for reviewing that category. Check it on each template so a transactional message is not billed at a higher rate than you planned for.</p>
<h2>What changed on 1 October 2026</h2>
<p>When a customer messages you, a 24-hour customer service window opens. Until recently, free-form replies inside that window cost nothing, and from July 2025 utility templates sent inside it were free too. Zendesk and Courier both report that from 1 October 2026 Meta charges per message for non-template replies sent in the window, and for utility templates sent in it. Courier reports that these service messages are charged at the same rate your market pays for utility and authentication messages.</p>
<p>Some things stay free, according to the same sources: messages customers send to you, and replies to people who arrive through a Click to WhatsApp ad, which open a free 72-hour window. Marketing template pricing was not changed. When we checked, Meta’s main developer pricing page still described in-window replies as free, so confirm the current position with your messaging provider before you rely on either version.</p>
<h2>What it costs in Nigeria</h2>
<p>Meta publishes rate cards in US dollars and other currencies, not in naira, and it only changes prices on the first day of a quarter. In August 2026 Techpoint Africa put a utility message to a Nigerian number at about $0.0101 and a marketing message at about $0.062. Use those as a rough guide and take current figures from Meta’s rate card before you budget, since rates and exchange rates both move.</p>
<h2>How to keep the bill predictable</h2>
<ul>
<li><b>Count your messages per customer journey.</b> List every WhatsApp message a customer receives in a typical month, from OTP to receipt to support. Multiply by your expected users and the current rate. Support conversations now belong in that model.</li>
<li><b>Choose the channel per message.</b> In-app notifications and email cost you little to send. Keep WhatsApp for messages where reaching the customer quickly really matters.</li>
<li><b>Write replies that resolve, not chat.</b> Outside a Click to WhatsApp window, each support reply is now a chargeable message, so a clear answer in one message is cheaper than five short ones, and better for the customer.</li>
<li><b>Keep templates honestly categorised.</b> Keep promotional lines out of transactional templates, and check the category on each one before it goes live.</li>
<li><b>Watch the pricing calendar.</b> Meta gives at least a month’s notice of rate changes. Put a quarterly check in your finance calendar.</li>
<li><b>Know who bills you.</b> If you use a provider such as Twilio, Infobip or a local reseller, ask whether they pass Meta’s fees through at cost or add a margin.</li>
</ul>
<h2>Is it still worth it?</h2>
<p>For most products serving Nigerian customers, yes. A delivered, read WhatsApp message often does more than an SMS or email that is ignored. The change is that messaging is now a cost line to design around, not a free channel. Model it at the start, the same way you would model payment fees.</p>
<p>If you are planning a product’s notifications and support flows, <a href="/contact/">talk to us</a>.</p>`
},
  {
    slug: 'nigeria-startup-act-label',
    title: 'How to get a startup label under the Nigeria Startup Act',
    seoTitle: 'How to get a Nigeria Startup Act label',
    description: 'Who qualifies for a startup label under the Nigeria Startup Act 2022, how to apply, what you must report each year and how the 2025 tax reforms change the benefits.',
    date: '2026-11-13', topic: 'Business',
    sources: [
      ['Nigeria Startup Act 2022 (full text, PLAC)', 'https://placng.org/i/wp-content/uploads/2023/01/NIGERIA-STARTUP-ACT-2022.pdf'],
      ['Mondaq: Obtaining a startup label under the Nigeria Startup Act 2022', 'https://www.mondaq.com/nigeria/corporate-and-company-law/1703610/obtaining-a-startup-label-under-the-nigeria-startup-act-2022'],
      ['Nairametrics: FG opens portal to register startups across Nigeria', 'https://nairametrics.com/2023/11/22/startup-act-fg-opens-portal-to-register-startups-across-nigeria'],
      ['AO2LAW: The 2025 tax reform Acts and the Nigeria Startup Act', 'https://ao2law.com/the-2025-tax-reform-acts-and-the-nigeria-startup-act-reconciling-incentives-compliance-and-growth/'],
      ['PwC Nigeria: Nigerian tax reforms 2025, sectoral analysis', 'https://www.pwc.com/ng/en/assets/pdf/nigeria-tax-reform-insight-series-sectoral-analysis.pdf']
    ],
    body: `
<p>The Nigeria Startup Act 2022, signed on 19 October 2022, gives tech companies a formal status: the startup label. The Act’s incentives are tied to holding a label, so if you are building a digital product in Nigeria it is worth knowing whether you qualify and what holding a label commits you to. This is a practical summary, not legal or tax advice.</p>
<h2>What the label is</h2>
<p>A startup label is a digital certificate issued under the Act. The National Information Technology Development Agency (NITDA) serves as the Act’s Secretariat and manages the labelling process. Applications go through the Startup Support and Engagement Portal, which the government launched in November 2023 at startup.gov.ng. Once issued, the label is valid for 10 years.</p>
<h2>Who qualifies</h2>
<p>Under section 13, a company can be labelled if it:</p>
<ul>
<li>is a limited liability company registered under the Companies and Allied Matters Act, and has existed for no more than 10 years since incorporation;</li>
<li>has objects covering the innovation, development, production, improvement or commercialisation of a digital technology product or process;</li>
<li>holds a digital technology product or process, or owns registered software; and</li>
<li>has at least one-third of its shares held by one or more Nigerians as founder or co-founder.</li>
</ul>
<p>Sole proprietorships and partnerships that meet the other conditions can be given a six-month pre-label status, and lose it if they have not converted to a company in that time. A holding company or subsidiary of an existing company that is not itself registered as a startup is excluded.</p>
<h2>Check your paperwork before you apply</h2>
<p>The checks are mostly about your company records, so prepare them before applying:</p>
<ul>
<li>Read the objects in your company documents. If they don’t describe digital technology work, update them first.</li>
<li>Check your cap table. Nigerian founders or co-founders must hold at least a third of the shares, so model future funding rounds against that line.</li>
<li>Have evidence of the product: a live app, a repository, or software registration.</li>
<li>Gather the supporting documents the Secretariat prescribes on the portal at the time you apply.</li>
</ul>
<h2>What you must do once labelled</h2>
<p>The label comes with duties under section 16. You must comply with the laws that govern businesses in Nigeria and any obligations the Coordinator sets. Each year you must also report your headcount, total assets and annual turnover, keep proper books of account, and file a report on the incentives you received and what they helped you achieve. Any change to your structure, composition or objects must be reported to the Coordinator within one month. If you default, you have 30 days from being notified to put it right. Under section 17 the label is then withdrawn and the agencies or investors that gave you incentives are told. Put these dates in your finance calendar from day one.</p>
<h2>What the label can unlock</h2>
<p>The Act lists support that does not depend on tax law, including:</p>
<ul>
<li>fast-tracked applications, through the portal, to the Central Bank of Nigeria’s regulatory sandbox, the Securities and Exchange Commission’s regulatory incubation programmes and other regulators’ sandboxes, though you must still qualify for each;</li>
<li>a Startup Investment Seed Fund, managed by the Nigeria Sovereign Investment Authority, which the Act says should receive not less than ₦10 billion a year;</li>
<li>help with registering and protecting intellectual property, and a discount on fees for technology transfer registrations;</li>
<li>access to grants and loans from bodies such as the Bank of Industry, and training through the Industrial Training Fund.</li>
</ul>
<p>Whether each of these is running, and how much money is in it, varies over time, so ask the Secretariat rather than assuming.</p>
<h2>How the 2025 tax reforms change the picture</h2>
<p>The Act originally offered labelled startups an income tax exemption of up to five years and faster approval for pioneer status. The 2025 tax reform Acts, which law firm AO2LAW reports took effect on 1 January 2026, replace pioneer status with a new Economic Development Incentive, so do not build a tax holiday into your plan. The new rules also define small companies as those with annual turnover of ₦50 million or less and fixed assets of no more than ₦250 million, and exempt them from companies income tax, capital gains tax and the new development levy, whether labelled or not. For angel investors, venture capital and private equity funds, accelerators and incubators, AO2LAW reports that the new law exempts gains on disposing of assets in a labelled startup held in Nigeria for at least 24 months, a rule the Startup Act already contained.</p>
<p>The practical point: for an early company, the label matters more for credibility, sandbox access and investor terms than for your own tax bill. Confirm with a tax adviser whether your business qualifies as small and what still applies before you model it.</p>
<p>If you are planning a product and want the build to stand up to this kind of scrutiny, <a href="/contact/">talk to us</a>.</p>`
  },
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
<p>A playful tone can work for celebrations and rewards; ZenglyPay’s Vaniti feature leans into the joy of spraying money at a party. The same voice in an error or a security alert feels careless. Calm and clear wins whenever money is at risk.</p>
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
<p>These principles shaped our work on <a href="/work/zengly/">ZenglyPay</a>, a social-finance app launching in December 2026. If you are building a money product, <a href="/start-a-project/">tell us about it</a>.</p>`
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
