# Plan: Professional Portfolio Website (structure and setup only)

## Context
You want a sleek, modern portfolio to link from your résumé. It needs a landing section, a projects/awards showcase, skills with proficiency levels, work experience, and contact info, styled with the 5-color palette in CLAUDE.md. The repo is empty except CLAUDE.md. This plan covers the architecture and setup. Real content (bio, jobs, projects, skills) is still to come from you, and nothing will be invented (per CLAUDE.md).

**Decisions made:** React (Create React App) + Tailwind CSS v3 · one scrolling page with smooth-scroll nav · Experience section + downloadable résumé · skills shown as labeled levels (Beginner / Intermediate / Advanced) · contact links only (no form) · hosted on GitHub Pages · projects and awards in one mixed card grid.

## Housekeeping steps (first, after approval)
1. Create `PROMPTS.md` and log today's prompt(s) with timestamps (couldn't do this during planning, since files can't be changed then).
2. Save this plan as `plans/01_portfolio_setup.md`.
3. Create branch `portfolio_setup` (never work on `main`).

## Setup
- Create React App refuses to run in a folder that already contains `CLAUDE.md`, so generate it in a temporary folder and move the files into the repo root. Keep the existing `.git`.
- Remove the CRA demo files (spinning logo, `App.css` sample, `logo.svg`, etc.).
- Packages to add, and only these:
  - `tailwindcss@3` (dev). Its tools (PostCSS, Autoprefixer) are already part of CRA.
  - `gh-pages` (dev): for the `npm run deploy` script.
  - No icon library. The few icons needed (GitHub, LinkedIn, email, external link) will be small inline SVG components.
- `tailwind.config.js`: add the palette as named colors: `ivory #F5F2EC`, `mist #DCE4E8`, `dusty #A4B8C6`, `steel #536F85`, `navy #293B4A`. Add font families too.
- Fonts: load via Google Fonts `<link>` in `public/index.html`. Default pairing: a refined serif for headings (e.g. *Fraunces* or *DM Serif Display*) + *Inter* for body text.
- `package.json`: `"homepage": "https://<github-username>.github.io/<repo-name>"`, plus the `predeploy`/`deploy` scripts.

## Folder structure (content is kept separate from presentation)
```
public/
  index.html            title, meta description, fonts, favicon
  resume.pdf            (you provide)
src/
  data/                 ← all your content lives here, no JSX
    profile_data.js     name, headline, value statement, bio, photo path
    experience_data.js  jobs: title, employer, dates, location, highlights[]
    showcase_data.js    projects + awards: type, title, description,
                        technologies[], githubUrl?, liveUrl?, image?, date?
    skills_data.js      grouped categories → { name, level }
    contact_data.js     placeholders until you approve real info
  assets/images/        headshot, project screenshots
  components/
    layout/   NavBar.jsx (sticky, mobile hamburger), Footer.jsx
    sections/ HeroSection, ExperienceSection, ShowcaseSection,
              SkillsSection, ContactSection
    ui/       SectionHeading, ShowcaseCard, TechTag, SkillLevelIndicator,
              ExperienceItem, ButtonLink, ImageWithFallback, icons/
  App.jsx   renders NavBar + sections in order
  index.css Tailwind directives + base styles (smooth scroll, overflow-x guard)
```
Data files use underscores in their names, per your naming rule. Component files use PascalCase, the React convention.

## Section design
- **NavBar**: sticky with a light ivory blur. Links: About · Experience · Projects · Skills · Contact. Collapses to a hamburger menu on mobile. The current section is highlighted while scrolling.
- **Hero / Home**: two columns on desktop (text left, photo right), stacked on mobile. Includes name, headline, a 1–2 sentence value statement, and buttons: "View my work" (steel blue) and "Download résumé" (outlined). The photo is circular or rounded with a dusty-blue accent shape behind it.
- **Experience**: a vertical timeline with a dusty-blue line. Each entry shows role, employer, dates, and 2–4 plain-language highlights.
- **Projects & Awards (mixed grid)**: 1 / 2 / 3 columns (mobile / tablet / desktop). Each card shows a screenshot (or a tasteful palette placeholder if none), a small "Project"/"Award" badge, title, description, tech tags, and a GitHub link. For awards, the GitHub and tech fields are hidden automatically when empty.
- **Skills**: category cards (e.g. Languages, Frameworks, Tools) on a mist-blue background. Each skill gets a 3-segment indicator plus the level word, so it's readable even without color.
- **Contact**: a short call-to-action line and link cards for email (mailto), LinkedIn, and GitHub. They show placeholders until you approve the real details.
- **Footer**: name, year, and repeated social icons.
- Sections alternate ivory and mist backgrounds for rhythm. Headings use navy, links and buttons use steel blue, and dusty blue is for decoration only.

## Quality rules built in
- Every layout uses fluid widths (`max-w-*` containers, grid/flex, percentages) and `overflow-x: hidden` on the page root. No fixed pixel widths.
- `ImageWithFallback` shows a placeholder if an image fails to load, so no image ever appears broken.
- All external links use `target="_blank" rel="noopener noreferrer"`.
- Every image has alt text. Keyboard focus is visible. The mobile menu is accessible by keyboard and closes when you pick a link.
- Steel blue on ivory passes the readable-contrast standard (~4.7:1). Dusty blue is too light for text and will only be used for decoration.

## README.md
Will cover: prerequisites (Node), `npm install`, `npm start`, `npm run build`, `npm run deploy`, and where to edit content (`src/data/`). It will be updated whenever the app changes.

## Content I still need from you
1. Full name, headline/title, a short bio, and your value statement (or raw notes for me to tidy).
2. Professional headshot (JPG/PNG, ideally square, at least 800px).
3. Each job: title, employer, dates, location, and what you did or achieved.
4. Education, if you want it shown. Please confirm: should it be its own section or part of Experience?
5. The 3 projects/awards: title, description, technologies, GitHub URL, screenshot, date.
6. Skills grouped by category, each with your level (Beginner / Intermediate / Advanced).
7. Résumé PDF.
8. Contact links (email, LinkedIn, GitHub). Placeholders until approved.
9. GitHub username + repo name, for the GitHub Pages URL.

## Verification
- `npm start` → check in browser DevTools at 375px, 768px, and 1280px+: no horizontal scroll, no overlapping content, the menu works on mobile.
- Click every nav link, button, and external link. Confirm the résumé downloads.
- Rename an image temporarily → confirm the fallback appears.
- `npm test`: a smoke test that the app renders and each section heading is present.
- `npm run build` runs without warnings. Run a Lighthouse check (Accessibility and Best Practices ≥ 90).
- Proofread all text (spelling and grammar) before handing back.
