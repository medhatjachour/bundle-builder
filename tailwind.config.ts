import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './data/**/*.{js,ts,json}'],
  theme: {
    extend: {
      screens: {
        ultra: '1736px',
      },
    },
  },
  plugins: [],
} satisfies Config;
