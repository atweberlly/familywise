const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,jsx}', './src/pages/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        malachite: {
          50: '#effef5',
          100: '#d9ffe9',
          200: '#b6fcd4',
          300: '#7df8b5',
          400: '#3eea8c',
          500: '#14d36b',
          600: '#0bbc5c', // Default color
          700: '#0c8946',
          800: '#0f6c3a',
          900: '#0f5832',
        },
        goblin: {
          50: '#f5f9f4',
          100: '#e5f3e5',
          200: '#cce6cc',
          300: '#a4d1a4',
          400: '#74b474',
          500: '#509751',
          600: '#438544', // Default color
          700: '#336234',
          800: '#2c4f2d',
          900: '#264127',
        },
        'dodger-blue': {
          50: '#eef3ff',
          100: '#dae3ff',
          200: '#bdceff',
          300: '#90afff',
          400: '#507cff', // Default color
          500: '#355afc',
          600: '#1f38f1',
          700: '#1724de',
          800: '#1920b4',
          900: '#1a218e',
        },
        'pickled-bluewood': {
          50: '#f1f9fa',
          100: '#dbecf2',
          200: '#bbdbe6',
          300: '#8cc1d4',
          400: '#559dbb',
          500: '#3a81a0',
          600: '#336a87',
          700: '#2f576f',
          800: '#2d4a5d',
          900: '#263a49', // Default color
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        display: ['Telma', ...defaultTheme.fontFamily.serif],
      },
      minWidth: {
        xs: '320px',
      },
    },
  },
  plugins: [],
}
