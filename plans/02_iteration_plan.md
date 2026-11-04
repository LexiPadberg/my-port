# Plan: Professional Portfolio Website, built in iterations

## Context
You want a sleek, modern portfolio to link from your résumé. It will be styled with the 5-color palette in CLAUDE.md and use only your real information (never invented). The work is split into small iterations so you can review and commit each one before the next starts. Education is now its own section, separate from Experience.

**Decisions made:** React (Create React App) + Tailwind CSS v3 · one scrolling page with smooth-scroll nav · separate Experience and Education sections · downloadable résumé · skills shown as labeled levels (Beginner / Intermediate / Advanced) · contact links only (no form) · hosted on GitHub Pages · projects and awards in one mixed card grid.

**Page order:** Home → Experience → Education → Projects & Awards → Skills → Contact → Footer

## How each iteration works
1. You start the iteration with a prompt. I log it in `PROMPTS.md`.
2. I confirm we're on a non-`main` branch (currently `portfolio_setup`).
3. For section iterations (4–9), I first ask for that section's real content. I build with clearly marked `[placeholder]` text only if you say to go ahead without it.
4. I build only that iteration's scope, update `README.md` if anything changed, and run the iteration's checks.
5. I stop and summarize the changes. You review and commit before the next iteration.

---

## Iteration 1: App setup
- Create React App won't run in a folder that already contains `CLAUDE.md`, so I'll generate it in a temporary folder and move the files into the repo root, keeping `.git`, `CLAUDE.md`, `PROMPTS.md` and `plans/`.
- Remove the demo files (`logo.svg`, `App.css`, demo markup, `reportWebVitals`). Keep `setupTests.js` for testing.
- Install `gh-pages` (dev). Add the `homepage` placeholder and the `predeploy`/`deploy` scripts to `package.json`.
- `App.jsx` renders a single "Coming soon" heading.
- Write the first version of `README.md`: prerequisites, install, start, build, test, deploy.
- **Check:** `npm start` loads the page, `npm test` passes, `npm run build` succeeds.

## Iteration 2: Styling foundation
- Install `tailwindcss@3` (dev) and run `npx tailwindcss init`. Configure `content` paths.
- Theme colors in `tailwind.config.js`: `ivory #F5F2EC`, `mist #DCE4E8`, `dusty #A4B8C6`, `steel #536F85`, `navy #293B4A`.
- Fonts via a Google Fonts `<link>` in `public/index.html`: a serif for headings (default *Fraunces*) and *Inter* for body text, registered as `font-heading` and `font-body`.
- `src/index.css`: Tailwind directives plus base styles: ivory background, navy text, smooth scrolling, `overflow-x: hidden`, visible focus outlines, and an offset so headings aren't hidden behind the sticky nav.
- Shared UI building blocks: `SectionContainer` (fluid max-width wrapper with consistent padding and an alternating ivory/mist background), `SectionHeading`, `ButtonLink` (filled and outlined variants), and `ImageWithFallback`.
- Page `<title>`, meta description and favicon in `public/index.html`.
- **Check:** a temporary sample page shows the colors, fonts and buttons correctly (removed before the iteration ends).

## Iteration 3: Navigation and page structure
- `components/layout/NavBar.jsx`: sticky bar with ivory blur. Links: Home · Experience · Education · Projects · Skills · Contact. Below the tablet width it becomes a hamburger menu that works by keyboard and closes when a link is picked. The current section is highlighted while scrolling (using the browser's `IntersectionObserver`, no package).
- `components/layout/Footer.jsx`: name, current year and social icons (placeholder links).
- `components/ui/icons/`: inline SVG icons for GitHub, LinkedIn, email, external link, menu and close.
- `src/data/navigation_data.js`: section IDs and labels, so the nav and sections share one source.
- Empty section components with correct IDs and alternating backgrounds: `HeroSection`, `ExperienceSection`, `EducationSection`, `ShowcaseSection`, `SkillsSection`, `ContactSection`, all wired into `App.jsx`.
- **Check:** every nav link scrolls to the right section on desktop, tablet and phone widths. No horizontal scroll.

## Iteration 4: Home / landing section
- **Content needed:** full name, headline, 1–2 sentence value statement, short bio, headshot, résumé PDF.
- `src/data/profile_data.js` and `src/assets/images/` (headshot). The résumé goes in `public/resume.pdf`.
- Two columns on desktop (text left, photo right), stacked on mobile. Rounded photo with a dusty-blue accent shape behind it. Buttons: "View my work" (filled) and "Download résumé" (outlined).
- **Check:** the photo loads (and the fallback shows if it doesn't), the résumé downloads, and the layout holds at 375 / 768 / 1280 px.

## Iteration 5: Experience section
- **Content needed:** for each job: title, employer, start and end dates, location, and 2–4 things you did or achieved.
- `src/data/experience_data.js`, `components/ui/TimelineItem.jsx` (built to be reused by Education).
- A vertical timeline with a dusty-blue line, newest job first.
- **Check:** text wraps cleanly on mobile, and dates and titles stay aligned.

## Iteration 6: Education section (separate)
- **Content needed:** school(s), degree or program, field of study, dates or expected graduation, and optional extras such as GPA, honors, relevant coursework or certifications. Tell me which extras you want shown.
- `src/data/education_data.js`. Reuses `TimelineItem`, or a compact card layout if there are only one or two entries.
- **Check:** same responsive checks as Experience.

## Iteration 7: Projects & Awards showcase
- **Content needed:** for each of the 3 items: whether it's a project or award, title, description, technologies, GitHub URL, screenshot (if any) and date.
- `src/data/showcase_data.js`, `components/ui/ShowcaseCard.jsx`, `components/ui/TechTag.jsx`.
- One mixed grid of 1 / 2 / 3 columns (phone / tablet / desktop). Each card has an image (or a palette placeholder), a "Project" or "Award" badge, title, description, tech tags and a GitHub link. Empty fields are hidden automatically. External links open in a new tab.
- **Check:** every GitHub link opens the right repo, the cards are equal height, and images fall back correctly.

## Iteration 8: Skills section
- **Content needed:** skills grouped by category (e.g. Languages, Tools, Software), each with your level (Beginner / Intermediate / Advanced), plus where you used it if you want that shown.
- `src/data/skills_data.js`, `components/ui/SkillLevelIndicator.jsx` (a 3-segment bar plus the level word, so it's readable without color).
- Category cards in a responsive grid.
- **Check:** the levels match your data, and the indicator is readable on mobile.

## Iteration 9: Contact section
- **Content needed:** email, LinkedIn URL, GitHub URL, and optionally phone or location. Placeholders stay until you approve them.
- `src/data/contact_data.js`, shared with the footer icons.
- A short call-to-action line and link cards (mailto, LinkedIn, GitHub).
- **Check:** the mailto link opens an email, social links open correctly, and the footer uses the same data.

## Iteration 10: Final polish and deployment
- Proofread all text. Run a full responsive pass and check every link and image.
- Expand the smoke test: the app renders and every section heading is present.
- Run Lighthouse (Accessibility and Best Practices ≥ 90) and fix any issues.
- Set the real `homepage` URL (needs your GitHub username and repo name). Finalize the README, including deployment steps you'll run yourself.

---

## Standing quality rules (every iteration)
- Fluid layouts only (`max-w-*`, grid/flex, percentages). No fixed pixel widths, horizontal scroll or overlapping content.
- Headings and body text in navy, links and buttons in steel blue, dusty blue for decoration only (too light to read as text).
- All images have alt text. External links use `target="_blank" rel="noopener noreferrer"`.
- Content lives in `src/data/` (files named with underscores). Components use PascalCase.
- Only the packages listed above: `tailwindcss@3` and `gh-pages`.
- Plain, recruiter-friendly wording. Nothing invented.

## Verification (end of each iteration)
- `npm start` and check at 375 px, 768 px and 1280 px+ in browser DevTools.
- `npm test` and `npm run build` both pass.
- Click through every link added in that iteration.
