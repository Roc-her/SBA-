/** Site CTA gold gradient — use on buttons; Vexur primary colour is solid only. */
export const gradGold =
  'linear-gradient(135deg, #E4C97E 0%, #C2A05B 45%, #9C7C38 100%)' as const;

/** Best single hex for Vexur “Primary colour” picker (mid-tone of gradGold). */
export const vexurPrimaryColor = '#A4853F';

/** Shared Vexur embed settings */
export const vexurEmbed = {
  agentId: '138ad568-71f5-4210-8578-418c138b745c',
  loader: 'v2',
  theme: 'light',
  primaryColor: vexurPrimaryColor,
  scriptSrc: 'https://embed.vexur.com.au/v1.1.4/loader.js',
  scriptIntegrity:
    'sha384-RoAkctLKXQcPKL41H7otn69Qv8gal1dG8Tz7ka/3PpTIltFaPfJhrHUIqanA7F9V',
  embedOrigin: 'https://embed.vexur.com.au',
} as const;

export const vexurCalendar = {
  ...vexurEmbed,
  buildId: 'calendar-07fc20c5',
  renderer: 'calendar-render-v2',
  version: '2026-06-02T08:23:01.347892+00:00',
} as const;

export const vexurContactForm = {
  ...vexurEmbed,
  formId: 'af2182b4-9700-439d-a73d-6874a84cdeba',
  formWidgetBuildId: 'form-af2182b4-9700-439d-a73d-6874a84cdeba',
  version: '2026-06-02T08:24:18.754+00:00',
} as const;

/** Pages where #book-call is not available on first paint (use full URL). */
export const bookCallFallbackHref = '/start-here#book-call';

export function bookCallHref(pathname: string): string {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/resources/property-readiness-quiz') {
    return bookCallFallbackHref;
  }
  return '#book-call';
}
