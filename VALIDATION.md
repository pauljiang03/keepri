# Website validation

September 11, 2026. Closed-beta investor revision.

- TypeScript check passed.
- Oxlint passed for app source, page motion, and publishing scripts. Native img tags have a scoped documented exception because this is a static GitHub Pages export without an image optimization server.
- Production export prerendered the homepage with zero skipped routes. `npm run prepare:pages` stages only the public output in `docs/`.
- Static validation passed for26 local asset/anchor references, primary content, and repository path prefixes.
- Source and generated output contain no public installation links, signup CTAs, or release dates. Metadata now describes the closed beta.
- Tastemaker anti-slop and component-coherence scans passed. Motion audit reported one medium heuristic: center transform origin on the decorative ribbon. This is intentional for an unanchored geometric composition; it is not a popover or menu. No high findings.
- Contrast matrix passed for all text pairings actually used:4.85:1 minimum. Decorative clay shapes and low-contrast hairline separators carry no text or state.
- Source review covered320px through desktop responsive rules, anchor targets, focus, image dimensions and crop coordinates, no-JavaScript content, and reduced-motion cleanup. Browser viewport/interaction acceptance was not performed. The reference site's social preview and native product images were visually inspected; reference browser screenshots were unavailable.
- Original app images and logo are unchanged. No proposal PDF, private app source, research records, or credentials are in the public output.
- The research program, rewards and expanded competition are described as future work. No customer, revenue, funding or institutional endorsement is claimed.
- The pinned starter continues to report11 dependency advisories in development/build dependencies. Only static files are deployed; review the server dependency tree before introducing a public dynamic runtime.

GitHub publication status and remote HTML/asset hash verification are recorded separately in the parent workspace release record. This file does not claim browser or physical-device verification.
