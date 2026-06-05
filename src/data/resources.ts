export type ResourceItem = {
  group: string;
  title: string;
  copy: string;
  href?: string;
  /** No live tool or download yet */
  comingSoon?: boolean;
};

export const resources: ResourceItem[] = [
  {
    group: 'Free Guides',
    title: "Buyer's Checklist",
    copy: 'A practical guide to the questions, red flags and steps many buyers overlook before they commit, designed to build clarity without overwhelm.',
    comingSoon: true,
  },
  {
    group: 'Free Guides',
    title: 'Due Diligence Guide',
    copy: 'Some of the most expensive mistakes happen before settlement. This guide walks through the checks and investigations that deserve attention while you still have room to walk away.',
    comingSoon: true,
  },
  {
    group: 'Free Guides',
    title: '7 Costly Mistakes',
    copy: 'A calm look at the decisions buyers often regret later, and how protection, discipline and better questions can help you avoid them.',
    comingSoon: true,
  },
  {
    group: 'Calculators',
    title: 'Borrowing Power',
    copy: 'Explore your likely buying range before you fall in love with a property outside it. A simple starting point for calmer, more realistic planning.',
    comingSoon: true,
  },
  {
    group: 'Calculators',
    title: 'Stamp Duty',
    copy: 'Stamp duty is one of the easiest costs to underestimate. Use this tool to see the real number before it surprises you at offer time.',
    comingSoon: true,
  },
  {
    group: 'Calculators',
    title: 'Deposit',
    copy: 'Understand how your savings, goals and timeline translate into usable buying power, so your strategy matches what you can actually sustain.',
    comingSoon: true,
  },
  {
    group: 'Calculators',
    title: 'Rent vs Buy',
    copy: 'Compare the trade-offs without turning a major life decision into a shouting match of opinions. Clarity first, commitment second.',
    comingSoon: true,
  },
  {
    group: 'Quizzes',
    title: 'Property Readiness Quiz',
    copy: 'A short assessment to understand where you sit in your property journey and what the next most appropriate step might be for your circumstances.',
    href: '/resources/property-readiness-quiz',
  },
  {
    group: 'Quizzes',
    title: "Should You Use a Buyer's Agent?",
    copy: 'Work out whether independent advocacy would protect this decision, especially when time is tight, stakes are high or the noise feels overwhelming.',
    comingSoon: true,
  },
];
