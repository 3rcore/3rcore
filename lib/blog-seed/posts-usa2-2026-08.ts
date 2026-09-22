/**
 * Segundo lote en INGLÉS para EE.UU. (locale 'en').
 *
 * El primer lote abrió los ejes de UGC, nearshore, derechos de uso y mercado
 * hispano. Este cubre los huecos que quedaban en el embudo: cómo se elige
 * agencia, qué presupuesto hace falta, qué pedir en el traspaso y cómo se mide.
 * Ninguno repite el eje de un post existente en inglés ni en español.
 */

import type { SeedPost } from "./posts"

const AUTHOR = "3R Core Team"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

export const USA2_POSTS_2026_08: SeedPost[] = [
  {
    slug: "questions-to-ask-a-marketing-agency",
    locale: "en",
    title: "12 Questions to Ask a Marketing Agency Before You Sign",
    focus_keyword: "questions to ask a marketing agency",
    meta_title: "12 Questions to Ask a Marketing Agency Before Signing | 3R Core",
    meta_description: "The questions that separate an agency that will deliver from one that will bill you: ownership of accounts, who does the work, reporting, exit terms and what happens when results stall.",
    excerpt: "Most agency relationships go wrong for reasons that were visible in the first meeting. These are the twelve questions that surface them — including the four that make bad agencies uncomfortable.",
    og_title: "12 Questions to Ask a Marketing Agency Before You Sign",
    og_description: "Ownership, staffing, reporting and exit terms — the questions that surface problems early.",
    featured_image: IMG("1552664730-d307ca884978"),
    featured_image_alt: "Business meeting reviewing a marketing agency proposal",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>The pattern:</strong> most agency relationships that go badly were predictable in the first meeting. Not because the agency lied, but because nobody asked the questions whose answers would have revealed the mismatch. These twelve are ordered by how much trouble they prevent — the first four are the ones that make a weak agency visibly uncomfortable.</p>

<h2>The four that matter most</h2>

<h3>1. Whose ad accounts and analytics properties will the work live in?</h3>
<p>The answer should be: yours. Campaigns built inside an agency's own ad account mean that when the relationship ends, you lose the conversion history, the audience data and the learning phase the algorithm accumulated. You start from zero with the next agency.</p>
<p>Some agencies present this as a convenience — "we handle all the setup" — and it is convenient, right up until it's leverage. Ask for accounts in your name with the agency granted access, and confirm the same for analytics, tag manager and any tracking property.</p>

<h3>2. Who specifically will do the work, and what else are they on?</h3>
<p>Pitches get delivered by senior people. Execution frequently doesn't. This isn't inherently a problem — juniors doing well-supervised work is how any agency scales — but you should know the structure before signing, not discover it when the quality shifts in month three.</p>
<p>Ask for names, roles, and roughly how many accounts each person carries. An account manager holding thirty clients cannot give yours real attention regardless of how good they are.</p>

<h3>3. What happens if results don't improve in 90 days?</h3>
<p>The useful answer isn't a guarantee — guaranteed rankings or guaranteed leads are a red flag, not reassurance. The useful answer describes a <em>process</em>: what gets reviewed, what changes, who decides, and at what point you can exit without penalty.</p>
<p>An agency that has thought about this has a real answer. One that hasn't will either promise results it can't control or get vague, and both tell you something.</p>

<h3>4. What does the exit look like?</h3>
<p>Notice period, what transfers to you, in what format, and how long the handover takes. Ask this in the first meeting precisely because it's awkward — the reaction is informative. An agency confident in its work treats a clean exit as normal; one that relies on lock-in gets defensive.</p>

<h2>On scope and money</h2>

<h3>5. Is this a fixed scope or hourly?</h3>
<p>Fixed scope with defined deliverables is easier to hold anyone to. Hourly billing without a cap means the incentive runs the wrong way — inefficiency is revenue. If it's hourly, ask what the estimate is and what happens when it's exceeded.</p>

<h3>6. What's included in the fee and what's billed separately?</h3>
<p>The classic surprises: ad spend (should always be separate and paid by you directly to the platform), design work, landing pages, additional creative rounds, tools and software licenses, and reporting beyond the standard monthly.</p>

<h3>7. What's the minimum commitment, and why that length?</h3>
<p>Three months is reasonable for paid media — less doesn't produce enough data to distinguish improvement from noise. Six months is reasonable for SEO. Twelve-month minimums for anything are worth questioning: ask what specifically requires a year that couldn't be reviewed at six.</p>

<h2>On the actual work</h2>

<h3>8. Can I see work in my category, with outcomes?</h3>
<p>Not a logo wall. An actual example: what the situation was, what they did, what happened. If client confidentiality prevents naming, anonymized numbers are still meaningful. An agency with no outcome it can describe has either never measured or has nothing to show.</p>

<h3>9. How do you decide what to do first?</h3>
<p>Listen for whether the answer starts with your business or with their services. "We'd run an audit, look at where the leads currently come from and what's already been tried" is a different answer from "we'd start with our SEO package."</p>

<h3>10. What do you need from us, and how often?</h3>
<p>Every engagement requires client input — product knowledge, approvals, access, subject-matter answers. Agencies that underplay this are setting up a later conversation where the lack of results is your fault. A straight answer about time commitment is a good sign.</p>

<h2>On measurement</h2>

<h3>11. What will the monthly report actually contain?</h3>
<p>Ask to see a sample. What you want: cost per acquisition, conversion volume, what changed this month, what's planned next. What you don't want: impressions, reach and "engagement" presented as results. If the sample report leads with impressions, that's what they consider success.</p>

<h3>12. How do you track conversions, and what happens if tracking is broken?</h3>
<p>This question separates operators from presenters. Tracking breaks constantly — site updates, consent changes, platform migrations. The good answer describes how they'd verify tracking before spending, and what they check when numbers look implausible.</p>
<p>It's also worth knowing that the most common "conversion crisis" is a measurement artifact rather than a real collapse. We've seen accounts where a supposed 89% form-abandonment rate turned out to be bot traffic from a handful of countries, while actual human visitors were converting at over 40%. An agency that knows to segment before panicking will save you from acting on a phantom.</p>

<h2>Answers that should end the conversation</h2>
<ul>
<li><strong>"We guarantee first-page rankings."</strong> Nobody controls Google's ranking. What can be guaranteed is work, not position.</li>
<li><strong>"We have a special relationship with Google."</strong> Google Partner status is a real program with public criteria. It doesn't confer ranking advantages, and anyone implying otherwise is misrepresenting it.</li>
<li><strong>"You don't need to worry about the technical side."</strong> You don't need to do it, but you should be able to see it.</li>
<li><strong>"Our reporting shows we generated 2 million impressions."</strong> Impressions are an input, not a result.</li>
<li><strong>Reluctance to put accounts in your name.</strong> There is no legitimate reason for this.</li>
</ul>

<h2>One question for yourself</h2>
<p>Before any of the above: what does success look like in numbers, and by when? An agency can only be held to a target that exists. "More leads" isn't a target. "Cost per qualified lead under $120 within 90 days, at current spend" is — and it lets both sides know quickly whether this is working.</p>

<p>If you're evaluating agencies right now and want a straight answer to all twelve, <a href="/en/services">see how we work</a> or read about <a href="/en/blogs/nearshore-vs-offshore-marketing-team">what changes with a nearshore team</a>.</p>`,
  },
  {
    slug: "marketing-budget-for-small-business",
    locale: "en",
    title: "How Much Should a Small Business Spend on Marketing?",
    focus_keyword: "marketing budget for small business",
    meta_title: "How Much Should a Small Business Spend on Marketing? | 3R Core",
    meta_description: "Percentage-of-revenue rules, why they break, and how to size a budget from your customer acquisition cost instead. With minimum viable budgets by channel.",
    excerpt: "The 5–10% of revenue rule is a starting point that misleads more often than it helps. Here's how to size a budget from what a customer is actually worth to you.",
    og_title: "How Much Should a Small Business Spend on Marketing?",
    og_description: "Sizing a budget from acquisition cost instead of a percentage rule, with channel minimums.",
    featured_image: IMG("1554224155-6726b3ff858f"),
    featured_image_alt: "Small business owner planning a marketing budget",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>The honest answer:</strong> the "5–10% of revenue" rule is a starting point that misleads as often as it helps, because it ignores the only two numbers that matter — what a customer is worth to you and what one costs to acquire. A better approach works backward from those. In practice, most U.S. small businesses running paid acquisition need a <strong>floor of $1,500–$3,000/month in media spend</strong> before the data means anything, plus management.</p>

<h2>Why the percentage rule breaks</h2>
<p>The common benchmarks — 5% of revenue for established businesses, 10–20% for growth — come from aggregate survey data across wildly different business models. Applied to a specific company, they produce nonsense in both directions.</p>
<p>A law firm where one case is worth $12,000 and a coffee shop with a $6 average ticket cannot sensibly spend the same percentage. The firm can profitably pay several hundred dollars for a single lead; the coffee shop cannot pay more than a couple of dollars for a customer. Percentage of revenue tells you nothing about either.</p>

<h2>Work backward from unit economics instead</h2>
<p>Three numbers, in this order:</p>
<h3>1. Average order value or contract value</h3>
<p>What a customer pays you the first time.</p>
<h3>2. Lifetime value</h3>
<p>What they're worth across the whole relationship. A gym member at $60/month who stays fourteen months is worth $840, not $60 — and that difference completely changes what you can spend to acquire them.</p>
<h3>3. Gross margin</h3>
<p>What's left after cost of goods. A $500 sale at 20% margin gives you $100 to work with. The same sale at 70% gives you $350.</p>
<p>From there: <strong>your maximum acquisition cost is roughly one third of gross margin on lifetime value.</strong> That leaves two thirds for overhead and profit. It's a rule of thumb, not accounting, but it produces a defensible ceiling.</p>
<table>
<thead><tr><th>Business</th><th>LTV</th><th>Margin</th><th>Gross profit</th><th>Max CAC (~⅓)</th></tr></thead>
<tbody>
<tr><td>Dental practice</td><td>$2,400</td><td>60%</td><td>$1,440</td><td>~$480</td></tr>
<tr><td>E-commerce, repeat</td><td>$280</td><td>45%</td><td>$126</td><td>~$42</td></tr>
<tr><td>B2B services</td><td>$18,000</td><td>55%</td><td>$9,900</td><td>~$3,300</td></tr>
<tr><td>Local home services</td><td>$900</td><td>40%</td><td>$360</td><td>~$120</td></tr>
</tbody>
</table>

<h2>From acquisition cost to monthly budget</h2>
<p>Once you know what a customer can cost, the budget follows from how many you want:</p>
<p><strong>Monthly budget = target customers × max acquisition cost</strong></p>
<p>The dental practice wanting 10 new patients a month: 10 × $480 = $4,800 in media spend. If that's beyond reach, the honest conclusion is that the goal needs to be 4 patients, not that the math is wrong.</p>
<p>This is the calculation most budget conversations skip, and it's why so many campaigns are set up to fail: a business allocates $800/month against a goal that requires $4,000, then concludes advertising doesn't work.</p>

<h2>Minimum viable budgets by channel</h2>
<p>Below a floor, paid channels don't produce enough data to optimize — you're paying for noise.</p>
<table>
<thead><tr><th>Channel</th><th>Practical minimum</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Google Ads (local services)</td><td>$1,000–$1,500/mo</td><td>High-intent clicks in competitive categories run $8–$40 each</td></tr>
<tr><td>Google Ads (e-commerce)</td><td>$1,500–$3,000/mo</td><td>Shopping needs volume before the algorithm stabilizes</td></tr>
<tr><td>Meta Ads</td><td>$1,000–$2,000/mo</td><td>Needs ~50 conversions/week per ad set to exit learning</td></tr>
<tr><td>TikTok Ads</td><td>$1,000–$2,000/mo</td><td>Cheaper impressions but needs creative volume to work</td></tr>
<tr><td>SEO</td><td>$500–$1,500/mo</td><td>Compounds slowly; below this you can't sustain output</td></tr>
<tr><td>UGC production</td><td>$1,200–$3,000/mo</td><td>8–15 assets/month to outrun creative fatigue</td></tr>
</tbody>
</table>
<p>The pattern worth noticing: <strong>one channel funded properly beats three funded badly.</strong> Splitting $1,500 across Google, Meta and TikTok gives all three too little to learn from. The same $1,500 on one channel produces a real answer within a quarter.</p>

<h2>Splitting the budget: a workable default</h2>
<p>For a business with something to sell and no established acquisition engine:</p>
<ul>
<li><strong>60% to the channel closest to purchase intent.</strong> Usually Google Search for services, Shopping or Meta for products.</li>
<li><strong>25% to creative production.</strong> Not optional in social — creative is the variable that moves cost per result most, and it wears out.</li>
<li><strong>15% to compounding assets.</strong> SEO, content, email — the parts that keep working after you stop paying.</li>
</ul>
<p>Management fees sit on top of media spend, not inside it. Blending them hides how much is actually reaching the auction.</p>

<h2>When to increase, when to hold</h2>
<p><strong>Increase</strong> when cost per acquisition is stable and comfortably below your ceiling. That combination means the channel has room. Raise in increments of 20–30% and give each step two weeks — a large jump resets the algorithm's learning and can undo the performance you were scaling.</p>
<p><strong>Hold</strong> when cost per acquisition is climbing while volume is flat. That usually signals creative fatigue rather than a saturated channel, and the fix is new creative, not more budget behind tired assets.</p>
<p><strong>Cut</strong> when you can't attribute results at all. Spending more through broken measurement just buys expensive uncertainty.</p>

<h2>The mistake that wastes the most</h2>
<p>Not the size of the budget — the absence of tracking before it starts. A business spending $3,000/month without conversion tracking configured has no idea which half works, and after six months has no learning to show for $18,000. Setting up analytics, tag management and conversion events properly costs a fraction of one month's spend and determines whether the rest of it teaches you anything.</p>

<h2>If the budget is genuinely small</h2>
<p>Under about $1,000/month, paid acquisition across multiple channels isn't realistic. What does work at that level:</p>
<ol>
<li><strong>One channel only</strong>, the one closest to purchase intent.</li>
<li><strong>Tight geography.</strong> A 10-mile radius with $800 beats a whole state with $800.</li>
<li><strong>Your highest-margin service only</strong>, not the full catalog.</li>
<li><strong>Google Business Profile and local SEO</strong>, which cost effort rather than media spend.</li>
<li><strong>Email to existing customers</strong>, consistently the cheapest revenue available to a small business.</li>
</ol>

<p>If you want the calculation run against your actual numbers rather than a benchmark, <a href="/en/quote">get a scoped estimate</a> or see <a href="/en/pricing">what management costs</a>.</p>`,
  },
  {
    slug: "spanish-seo-for-us-businesses",
    locale: "en",
    title: "Spanish SEO for U.S. Businesses: The Cheapest Traffic Nobody Is Bidding On",
    focus_keyword: "spanish seo united states",
    meta_title: "Spanish SEO for U.S. Businesses — Underserved Search | 3R Core",
    meta_description: "How to rank for Spanish-language searches in your U.S. service area: hreflang, URL structure, keyword research in Spanish and the mistakes that make Google serve the wrong page.",
    excerpt: "Spanish queries in most U.S. service areas have a fraction of the competing content their English equivalents do. Here's how to structure a site to capture them.",
    og_title: "Spanish SEO for U.S. Businesses",
    og_description: "hreflang, URL structure and Spanish keyword research for U.S. service areas.",
    featured_image: IMG("1432888622747-4eb9a8efeb07"),
    featured_image_alt: "Search results analysis for Spanish-language queries",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>The opportunity:</strong> in most U.S. service areas, the Spanish-language version of a commercial query has a fraction of the competing content its English equivalent does. Same buyer intent, same city, far less competition. The catch is that capturing it requires more than translating pages — done wrong, Google serves the English version to Spanish searchers and the work produces nothing.</p>

<h2>Why the gap exists</h2>
<p>Roughly 40 million U.S. residents speak Spanish at home, and a substantial share search in it — especially for local services, healthcare, legal help and home repair. Meanwhile almost every competitor in a given local market publishes only in English.</p>
<p>The result is an imbalance you can measure yourself: search a commercial term in your city in English, then in Spanish, and compare who ranks. In the English results you'll typically find established competitors with years of content. In the Spanish results it's common to find directory listings, an auto-translated page or two, and content from another country entirely.</p>
<p>That gap is the whole opportunity, and it's temporary — it exists because the market is underserved, and it narrows as more businesses notice.</p>

<h2>Get the structure right first</h2>
<p>This is where most Spanish SEO efforts fail before they start.</p>

<h3>Distinct URLs, always</h3>
<p>Each language needs its own indexable URL. A JavaScript toggle that swaps text at the same address gives Google one page and one language to index — the Spanish version effectively doesn't exist as far as search is concerned.</p>
<p>Three structures work: a subdirectory (<code>/es/</code>), a subdomain, or a separate domain. For a U.S. business adding Spanish, <strong>a subdirectory is almost always right</strong>: it inherits the domain's existing authority instead of starting from zero.</p>

<h3>hreflang, declared reciprocally</h3>
<p>The annotation that tells Google these pages are the same content in different languages. Three rules decide whether it works:</p>
<ul>
<li><strong>Reciprocal.</strong> If the English page points to the Spanish one, the Spanish must point back. One-directional annotations are ignored.</li>
<li><strong>Use <code>es-US</code>, not bare <code>es</code></strong>, when the content is written for U.S. Hispanic readers. Generic <code>es</code> competes against content from every Spanish-speaking country; <code>es-US</code> signals the specific audience.</li>
<li><strong>Point at live URLs.</strong> An hreflang pointing to a page that redirects gets discarded. This is the most common technical failure we find, and it's invisible without checking.</li>
</ul>
<p>Include <code>x-default</code> for visitors whose language doesn't match either version.</p>

<h3>Complete the whole path, not just the landing page</h3>
<p>A Spanish landing page that leads to an English form, English confirmation email and an English callback wastes the click at the moment of commitment. The path has to hold in one language end to end — including the person who answers the phone.</p>

<h2>Keyword research in Spanish is not translation</h2>
<p>Running English keywords through a translator produces terms nobody searches. Three reasons:</p>
<h3>Regional vocabulary</h3>
<p>The same object has different common names by country of origin, and U.S. Hispanic communities are not uniform. Miami's Spanish carries Cuban and Venezuelan influence, Los Angeles skews Mexican, New York has strong Dominican and Puerto Rican presence. Pick the variety your actual customers use — start from the demographics of your service area, not from a dictionary.</p>
<h3>Code-switching</h3>
<p>Bilingual searchers routinely mix languages in a query. Someone may search the industry term in English and everything around it in Spanish, because the English term is simply what people say. Translating that term into formal Spanish produces a page that matches no real query.</p>
<h3>Accents and how people actually type</h3>
<p>Many users type without accents. Google handles this well, but your content should read naturally with correct accents while the research accounts for both forms appearing in volume data.</p>
<p>Practical method: pull the actual queries from your Search Console, filter for Spanish, and use those as the seed. Real queries from your own market beat any keyword tool's translation.</p>

<h2>Local signals, in Spanish</h2>
<p>For a business serving a defined area, local is where Spanish SEO pays fastest:</p>
<ul>
<li><strong>Google Business Profile:</strong> add a Spanish description and, where relevant, Spanish service names. Respond to Spanish reviews in Spanish — that's a visible signal to both the algorithm and the next reader.</li>
<li><strong>Location pages in Spanish</strong> for the neighborhoods where your Spanish-speaking customers actually are, with genuinely different content per page. Duplicated location pages with the city name swapped are thin content in any language.</li>
<li><strong>LocalBusiness schema</strong> on the Spanish pages too, with <code>inLanguage</code> set correctly.</li>
</ul>

<h2>Citations and directories, in Spanish</h2>
<p>Most local SEO checklists stop at the English-language directories: the general business listings, the industry-specific ones, the chamber of commerce. Almost nobody repeats that work in Spanish, which is exactly why it's worth doing — a Hispanic chamber of commerce listing, a Spanish-language business directory, or a bilingual review platform carries the same local-signal weight an English citation does, against far less competition for the slot.</p>
<p>Two things make this pay off instead of becoming busywork: keep the business name, address and phone (NAP) identical to the English listings — Google reconciles these as the same business, and a mismatch undoes the benefit — and don't stop at the listing. Ask Spanish-speaking customers for reviews in Spanish and reply to them in Spanish; a directory entry with zero reviews signals less than a thin English one does.</p>

<h2>Content that ranks, not content that translates</h2>
<p>The pages that work are the ones written for the reader's situation, which is often different from the English reader's. A U.S. Hispanic customer researching a service may have questions an English-speaking customer wouldn't: whether staff speak Spanish, what documentation is required, how payment plans work, whether a particular status affects eligibility.</p>
<p>Those questions rarely appear in an English page, so they never survive translation — and they're exactly what the search demand looks like. Writing them properly is what separates a Spanish section that ranks from one that exists.</p>

<h2>What to expect, and in what order</h2>
<p>Spanish sections typically show movement faster than their English equivalents, precisely because the competition is thinner. A reasonable sequence:</p>
<ol>
<li><strong>Weeks 1–2:</strong> structure — URLs, hreflang, one properly built Spanish landing page for your highest-intent service.</li>
<li><strong>Weeks 3–6:</strong> keyword research from real queries, then the core service pages.</li>
<li><strong>Month 2–3:</strong> local signals, Google Business Profile, location pages where they're justified.</li>
<li><strong>Month 3+:</strong> content answering the questions specific to this audience.</li>
</ol>
<p>Measure Spanish separately from English throughout. Blended reporting hides the whole story: it's common to see Spanish deliver a lower cost per lead and a lower on-site conversion rate at once, which points precisely at an experience that degrades after the click.</p>

<h2>The mistakes that cost most</h2>
<ol>
<li><strong>Machine translation with no native review.</strong> The failure isn't errors, it's flatness — and flatness is harder to notice and just as costly.</li>
<li><strong>No hreflang</strong>, so Google guesses which version to show and gets it wrong often enough to matter.</li>
<li><strong>hreflang pointing at redirecting URLs</strong>, which silently invalidates the whole annotation.</li>
<li><strong>Spanish ads sending traffic to English pages.</strong> The most common and most expensive.</li>
<li><strong>One "neutral Spanish" for the entire country</strong>, which belongs to nobody.</li>
<li><strong>Stopping at the landing page</strong> while forms, emails and the sales call stay in English.</li>
</ol>

<p>We produce Spanish-language SEO and content with a native Spanish-speaking team, and we structure it so Google serves the right version to the right searcher. <a href="/en/seo-agency">See how we run SEO</a>, or read <a href="/en/blogs/why-translated-spanish-ads-underperform">why translated Spanish ads underperform</a>.</p>

<h2>Frequently asked questions</h2>

<h3>Is Spanish SEO just translating my English pages?</h3>
<p>No — that's the single most common and most expensive mistake. A translated page keeps the English page's structure, headings and keyword targets, which were built for queries nobody types in Spanish. Spanish SEO means separate keyword research, its own URL, and copy written for the Spanish-speaking reader's actual questions.</p>

<h3>What does es-US mean, and why not just es?</h3>
<p>It tells Google the page is written for U.S. Hispanic readers specifically, rather than for Spain, Mexico or any other Spanish-speaking market. Bare <code>es</code> competes against content from every Spanish-speaking country; <code>es-US</code> narrows the field to the audience you actually serve.</p>

<h3>How long before a Spanish page outranks the English-only competition?</h3>
<p>Faster than the equivalent English work in most local markets, because the competing content is thinner. Structure and a properly built landing page happen in the first two weeks; visible movement in local Spanish results commonly follows within the first two to three months, ahead of typical English SEO timelines for the same market.</p>

<h3>Do I need a separate Google Business Profile for Spanish?</h3>
<p>Not a separate listing — one profile with a Spanish description, Spanish service names where relevant, and replies to Spanish reviews written in Spanish. That's enough to send the signal; what most businesses skip is the ongoing part, not the initial setup.</p>`,
  },
  {
    slug: "creative-testing-framework-paid-social",
    locale: "en",
    title: "A Creative Testing Framework for Paid Social That Actually Isolates Variables",
    focus_keyword: "creative testing paid social",
    meta_title: "Creative Testing Framework for Paid Social | 3R Core",
    meta_description: "How to structure creative tests on Meta and TikTok so the result means something: angle vs hook vs format, what to change per round, and the metrics that diagnose each layer.",
    excerpt: "Most creative testing produces winners nobody can explain. Separating angle, hook and format turns a lucky result into something you can repeat.",
    og_title: "A Creative Testing Framework for Paid Social",
    og_description: "Angle vs hook vs format: how to test so the result tells you what to do next.",
    featured_image: IMG("1460925895917-afdab827c52f"),
    featured_image_alt: "Analyzing creative performance data for paid social campaigns",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>The problem with most creative testing:</strong> it produces a winner nobody can explain. One video outperforms and the takeaway is "make more like that one" — which isn't a strategy, because nobody knows which part of it worked. Separating the layers turns a lucky result into a repeatable one.</p>

<h2>Three layers, tested separately</h2>
<p>Every piece of paid social creative has three independent components, and confusing them is why testing so often produces unusable conclusions.</p>

<h3>Angle — why someone should buy</h3>
<p>The underlying argument. Solving a problem, breaking an objection, comparing against the alternative, demonstrating the product, or showing social proof. This is the highest-leverage layer and the slowest to test.</p>

<h3>Hook — the first three seconds</h3>
<p>How the angle gets introduced. The same angle can open with a question, a bold claim, a visual pattern break, a relatable complaint or a direct address. Hooks are cheap to vary and fast to read.</p>

<h3>Format — how it's produced</h3>
<p>Talking head, voiceover with b-roll, screen recording, split screen, text-on-screen, static image. Cheapest layer to change, usually the smallest effect.</p>

<p>The mistake is testing all three simultaneously. If version A is a problem angle with a question hook as a talking head, and version B is a social-proof angle with a claim hook as a voiceover, and B wins — you've learned nothing you can act on.</p>

<h2>The testing sequence</h2>

<h3>Round 1: find the angle (highest leverage)</h3>
<p>Four to six angles, <strong>same hook style and same format across all of them.</strong> You're isolating the argument. Run until each has enough conversions to be meaningful — as a rule of thumb, 50 conversions per variant before you trust a difference, fewer if the gap is dramatic.</p>
<p>Read on <strong>cost per acquisition</strong>. Retention and click-through matter here only as diagnostics; the angle question is whether the argument sells.</p>

<h3>Round 2: optimize the hook on the winning angle</h3>
<p>Take the angle that won and produce four to six hook variations of it, <strong>same body, same format.</strong> This is the cheapest high-return round in the whole process, because you're re-cutting existing footage rather than producing new material.</p>
<p>Read on <strong>three-second retention</strong> first, then cost per acquisition. A hook that lifts retention without improving CPA is holding the wrong audience — worth knowing, because it usually means the hook promises something the body doesn't deliver.</p>

<h3>Round 3: format variations</h3>
<p>Winning angle and winning hook, produced three or four ways. Smallest effect of the three rounds, but it extends the life of an angle that's working and gives the algorithm variety to serve different placements.</p>

<h3>Round 4: back to angles</h3>
<p>Return to round one with what you learned. The second angle round is better informed: you know which argument resonated and can generate adjacent ones instead of guessing again.</p>

<h2>What each metric actually diagnoses</h2>
<table>
<thead><tr><th>Metric</th><th>What it tells you</th><th>What to fix</th></tr></thead>
<tbody>
<tr><td>3-second retention</td><td>Whether the hook stops the scroll</td><td>The opening — rewrite the first line</td></tr>
<tr><td>Hold to 50%</td><td>Whether the body earns attention</td><td>Pacing, or a promise the body doesn't pay off</td></tr>
<tr><td>Click-through rate</td><td>Whether the promise is compelling</td><td>The offer or the call to action</td></tr>
<tr><td>Landing page conversion</td><td>Whether the page matches the ad</td><td>Message match — usually the page, not the ad</td></tr>
<tr><td>Cost per acquisition</td><td>Whether the angle sells</td><td>The argument itself</td></tr>
</tbody>
</table>
<p>Reading them in this order localizes the problem. High retention with low CTR is a good hook on a weak promise. High CTR with poor landing conversion means the ad wrote a check the page didn't cash — and that one is almost always fixed on the page.</p>

<h2>Structural rules that keep tests clean</h2>
<ul>
<li><strong>One variable per round.</strong> If you change two things you can't attribute the result.</li>
<li><strong>Don't touch anything mid-test.</strong> Budget changes, audience edits and new variants entering mid-flight reset the learning and invalidate the comparison.</li>
<li><strong>Give it enough conversions, not enough days.</strong> Time is a poor proxy — a week at low volume proves nothing.</li>
<li><strong>Name files by angle and hook.</strong> If your assets are "final_v2_edit.mp4" the report can't tell you which idea won. This single habit is what makes the whole framework usable.</li>
<li><strong>Keep a losers list.</strong> Angles the audience rejected are information; without a record you'll retest them in six months.</li>
</ul>

<h2>How much creative this consumes</h2>
<p>Running this properly takes volume. A full cycle — angles, hooks, formats — is roughly 15–20 assets, most of them variations rather than new productions. For an account spending meaningfully, that's a monthly rhythm, not a one-time project.</p>
<p>This is where in-house or batch production changes the economics. Commissioning individual videos as needed makes the framework unaffordable; producing in batches where scripting and casting amortize across the set makes it routine. It's also why creative fatigue kills accounts that treat production as a one-off — the same asset shown to the same audience degrades within weeks regardless of how good it was.</p>

<h2>Where to start if you're testing nothing today</h2>
<p>Don't attempt the full framework at once. Start with round two, on whatever your best-performing existing asset is: take it and cut four different hooks from the same footage. It's the cheapest possible test, it needs no new production, and it will tell you within two weeks whether your opening was leaving money on the table. It usually was.</p>

<p>We produce creative in batches built for exactly this cycle, named by angle and hook so the reports stay readable. <a href="/en/services/ugc-content">See how UGC production works</a>, or read <a href="/en/blogs/how-much-does-ugc-content-cost">what it costs</a>.</p>`,
  },
]
