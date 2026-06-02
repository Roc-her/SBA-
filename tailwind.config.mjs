/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'off-white-2': 'var(--off-white-2)',
        ink: 'var(--ink)',
        black: 'var(--black)',
        'black-2': 'var(--black-2)',
        'black-soft': 'var(--black-soft)',
        offwhite: 'var(--offwhite)',
        gold: 'var(--gold)',
        'gold-bright': 'var(--gold-bright)',
        'gold-deep': 'var(--gold-deep)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(11, 11, 11, 0.08)',
      },
    },
  },
  plugins: [],
};
