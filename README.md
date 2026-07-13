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

## Content

Blog, Projects, and Publications each ship with one placeholder entry (`src/content/*/example-*.md`)
to prove the collection renders end to end. Replace or delete these before launch. The homepage bio
copy is also a first draft — see the `TODO` comment in `src/pages/index.astro`.

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
- ✅ Publications (content collection)
- ✅ Contact
- ✅ Retro (old Curve UI) visual theme

Next

- ⬜ GitHub Pages deployment

Future

- ⬜ SEO
- ⬜ Performance improvements
