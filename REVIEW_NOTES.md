# Portfolio review notes

Items that need the author's confirmation before this is deployed.

## Employment
- **SP Financial Services (GenAI Full-Stack Technical Lead, "Feb 2026 – Present")**: not on the Sep 2026 resume. It overlaps Integrated Softtech and HR Footprints. It is rendered under "Other engagements" as "From Feb 2026" with no "Present". Confirm status, hours, and end date, or delete it from `src/data/experience.ts` (`otherExperience`).
- **Freelance ("Jul 2025 – Present")**: not on the latest resume. Rendered as "From Jul 2025". Confirm whether still active.
- **Cognizant (May–Sep 2025) and Prakash Innovative Universe (Jan–Mar 2025)**: on the Nov 2025 resume, dropped from the Sep 2026 resume. Kept as earlier experience. The 30% response-time claim for Prakash was dropped from the site. Re-add it only if you can support it.
- **"Starups" (Technical Team Lead, Jul 2024 – Jul 2025)**: **not rendered.** It is on no resume, overlaps Prakash, Cognizant, and your 2022–2025 degree, and claims "30% delivery efficiency". The spelling may be the company's real name. The data was removed from the file, with a comment explaining why.
- Integrated Softtech previous-resume detail (Merlion Cruise, VKR Groups) is not on the Sep 2026 resume and was not used.

## Projects
- **CodeMigrator AI (COBOL→Python)**: no repository, files, or notes found locally or under github.com/Taran1508. **Not on the site.** Send the repo or a description and I will add it.
- **AI Meeting Assistant**: same. No evidence of an implementation. **Not on the site.**
- **GitAI**: checked against local source. Claims are limited to what the code shows (in-memory `MemoryVectorStore`, Llama 3, `nomic-embed-text`, CLI). React is on your resume but there is no React UI in the local repo, so it is not listed. Add it back if there is a UI.
- **Cera**: checked against local source. It has no commits and no public repo, so there is no "Source" link. The code has both an Express API (`src/api`) and a Fastify server (`src/server`). Storage is local JSON. The card says "Working prototype, in progress". Confirm the status wording and whether you want to publish the repo.
- **express-brute-guard**: npm v1.0.0 exists and is published. The GitHub README is nearly empty. The in-memory store and per-IP tracking come from the source tree and the GitAI screenshot, and the auto-reset on successful login comes from your resume. Confirm that behavior in the code.
- **GPTech Academy / AHVC**: both live URLs return 200. The "problem" and "role" text is inferred from the old card copy. Edit it to match what actually happened.
- Removed from the page (were already commented out or low-signal): Cipher (in progress, no link), Fresk and URL Shortener (previously commented out).

## Contact and links
- Phone number removed from the site (not in your verified contact list). Instagram, Snapchat, and the anime quote were removed.
- **Contact form**: still posts to Formspree (`xpqbronq`), now with validation, a honeypot, accessible status messages, and a mailto fallback. **I did not submit it**, so delivery is untested. Send one test message after deploying.
- Resume: `public/Taran_Mesala_Resume.pdf` is a copy of `taran-res-sept.pdf` from your resume folder. It contains your phone number and will be publicly downloadable. Replace the file if you want a version without it. The old Google Drive link is no longer used.

## Deployment
- No `next.config`, `vercel.json`, or `.github` exists, so Vercel builds with defaults. Nothing here changed that.
- The site is fully static (no server-only features), so a future GitHub Pages deploy could use `output: 'export'` with `images.unoptimized: true`, a `basePath` if served from a repo subpath, and a Pages workflow. That is a separate decision. `npm run build` is unchanged today.
- Unreferenced large assets remain in `public/` (`output-onlinepngtools.png` 2.5 MB, `portfolio-bg.jpg` 2.5 MB, `urlshort.png`, `weather.png`, `fresk.png`, `mdtohtml.png`, `cipher.png`), plus the empty Hugo-era directories and `legacy_v1/`. They are safe to delete once you confirm Pages doesn't use them.
- ESLint is not configured (`next lint` prompts for setup), so no lint was run.
