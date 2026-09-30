import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { load } from "cheerio";

const root = resolve(import.meta.dirname, "..");
const pages = readdirSync(root).filter((file) => file.endsWith(".html"));
for (const file of pages) {
  const $ = load(readFileSync(resolve(root, file), "utf8"));
  assert.equal($("h1").length, 1, `${file}: one main heading`);
  assert.equal($("#main").length, 1, `${file}: main landmark`);
  const ids = $("[id]")
    .map((_, el) => $(el).attr("id"))
    .get();
  assert.equal(new Set(ids).size, ids.length, `${file}: unique IDs`);
  $("a[href], img[src], script[src], link[href]").each((_, element) => {
    const href = $(element).attr("href") || $(element).attr("src");
    if (/^(https?:|mailto:)/.test(href)) return;
    const url = new URL(href, `https://example.com/${file}`);
    const target = decodeURIComponent(url.pathname).slice(1) || "index.html";
    assert(existsSync(resolve(root, target)), `${file}: missing ${target}`);
    if (url.hash) {
      const destination = load(readFileSync(resolve(root, target), "utf8"));
      assert(
        destination(`[id="${url.hash.slice(1)}"]`).length,
        `${file}: missing anchor ${href}`,
      );
    }
  });
}
for (const file of ["privacy.html", "terms.html"]) {
  const original = load(readFileSync(resolve(root, "content", file), "utf8"));
  original(".doc h1, .doc .badge").remove();
  const redesigned = load(readFileSync(resolve(root, file), "utf8"));
  const normalize = (str) => str.replace(/\s+/g, " ").trim();
  assert.equal(
    normalize(original(".doc").text()),
    normalize(redesigned(".legal-copy").text()),
    `${file}: policy wording unchanged`,
  );
}
const support = load(readFileSync(resolve(root, "support.html"), "utf8"));
assert.equal(support("form").attr("action"), "https://formspree.io/f/mwprqlwd");
assert.equal(support("[name=email]").attr("type"), "email");
assert.equal(support("[required]").length, 3);
console.log(
  `PASS: ${pages.length} pages, local assets, internal links, anchors, policy wording, and contact endpoint.`,
);
