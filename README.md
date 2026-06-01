# SBA Buyers Agency Website

Premium Astro + Tailwind marketing site for SBA Buyers Agency.

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

If npm reports `UNABLE_TO_VERIFY_LEAF_SIGNATURE` on this machine, use the one-time local install workaround:

```bash
npm install --strict-ssl=false
```

## Add A Blog Post

Create a new Markdown file in `src/content/blog/`.

Required frontmatter:

```md
---
title: "Post title"
description: "Short summary for cards and SEO."
pubDate: 2026-05-31
category: "Property Education"
seoTitle: "Optional SEO title"
seoDescription: "Optional SEO description"
---
```

Allowed categories:

- `Regional Victoria Property`
- `Property Education`
- `Women & Wealth`
- `Market Commentary`

The post will automatically appear in the Articles section on `/resources`.

## Add A Resource

Edit the arrays at the top of `src/pages/resources.astro`.

- Add free guides to `guides`
- Add calculators to `calculators`
- Add quizzes to `quizzes`
- Add insight categories to `insights`

## Add A Lead Magnet

Place the final PDF in `public/resources/`, then update the matching guide card in `src/pages/resources.astro` to link to that file or to the email form provider.

Recommended future setup:

- Connect guide buttons to an email marketing form.
- Store submissions in the CRM or email platform.
- Replace placeholder copy with the final PDF title and delivery flow.

## Deployment To Vercel

1. Push this folder to a GitHub repository.
2. Log in to Vercel.
3. Click `Add New Project`.
4. Import the GitHub repository.
5. Use these settings:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy.
7. In Vercel, go to Project Settings > Domains.
8. Add `sbabuyersagency.com` and `www.sbabuyersagency.com`.
9. Update DNS records at the domain registrar using Vercel's instructions.

## Deployment To Netlify

1. Push this folder to a GitHub repository.
2. Log in to Netlify.
3. Click `Add new site` > `Import an existing project`.
4. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy.
6. Add `sbabuyersagency.com` under Domain Management.
7. Update DNS records at the registrar using Netlify's instructions.

## Content To Confirm Before Launch

- Confirm whether Sarah's property mistake figure is `$350,000` or `$50,000`.
- Add final logo files.
- Add natural-light Sarah portrait and regional Victoria imagery.
- Replace placeholder testimonials with approved client quotes.
- Connect lead magnets to the email platform.
- Confirm final Facebook and LinkedIn URLs.
