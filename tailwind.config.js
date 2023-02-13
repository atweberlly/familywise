const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const files = require('./files')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [...files],
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        primary: {
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
        secondary: {
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
        accent: {
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
        dark: {
          50: '#f1fafe',
          100: '#e1f4fd',
          200: '#bdeafa',
          300: '#83daf6',
          400: '#41c8ef',
          500: '#18b0df',
          600: '#0b8fbe',
          700: '#0a729a',
          800: '#0d607f',
          900: '#07222d', // Default color
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ['Freight Big Pro', ...defaultTheme.fontFamily.serif],
      },
      minWidth: {
        xs: '320px',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        body: {
          fontSize: '16px',
        },
      })
    }),
  ],
}
