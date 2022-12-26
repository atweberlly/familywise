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
      colors: {
        azure: '#f7ffff',
        primary: {
          600: '#3a776f',
          500: '#2ba193',
          400: '#21c0ad',
          300: '#c4f3d9',
          200: '#b9f4ed',
          100: '#f9f8f8',
        },
        secondary: {
          600: '#3f5f78',
          500: '#6c92b2',
          400: '#95afc6',
          300: '#b1c3d2',
          200: '#e6e9ed',
          100: '#f5f6f8',
        },
        success: {
          600: '#13ce66',
          500: '#2bd375',
          400: '#4eda8c',
          300: '#89e7b3',
          200: '#c4f3d9',
          100: '#e7faf0',
        },
        warning: {
          600: '#ca8e22',
        },
        danger: {
          600: '#e5000c',
          500: '#ff1925',
          400: '#ff4049',
          300: '#ff8086',
          200: '#ffbfc3',
          100: '#ffe5e7',
        },
        dark: {
          600: '#0a0c1b',
          500: '#0c0e1f',
          400: '#11142d',
          300: '#393c51',
          200: '#757785',
          100: '#e7e8ea',
        },
      },
      minWidth: {
        xs: '320px',
      },
    },
  },
  plugins: [],
}
