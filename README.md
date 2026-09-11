# KeepRI website

Startup website for **KeepRI: Keep Reasoning Independently**.

[Website](https://pauljiang03.github.io/keepri/)

The site opens with three interactive, full-screen statements before the main KeepRI site. It leads with independent thought without AI, supported by free reasoning play, competition and prizes. The proposed industry business sells licensed, separately consented human learning data and research collections. Public status is Closed beta. Personal biographies, personal contact links, named games, game screenshots, and installation links are excluded.

Each scroll gesture or touch swipe advances one full-screen statement. Whole-sentence blends, chapter links and a visible skip control remain. After entry, the intro is removed, so scrolling upward stops at the main site. The player experience uses four spacious text rows; native expandable disclosures explain research deliverables. The owner requested removal of the trophy, arena and assembly artwork. Main-site fades and progress remain subtle, and reduced motion uses instant chapter changes. Without JavaScript, all copy remains readable in native sections.

## Develop

Requires Node 24 and npm.

```sh
npm ci
npm run dev
```

Edit `app/page.tsx` for content, `app/globals.css` for design, and `DESIGN.md` for the design contract. Assets and fonts are local. Font licenses are included in `public/fonts/`.

## Build and publish

```sh
npm run prepare:pages
git add .
git commit -m "Update KeepRI website"
git push
```

GitHub Pages publishes the `docs/` directory on the `main` branch. `npm run prepare:pages` runs the gesture regression tests, checks types, builds the site, checks its static asset/anchor paths, and stages the public output in `docs/`. Commit and push that output to publish. There is no production application server. `prepare-static.mjs` normalizes Vinext's prefixed asset output for project Pages.

The current GitHub connection does not have the OAuth `workflow` scope. A future automatic build workflow is retained as `deployment/github-pages.yml.example`; it is not active or required for publication.

## Add a domain later

After purchasing a domain, configure it in this repository's **Settings → Pages**, verify ownership, and set the DNS records GitHub provides. Build with an empty `PAGES_BASE_PATH` and `SITE_URL` set to the new HTTPS origin using `npm run stage:pages`; preserve the verified domain in `docs/CNAME`, then commit and push. Enable HTTPS once GitHub has issued the certificate. Do not add a CNAME for a domain that is not yet owned. Keep the new URL settings in the publish command or a documented release script for later updates.

## Dynamic features later

GitHub Pages serves HTML, CSS, and JavaScript. Browser interactions can run here. Authentication, stored progress, leaderboard writes, and research uploads need a backend.

Keep this marketing site on Pages and call a separate authenticated HTTPS service when one is implemented, or move the frontend to Cloudflare Workers/Pages with server functions. The existing Python/SQLite app backend needs an appropriate persistent host; moving the marketing site does not deploy that backend. Reassess and update the starter's server/build dependencies before introducing a public runtime.

Sources: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages), [Cloudflare Functions](https://developers.cloudflare.com/pages/functions/).

## Data and scope

This website has no analytics, signup form, research enrollment, or upload endpoint. No email address or individual contact details are published. GitHub processes hosting request metadata under its own [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). The owner requested removal of the visitor disclosure and its footer link. The separate app-policy site is not changed by this website revision.

The native app, internal business backlog, and fundraising PDF are not included in this website repository. The broader implementation roadmap remains in the parent KeepRI workspace's `TODO.md`.

Design guidance: [jakubkrehel/skills](https://github.com/jakubkrehel/skills), specifically better-layout, better-typography and better-ui for this refinement; [Tastemaker](https://github.com/codeswithroh/tastemaker), following the owner's [Virio](https://www.virio.ai/) reference. The initial implementation used [garden-skills / web-design-engineer](https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer) and [xiaopu-ai/web-design](https://github.com/xiaopu-ai/web-design). See `brand-spec.md` for asset provenance and `.tastemaker/style-lock.md` for the current design contract.

Artwork origins and checked usage terms are recorded in [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md).
