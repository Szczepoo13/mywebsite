# websiteszczep

Personal website of Szczepan Gurgul — blockchain researcher and software engineer.

Built with Astro, TypeScript, Tailwind CSS, and Markdown content collections. Styled as a technical
engineering surface — a homage to the old Curve Finance UI (muted panel background, Windows-98-style
outset/inset bevels, flat classic-hyperlink blue, monospace type) rather than a marketing landing page.
Deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) (TypeScript, strict mode)
- [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`)
- Astro content collections (Markdown) for blog / projects / publications
- GitHub Pages for hosting

## Site structure

Kept deliberately small: Home (bio, education, publications), Blog, Projects. GitHub and LinkedIn
live in the footer rather than a dedicated Contact page.

## Content

Blog and Projects each ship with one placeholder entry (`src/content/*/example-*.md`) to prove the
collection renders end to end — replace or delete before launch. Publications are pulled from the
same kind of collection and rendered on the homepage. Still pending real copy (all marked `TODO` in
code): the bio paragraph, the Education line, and the LinkedIn URL in the Footer.

## Development

```
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Roadmap

Completed

- ✅ Project initialization (Astro + TypeScript strict + Tailwind v4)
- ✅ Navigation
- ✅ Homepage
- ✅ Footer
- ✅ Blog (content collection)
- ✅ Projects (content collection)
- ✅ Publications (on homepage)
- ✅ Retro (old Curve UI) visual theme
- ✅ Site structure simplified (Home / Blog / Projects, GitHub+LinkedIn in footer)

Next

- ⬜ GitHub Pages deployment

Future

- ⬜ SEO
- ⬜ Performance improvements
