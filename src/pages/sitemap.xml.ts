import { getCollection } from 'astro:content';

const staticPages = [
  '/',
  '/start-here/',
  '/about-sarah/',
  '/services/',
  '/method/',
  '/resources/',
  '/contact/',
];

export async function GET({ site }) {
  const base = site ?? new URL('https://www.sbabuyersagency.com');
  const posts = await getCollection('blog');
  const urls = [
    ...staticPages,
    ...posts.map((post) => `/blog/${post.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${new URL(url, base).toString()}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
