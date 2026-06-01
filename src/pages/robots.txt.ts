export function GET({ site }) {
  const base = site ?? new URL('https://www.sbabuyersagency.com');

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${new URL('/sitemap.xml', base).toString()}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
