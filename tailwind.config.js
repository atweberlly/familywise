/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,jsx}', './src/pages/**/*.{js,jsx}'],
  theme: {
    // Modified font sizes and their line heights
    fontSize: {
      '6xl': ['6rem', { lineHeight: 1.25 }],
      '5xl': ['4rem', { lineHeight: 1.25 }],
      '4xl': ['3rem', { lineHeight: 1.25 }],
      '3xl': ['2.5rem', { lineHeight: 1.25 }],
      '2xl': ['1.5rem', { lineHeight: 1.25 }],
      xl: ['1.125rem', { lineHeight: '1.75rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      xs: ['0.75rem', { lineHeight: '1rem' }],
    },
    extend: {
      minWidth: {
        xs: '320px',
      },
    },
  },
  plugins: [],
}
