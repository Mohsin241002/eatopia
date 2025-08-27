/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cream: ['var(--font-cream)'],
        'cream-light': ['var(--font-cream)'],
        'cream-regular': ['var(--font-cream)'],
        'cream-medium': ['var(--font-cream)'],
        'cream-bold': ['var(--font-cream)'],
        'cream-heavy': ['var(--font-cream)'],
        'cream-black': ['var(--font-cream)'],
        riveta: ['var(--font-riveta)'],
        'riveta-medium': ['var(--font-riveta)'],
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)`,
      },
    },
  },
  plugins: [],
}
