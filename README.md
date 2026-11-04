# Personal Portfolio

A one-page professional portfolio website built with React (Create React App).
It is being built in iterations. See `plans/02_iteration_plan.md` for the roadmap.

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (v20 or newer) and npm.
  On Windows, install Node inside WSL (for example with [nvm](https://github.com/nvm-sh/nvm)),
  not the Windows installer, so it works with files in your Linux home folder.

## Install

```bash
npm install
```

## Run locally

```bash
npm start
```

Opens the site at [http://localhost:3000](http://localhost:3000). The page reloads when you save changes.

## Run tests

```bash
npm test
```

Runs the tests in watch mode. Press `q` to quit. To run them once, use `CI=true npm test`.

## Build for production

```bash
npm run build
```

Creates an optimized version of the site in the `build/` folder.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Builds the site and publishes the `build/` folder to a `gh-pages` branch on GitHub.
Then, in the GitHub repo, go to **Settings → Pages** and set the source to the `gh-pages` branch.
The site uses relative paths (`"homepage": "."` in `package.json`), so it works at any GitHub Pages URL.

## Project structure

```
public/                    HTML page shell, favicon, and static files
  resume.pdf               Résumé offered by the "Download résumé" button
src/
  App.jsx                  Page layout: nav, bento grid of tiles, footer
  index.js                 App entry point
  index.css                Global styles (Tailwind + base styles)
  data/                    ← Edit your content here (no code knowledge needed)
    navigation_data.js     Section IDs and nav link labels/order
    profile_data.js        Name, headline, tagline, value statement, bio, photo, résumé link
    experience_data.js     Jobs (plain-language paragraphs, highlighted stat, tech tags)
    education_data.js      Degrees (newest first), GPA, graduation dates, capstone note
    showcase_data.js       Projects and awards shown as cards
    skills_data.js         Skill categories + levels, certifications, security clearance
    contact_data.js        Email, LinkedIn, and GitHub (Contact tile + footer)
  assets/images/           Photos (headshot.jpg is a 900×900 square crop)
  components/
    layout/                NavBar (sticky, mobile menu) and Footer
    sections/              One component per page section (each is a bento tile)
    ui/                    Reusable building blocks
      BentoTile.jsx          Rounded grid tile with background, fade-in, and hover shadow
      SectionHeading.jsx     Section title with label and accent line
      ButtonLink.jsx         Link styled as a filled or outlined button
      ImageWithFallback.jsx  Image that shows a placeholder if it fails to load
      TimelineItem.jsx       One dated entry on a vertical timeline (used for jobs)
      TechTag.jsx            Small pill label for a technology or skill
      ShowcaseCard.jsx       Project/award card (screenshot, badge, tags, GitHub link)
      SkillLevelIndicator.jsx  3-segment bar + level word (Beginner/Intermediate/Advanced)
      icons/                 Small inline SVG icons
  hooks/
    useActiveSection.js    Highlights the nav link for the section on screen
    useRevealOnScroll.js   Fades tiles in as they scroll into view
tailwind.config.js         Color palette and fonts
plans/                     Approved plans for each stage of work
PROMPTS.md                 Log of requests made during development
```

## Styling

Styling uses [Tailwind CSS v3](https://v3.tailwindcss.com/). The site palette is defined in
`tailwind.config.js`. Use these color names instead of hex codes:

| Name     | Hex       | Use                                        |
| -------- | --------- | ------------------------------------------ |
| `ivory`  | `#F5F2EC` | Main page background                       |
| `mist`   | `#DCE4E8` | Alternate section backgrounds and accents  |
| `dusty`  | `#A4B8C6` | Decoration and tile backgrounds (never as text color) |
| `steel`  | `#536F85` | Buttons and links                          |
| `navy`   | `#293B4A` | Headings, body text, and contrast elements |

Fonts: **Fraunces** for headings (`font-heading`) and **Manrope** for body text (`font-body`),
loaded from Google Fonts in `public/index.html`.

## Updating your content

- **Text** (name, headline, bio, etc.): edit `src/data/profile_data.js`.
- **Jobs**: edit `src/data/experience_data.js`. Each job is a few short paragraphs, with an optional
  highlighted number (`keyStat`) and tech tags. `isCompact: true` shows a smaller entry.
- **Education**: edit `src/data/education_data.js`. `isInProgress: true` shows an "In progress"
  badge. `capstoneProject` links to a card in Projects & Awards.
- **Projects & awards**: edit `src/data/showcase_data.js`. Set `type` to `"project"` or `"award"`;
  leave out `technologies`, `githubUrl`, or `images` and that part of the card is hidden.
  Add screenshots as `images: [{ src, alt }]`; with two or more, the card shows dots to switch.
- **Skills & certifications**: edit `src/data/skills_data.js`. Set each skill's `level` to
  `"Beginner"`, `"Intermediate"`, or `"Advanced"` (or `null` to hide the indicator).
  Set `securityClearance` to `null` to hide the clearance badge.
- **Photo**: replace `src/assets/images/headshot.jpg` (square, about 900×900, under ~200 KB).
- **Résumé**: replace `public/resume.pdf`. To hide the download button, set `resumeHref: null`
  in `profile_data.js`. Note: this file is public, so anyone can download it.

## Layout

The page is a **bento grid**: rounded tiles of different sizes (one column on phones, 6 on
tablets, 12 on desktop). Tile sizes and positions are set in `TILE_LAYOUT` in `src/App.jsx`.
Tiles fade in as you scroll (skipped for visitors whose device asks for reduced motion).

## Tile colors and readability

Each tile has a `background` of `ivory`, `mist`, `dusty`, or `navy`. Inside tiles, use the
**tone** colors (`text-tone-heading`, `text-tone-body`, `text-tone-accent`, `bg-tone-button`, …).
They switch automatically so text stays readable on every background, for example light text and
ivory buttons on the navy tile, and navy instead of steel-blue labels on mist and dusty tiles.
The values are defined in `src/index.css`.
