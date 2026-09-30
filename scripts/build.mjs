import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import { format } from "prettier";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedPages = [];
const read = (path) => readFileSync(resolve(root, path), "utf8");
const icon = (name) =>
  read(`node_modules/lucide-static/icons/${name}.svg`).replace(
    "<svg",
    '<svg aria-hidden="true" focusable="false"',
  );
const store = "https://apps.apple.com/us/app/fynx-finance-world/id6752357210";
const arrow = icon("arrow-up-right");
const button = (label = "Download for iOS", kind = "primary") =>
  `<a class="button ${kind}" href="${store}">${icon("download")}<span>${label}</span>${arrow}</a>`;
const brand = `<a class="brand" href="index.html" aria-label="FYNX home"><img src="fynx-logo-site.png" width="34" height="34" alt=""><span>FYNX<span class="brand-dot">.</span></span></a>`;
const header = `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="nav-wrap">${brand}<nav id="navigation" aria-label="Main navigation"><a href="index.html#features">Features</a><a href="index.html#screens">Inside the app</a><a href="index.html#getting-started">How it works</a><a href="faqs.html">FAQs</a><a href="support.html">Contact</a><a class="mobile-download" href="${store}">Download for iOS ${arrow}</a></nav><a class="nav-download" href="${store}">Get FYNX ${arrow}</a><button class="menu-toggle" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false">${icon("menu")}${icon("x")}</button></div></header>`;
const footer = `<footer class="site-footer"><div class="container footer-grid"><div>${brand}<p>A little more clarity.<br>A lot more intention.<br>Your trading day, with FYNX.</p></div><div><h2>Explore</h2><a href="index.html#features">Features</a><a href="index.html#screens">Inside the app</a><a href="index.html#getting-started">Getting started</a></div><div><h2>Get in touch</h2><a href="faqs.html">FAQs</a><a href="support.html">Contact & support</a><a href="google-play.html">Android</a></div><div><h2>The details</h2><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a><a href="${store}">App Store ${arrow}</a></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} FYNX. All rights reserved.</span><span>Tools for your process. Decisions are yours.</span><a href="#main" aria-label="Back to top">${icon("arrow-up")}</a></div></footer>`;
function page(name, title, description, content, cls = "") {
  generatedPages.push(name);
  writeFileSync(
    resolve(root, name),
    `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#101111"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://site.fynxfinanceworld.com/${name === "index.html" ? "" : name}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://site.fynxfinanceworld.com/fynx-logo-site.png"><meta property="og:type" content="website"><link rel="icon" href="fynx-logo-site.png" type="image/png"><link rel="apple-touch-icon" href="fynx-logo-site.png"><link rel="stylesheet" href="assets/styles.css"><script src="assets/site.js" defer></script></head><body class="${cls}">${header}<main id="main">${content}</main>${footer}</body></html>\n`,
  );
}
const faqs = [
  [
    "Basics",
    "What is FYNX?",
    "FYNX is an iOS app with trading utilities, market data, calculators, risk-management tools, and a journal. It brings the tools for your daily trading routine together on your iPhone.",
  ],
  [
    "Plans & billing",
    "Is FYNX free to download?",
    "Yes. FYNX is free to download. Some tools and analytics require a subscription purchased through Apple. You can review the available plans and local pricing inside the app before subscribing.",
  ],
  [
    "Plans & billing",
    "How do I manage or cancel my subscription?",
    'On your iPhone, open <strong>Settings → your name → Subscriptions → FYNX</strong>. Apple handles subscription changes and cancellations. For help with a purchase, visit <a href="https://reportaproblem.apple.com/">Apple’s purchase support</a>.',
  ],
  [
    "Privacy & data",
    "How does FYNX handle my data?",
    'Our <a href="privacy.html">Privacy Policy</a> explains purchase validation, optional support submissions and diagnostics, processing, and your choices. Visit the policy for the full details or <a href="support.html">contact support</a> with a specific question.',
  ],
  [
    "Support",
    "How can I report a bug or request a feature?",
    'Send a message through our <a href="support.html">contact page</a>. For a bug, include your iPhone model, iOS version, app version, and the steps that led to the issue. For a feature idea, tell us what you’re trying to achieve.',
  ],
  [
    "Basics",
    "Can I use FYNX on multiple devices?",
    'If you use iCloud sync or restore from a previous device, your preferences can transfer. If something is missing after switching devices, <a href="support.html">contact support</a> with your device and app versions.',
  ],
  [
    "Support",
    "How do I get in touch?",
    'Use our <a href="support.html">contact form</a> or email <a href="mailto:support@elhamamini.cc">support@elhamamini.cc</a>. We typically respond within 24–48 hours on weekdays.',
  ],
  [
    "Basics",
    "Does FYNX provide financial advice?",
    "No. FYNX provides analytical tools and information, not investment recommendations. You are responsible for your own trading and investment decisions.",
  ],
  [
    "Basics",
    "Is FYNX available on Android?",
    'FYNX is currently available on iOS. The Android version is in development. See the <a href="google-play.html">Android page</a> for its current status and how to register your interest.',
  ],
];
const faqItem = ([category, question, answer], i) =>
  `<details class="faq-item" data-category="${category}" ${i === 0 ? "open" : ""}><summary>${question}<span class="faq-sign">${icon("plus")}${icon("minus")}</span></summary><div class="faq-answer">${answer}</div></details>`;
const cta = `<section class="closing"><div class="container"><span class="eyebrow">A BETTER ROUTINE STARTS HERE</span><h2>Bring a little more<br>intention to every trade.</h2><p>Your market. Your rules. Your next move.</p>${button("Get FYNX for iOS", "dark")}<a class="text-link" href="google-play.html">Waiting for Android? ${arrow}</a></div></section>`;
const phone = (src, alt, lazy = true) =>
  `<img class="phone" src="assets/${src}" alt="${alt}" width="1194" height="2418" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'}>`;

page(
  "index.html",
  "FYNX — A clearer trading day.",
  "Risk tools, market context, and a focused trading routine. Meet FYNX for iPhone.",
  `
<section class="hero container"><a class="announcement" href="#screens"><span class="status-dot"></span> Your trading toolkit. Always with you. ${icon("arrow-right")}</a><h1>FYNX for iPhone<span class="accent">.</span></h1><p class="hero-line">Less noise. More clarity.</p><p class="hero-description">Know your risk. Find your focus. Build a more deliberate<br class="desktop-break"> trading routine with the tools you need, all in one place.</p><div class="hero-actions">${button()}<a class="button secondary" href="#screens">Explore the app ${icon("arrow-down")}</a></div><div class="hero-notes"><span>${icon("check")} Free to download</span><span>${icon("check")} No ads</span><span>${icon("check")} Built for iOS</span></div><div class="phone-stage"><div class="phone-wing left">${phone("screen-trade.PNG", "FYNX chart view showing the gold market", false)}<span class="floating-label">${icon("chart-no-axes-combined")} See the bigger picture</span></div><div class="phone-center">${phone("hero-phone.PNG", "FYNX market news screen on iPhone", false)}</div><div class="phone-wing right">${phone("screen-setting.PNG", "FYNX market hours across global trading sessions", false)}<span class="floating-label">${icon("clock-3")} Find your session</span></div></div></section>
<div class="market-strip"><div class="container"><span>YOUR MARKETS. ONE TOOLKIT.</span><span>Gold</span><span>Forex</span><span>Indices</span><span>Crypto</span></div></div>
<section class="section container" id="features"><div class="section-heading"><div><span class="eyebrow">BUILT AROUND YOUR PROCESS</span><h2>A sharper toolkit.<br>A calmer trading day.</h2></div><p>From your first calculation to your end-of-day review. Give every decision a little more structure.</p></div><div class="feature-grid"><article class="feature-card risk-card"><div class="feature-top"><span class="eyebrow">01 / RISK MANAGEMENT</span>${icon("shield-check")}</div><h3>Start with your risk.<br>Then make your move.</h3><p>Position sizing, risk-to-reward presets, ATR stops, and daily risk limits. Keep your rules in sight.</p><div class="risk-tool"><div class="tool-title"><span>${icon("calculator")} Risk budget</span><span>USD</span></div><label for="balance">Account balance</label><div class="input-money"><span>$</span><input id="balance" type="number" value="10000" min="0" max="1000000000" step="any" inputmode="decimal"></div><div class="range-label"><label for="risk">Risk per trade</label><output id="risk-percent" for="risk">0.5%</output></div><input id="risk" type="range" min="0.1" max="5" step="0.1" value="0.5"><div class="risk-result"><span>Your risk budget</span><output id="risk-result" for="balance risk" aria-live="polite">$50.00</output></div><p class="tool-note">Illustrative calculation, before fees and slippage.</p></div></article><article class="feature-card market-card"><div class="feature-top"><span class="eyebrow">02 / MARKET CONTEXT</span>${icon("chart-no-axes-combined")}</div><h3>Zoom out.<br>Stay in perspective.</h3><p>Bring your higher-timeframe plan into focus. Move between chart views and stay connected to market news.</p><div class="timeframes" aria-label="Chart timeframes"><span>5m</span><span>15m</span><span>1h</span><span>4h</span></div><div class="context-visual">${icon("scan-line")}<span>THE BIGGER PICTURE</span><strong>Context before conviction.</strong><div><span>Charts</span><span>News</span><span>Sessions</span></div></div></article><article class="feature-card journal-card"><div class="feature-top"><span class="eyebrow">03 / JOURNAL & METRICS</span>${icon("notebook-pen")}</div><h3>Every trade<br>has something to teach.</h3><p>Tag your trades by setup, session, and emotion. Find patterns in your routine and give your next review a starting point.</p><div class="journal-tags"><span>${icon("tag")} Setup</span><span>${icon("clock-3")} Session</span><span>${icon("heart")} Emotion</span></div></article><article class="feature-card focus-card"><div class="feature-top"><span class="eyebrow">04 / DAILY STRUCTURE</span>${icon("focus")}</div><h3>Your rules.<br>Always within reach.</h3><p>Calculators and prop-mode tools help you bring a consistent process to your trading day.</p><div class="check-rows"><span>${icon("circle-check")} Define your risk</span><span>${icon("circle-check")} Check your session</span><span>${icon("circle-check")} Review your process</span></div></article></div></section>
<section class="screens-section" id="screens"><div class="container"><div class="section-heading centered"><span class="eyebrow">A CLOSER LOOK</span><h2>Everything in view.<br>Nothing in your way.</h2><p>Your market context, charts, and sessions, right where you need them.</p></div><div class="screen-grid"><figure>${phone("hero-phone.PNG", "Market news in the FYNX iOS app")}<figcaption><span>01 / STAY INFORMED</span><h3>Keep up with your market.</h3><p>Market stories and context in one focused view.</p></figcaption></figure><figure>${phone("screen-trade.PNG", "Gold candlestick chart in FYNX")}<figcaption><span>02 / SEE THE SETUP</span><h3>A wider perspective.</h3><p>Chart views that keep the bigger picture close.</p></figcaption></figure><figure>${phone("screen-setting.PNG", "Forex market hours and trading sessions in FYNX")}<figcaption><span>03 / KNOW YOUR SESSION</span><h3>Right place. Right time.</h3><p>Global market hours, at a glance.</p></figcaption></figure></div></div></section>
<section class="method section" id="getting-started"><div class="container"><div class="section-heading"><div><span class="eyebrow">MAKE IT PART OF YOUR DAY</span><h2>A simple start.<br>A more intentional routine.</h2></div><p>Set your preferences once. Bring your process with you every day.</p></div><div class="steps"><article><span class="step-number">01</span>${icon("download")}<h3>Make it yours.</h3><p>Download FYNX on your iPhone and explore your toolkit.</p></article><article><span class="step-number">02</span>${icon("sliders-horizontal")}<h3>Set your ground rules.</h3><p>Choose your account risk, currency, and default symbol in Settings.</p></article><article><span class="step-number">03</span>${icon("notebook-pen")}<h3>Build your routine.</h3><p>Log a trade, tag your setup and session, and make time to review.</p></article></div><div class="method-bottom"><span>${icon("smartphone")} Designed for the way you trade. Built for iPhone.</span>${button("Start with FYNX", "dark")}</div></div></section>
<section class="section container faq-home"><div><span class="eyebrow">A FEW GOOD QUESTIONS</span><h2>Good to know.</h2><p>Get to know FYNX before<br>your first session.</p><a class="text-link" href="faqs.html">All questions ${icon("arrow-right")}</a></div><div>${[faqs[0], faqs[1], faqs[7], faqs[8]].map(faqItem).join("")}</div></section>${cta}`,
  "home",
);

page(
  "faqs.html",
  "FAQs — FYNX",
  "Answers about FYNX, subscriptions, privacy, devices, and support.",
  `<section class="page-intro container"><span class="eyebrow">THE HELP DESK</span><h1>A little clarity<br>goes a long way<span class="accent">.</span></h1><p>Everything you need to get comfortable with FYNX.</p><label class="search-field">${icon("search")}<span class="sr-only">Search frequently asked questions</span><input id="faq-search" type="search" placeholder="Search your question" autocomplete="off"></label></section><section class="container help-layout section-bottom"><aside><span class="eyebrow">BROWSE QUESTIONS</span><div class="faq-filters" role="group" aria-label="Filter questions">${["All questions", "Basics", "Plans & billing", "Privacy & data", "Support"].map((x, i) => `<button type="button" data-filter="${x}" aria-pressed="${i === 0}">${x}${icon("arrow-right")}</button>`).join("")}</div><p>Something else on your mind?</p><a class="text-link" href="support.html">Talk to us ${arrow}</a></aside><div><p id="faq-count" class="result-count" role="status">9 questions</p>${faqs.map(faqItem).join("")}<div class="empty-state" hidden>${icon("search")}<h2>No matching questions.</h2><p>Try a different phrase or contact our team.</p><button class="button secondary" id="reset-search">Clear search</button></div></div></section><section class="contact-band container"><div><h2>Still have a question?</h2><p>We’re here to help you get back to your routine.</p></div><a class="button primary" href="support.html">Contact support ${arrow}</a></section>`,
);

const supportContent = `<section class="page-intro container"><span class="eyebrow">CONTACT & SUPPORT</span><h1>Let’s get you<br>back on track<span class="accent">.</span></h1><p>A question, an idea, or something not quite right?<br>We’d like to hear from you.</p></section><section class="container contact-layout section-bottom"><aside><div class="support-note">${icon("messages-square")}<h2>Real help.<br>From the FYNX team.</h2><p>We typically reply within 24–48 hours on weekdays.</p><a class="text-link email-link" href="mailto:support@elhamamini.cc">support@elhamamini.cc ${arrow}</a></div><div class="support-note"><h3>Reporting an issue?</h3><p>Include your device model, iOS version, app version, and what happened. A few details help us get to the answer faster.</p></div><div class="support-note"><h3>A billing question?</h3><p>Apple manages purchases and subscriptions.</p><a class="text-link" href="https://reportaproblem.apple.com/">Apple purchase support ${arrow}</a></div></aside><form class="contact-form" action="https://formspree.io/f/mwprqlwd" method="POST"><h2>Send us a message.</h2><input type="hidden" name="_subject" value="FYNX Support"><div class="honeypot" aria-hidden="true"><label>Leave this empty<input name="_gotcha" type="text" tabindex="-1" autocomplete="off"></label></div><div class="form-row"><label>Your name<input name="name" autocomplete="name" placeholder="Alex Morgan" required maxlength="120"></label><label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="254"></label></div><label>What can we help with?<select name="topic"><option>General question</option><option>Technical issue</option><option>Billing & subscriptions</option><option>Feature request</option><option>Android interest</option><option>Privacy request</option></select></label><label>Your message<textarea name="message" rows="7" placeholder="Tell us a little about it…" required minlength="10" maxlength="10000"></textarea></label><p class="form-privacy">Your details are used to respond to your request. <a href="privacy.html">Privacy Policy</a></p><button class="button primary" type="submit">Send message ${icon("arrow-right")}</button><p class="form-status" role="status" hidden></p></form></section>`;
page(
  "support.html",
  "Contact & Support — FYNX",
  "Get help with FYNX, report an issue, or share a feature request.",
  supportContent,
);
page(
  "contact.html",
  "Contact & Support — FYNX",
  "Contact the FYNX support team.",
  supportContent,
);

for (const [file, title, subtitle] of [
  ["privacy.html", "Privacy Policy", "Your information. Your choices."],
  ["terms.html", "Terms of Use", "A clear foundation for using FYNX."],
]) {
  const $ = load(read(`content/${file}`));
  const doc = $(".doc");
  doc.find("h1").remove();
  const date = doc.find(".badge").text();
  doc.find(".badge").remove();
  const headings = [];
  doc.find("h2").each((i, el) => {
    const id = `section-${i + 1}`;
    $(el).attr("id", id);
    headings.push(`<a href="#${id}">${$(el).text()}</a>`);
  });
  page(
    file,
    `${title} — FYNX`,
    `${title} for the FYNX iOS app.`,
    `<section class="page-intro container legal-intro"><span class="eyebrow">THE DETAILS</span><h1>${title}<span class="accent">.</span></h1><p>${subtitle}</p><span class="document-date">${icon("calendar-days")}${date}</span></section><div class="container legal-layout section-bottom"><aside><span class="eyebrow">ON THIS PAGE</span><nav aria-label="Document contents">${headings.join("")}</nav><a class="text-link" href="support.html">Have a question? ${arrow}</a></aside><article class="legal-copy">${doc.html()}</article></div>`,
  );
}

const android = `<section class="android-intro container"><span class="platform-icon">${icon("smartphone")}</span><span class="eyebrow">A NEW CHAPTER IS IN THE WORKS</span><h1>FYNX for Android<span class="accent">.</span></h1><p class="hero-line">Good things take a little time.</p><p class="hero-description">Our Android app is in development. We’re working to bring the FYNX toolkit to more traders, on more devices.</p><span class="development-status"><span class="status-dot"></span> In development · Release date to be announced</span><div class="hero-actions"><a class="button primary" href="support.html?topic=Android">Register your interest ${arrow}</a><a class="button secondary" href="index.html">Explore FYNX ${icon("arrow-right")}</a></div><p class="android-note">Already on iPhone? <a href="${store}">Get FYNX on the App Store.</a></p></section><section class="container android-details"><div><span class="eyebrow">SAME FOCUS. NEW PLATFORM.</span><h2>Your process,<br>wherever you are.</h2></div><p>Have an Android device or a feature you’d love to see? Share your device model and ideas with our team.</p></section>`;
page(
  "google-play.html",
  "FYNX for Android — Coming soon",
  "FYNX for Android is in development. Register your interest or explore FYNX for iOS.",
  android,
);
page(
  "android.html",
  "FYNX for Android — Coming soon",
  "FYNX for Android is in development.",
  android,
);
page(
  "404.html",
  "Page not found — FYNX",
  "Find your way back to FYNX.",
  `<section class="page-intro container"><span class="eyebrow">404 / A SMALL DETOUR</span><h1>Let’s get you<br>back on track<span class="accent">.</span></h1><p>This page couldn’t be found.</p><a class="button primary" href="/index.html">Back to FYNX ${icon("arrow-right")}</a></section>`,
);
for (const file of generatedPages) {
  let html = read(file);
  if (file === "404.html")
    html = html.replace("<head>", '<head><base href="/">');
  writeFileSync(resolve(root, file), await format(html, { parser: "html" }));
}
writeFileSync(resolve(root, "assets/lucide-LICENSE"), read("node_modules/lucide-static/LICENSE"));
console.log(`Built ${generatedPages.length} static pages.`);
