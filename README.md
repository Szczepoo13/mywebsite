# websiteszczep

Personal website of Szczepan Gurgul - blockchain researcher and software engineer.

Built with Astro, TypeScript, Tailwind CSS, and Markdown content collections. Styled as a technical
engineering surface - a homage to the old Curve Finance UI (muted panel background, Windows-98-style
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

Bio, Education, Stack, Projects, and Publications are real, pulled from the CV. Blog is still
lorem-ipsum placeholder content (`src/content/blog/*.md`) - replace or delete once real posts exist.

## Development

```
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Deployment

Deployed via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages as a project site at
`https://Szczepoo13.github.io/mywebsite/`. Every push to `main` triggers a build + deploy.

Because this is a project site (not `Szczepoo13.github.io` itself), Astro's `base` is set to
`/mywebsite/` in `astro.config.mjs` — every internal link in the codebase uses
`import.meta.env.BASE_URL` rather than a hardcoded `/` so it resolves correctly under that subpath.

One manual step outside this repo: in the GitHub repo's Settings → Pages, the source must be set
to "GitHub Actions" (not "Deploy from a branch") for the workflow to publish anything.

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
- ✅ GitHub Pages deployment (GitHub Actions workflow)

Future

- ⬜ SEO
- ⬜ Performance improvements
