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
      },
    },
  },
  plugins: [],
}
