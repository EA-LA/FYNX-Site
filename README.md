# FYNX App Website

Static app marketing and support website for site.fynxfinanceworld.com.

## Development

Run `npm ci`, then `npm run build` to generate the HTML pages from
`scripts/build.mjs`. Shared styles and browser interactions live in `assets/`.
Run `npm run check` to validate all local links, assets, document anchors,
policy text preservation, and the support endpoint.

The generated HTML is committed and works without a build server. Open
`index.html` to preview, or serve this directory using a local static server.
The contact form uses the existing Formspree endpoint and needs an internet
connection to send. Never submit test requests to the production support inbox.

Original privacy and terms documents are retained in `content/` as build
sources. Their substantive wording and effective dates are preserved.

Lucide icons are embedded at build time; no runtime CDN is required.
`android.html` and `contact.html` retain useful direct-entry URLs.
