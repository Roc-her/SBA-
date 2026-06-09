/** Site CTA gold gradient — use on buttons; Vexur primary colour is solid only. */
export const gradGold =
  'linear-gradient(135deg, #E4C97E 0%, #C2A05B 45%, #9C7C38 100%)' as const;

/** Best single hex for Vexur “Primary colour” picker (mid-tone of gradGold). */
export const vexurPrimaryColor = '#A4853F';

const VEXUR_VERSION = 'v1.1.4' as const;

/** Shared Vexur embed settings */
export const vexurEmbed = {
  agentId: '138ad568-71f5-4210-8578-418c138b745c',
  loader: 'v2',
  theme: 'light',
  primaryColor: vexurPrimaryColor,
  scriptSrc: `https://embed.vexur.com.au/${VEXUR_VERSION}/loader.js`,
  /** Re-verify when widgets stop loading: openssl dgst -sha384 -binary loader.js | openssl base64 -A */
  scriptIntegrity:
    'sha384-eXepP87sFvIOh8ZTJRJL5vkvZAWqCrQWVaEsjBtxbeR39FUaHGcMX03h6xMl3qRm',
  embedOrigin: 'https://embed.vexur.com.au',
  sdkVersion: VEXUR_VERSION,
  runtimeScript: `https://embed.vexur.com.au/${VEXUR_VERSION}/runtime.js`,
  contactScript: `https://embed.vexur.com.au/${VEXUR_VERSION}/widgets/contact.js`,
  calendarScript: `https://embed.vexur.com.au/${VEXUR_VERSION}/widgets/calendar.js`,
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

type RenderWidget = 'contact' | 'calendar';

export type VexurRenderScript = {
  src: string;
  integrity?: string;
};

export type VexurRenderEnvelope = {
  v: number;
  mount_id: string;
  html: string;
  config: {
    widgetId: string;
    agentId: string;
    theme: string;
    primaryColor: string;
    showBranding: boolean;
    consent: string;
    extraParams?: Record<string, string>;
    [key: string]: unknown;
  };
  scripts: VexurRenderScript[];
};

/** Fetch server-rendered widget HTML from Vexur (build / SSR). */
export async function fetchVexurEnvelope(
  widget: RenderWidget,
  width = 800,
): Promise<VexurRenderEnvelope> {
  const response = await fetch(vexurRenderUrl(widget, width), {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Vexur render ${widget} failed: HTTP ${response.status}`);
  }

  const envelope = (await response.json()) as VexurRenderEnvelope;

  if (envelope.v !== 2 || !envelope.html || !envelope.mount_id || !envelope.config) {
    throw new Error(`Vexur render ${widget} returned an invalid envelope`);
  }

  return envelope;
}

/** Mark prerendered HTML so the client loader skips re-fetching it. */
export function preparePrerenderedVexurHtml(html: string, widget: RenderWidget): string {
  if (html.includes('data-vexur-mounted=')) return html;

  return html.replace(
    '<div class="vexur-widget"',
    `<div class="vexur-widget" data-widget="${widget}" data-vexur-mounted="true"`,
  );
}

/** Query string for Vexur /render/{widget} warm-up requests (client + prefetch). */
export function vexurRenderQuery(widget: RenderWidget, width = 800): string {
  const params = new URLSearchParams({
    'agent-id': vexurEmbed.agentId,
    theme: vexurEmbed.theme,
    primaryColor: vexurEmbed.primaryColor,
    showBranding: 'true',
    w: String(Math.max(320, Math.min(900, width))),
    loader: vexurEmbed.loader,
    consent: 'pending',
  });

  if (widget === 'contact') {
    params.set('form-id', vexurContactForm.formId);
    params.set('form-widget-build-id', vexurContactForm.formWidgetBuildId);
    params.set('v', vexurContactForm.version);
  } else {
    params.set('calendar-widget-build-id', vexurCalendar.buildId);
    params.set('renderer', vexurCalendar.renderer);
    params.set('v', vexurCalendar.version);
  }

  return params.toString();
}

export function vexurRenderUrl(widget: RenderWidget, width = 800): string {
  return `${vexurEmbed.embedOrigin}/render/${widget}?${vexurRenderQuery(widget, width)}`;
}

/** Pages where #book-call is not available on first paint (use full URL). */
export const bookCallFallbackHref = '/start-here#book-call';

export function bookCallHref(pathname: string): string {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/resources/property-readiness-quiz') {
    return bookCallFallbackHref;
  }
  return '#book-call';
}
