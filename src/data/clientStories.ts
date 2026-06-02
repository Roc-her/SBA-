export type ClientStory = {
  tag: string;
  title: string;
  summary: string;
  outcome: string;
  bullets: string[];
};

export const clientStories: ClientStory[] = [
  {
    tag: 'Walked away',
    title: 'A property that looked good on paper',
    summary:
      'A young buyer was ready to purchase — the numbers seemed reasonable and he had already pictured himself owning it. After independent inspections and deeper due diligence, serious issues surfaced that would have been costly over time.',
    outcome: 'He walked away disappointed, then secured a far stronger property with less risk.',
    bullets: [
      'First impressions are not due diligence',
      'Protection sometimes means not buying',
      'Patience created a better outcome',
    ],
  },
  {
    tag: 'Strategy shift',
    title: 'The wrong strategy for the right person',
    summary:
      'A client was preparing to buy through superannuation in a highly seasonal regional location. On paper it looked attractive, but it did not align with her broader goals, risk profile or long-term plan.',
    outcome: 'The strategy was redirected to an area with stronger fundamentals and more consistent demand.',
    bullets: [
      'Exciting is not the same as aligned',
      'The goal is the right property, not any property',
      'Clarity changed the entire direction',
    ],
  },
  {
    tag: 'Relocation',
    title: 'Clarity from a distance',
    summary:
      'Interstate clients relocating to regional Victoria arrived exhausted by conflicting advice, headlines and online opinions. They needed calm, local understanding — not more noise.',
    outcome: 'They felt heard, understood their options, and moved forward with confidence in the decisions they were making.',
    bullets: [
      'Relief often comes before the purchase',
      'Calm guidance beats conflicting opinions',
      'Confidence matters throughout the process',
    ],
  },
];
