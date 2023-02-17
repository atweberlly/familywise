const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const files = require('./files')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [...files],
  future: {
    disableColorOpacityUtilitiesByDefault: true,
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      boxShadow: {
        xl: '0 24px 48px -12px rgba(16, 24, 40, 0.25)',
      },
      colors: {
        vanilla: '#d6c7b2',
        'black-pearl': '#07222d',
        sunglow: '#fec339',

        primary: {
          50: '#f4f9f8',
          100: '#daede8',
          200: '#b4dbd1',
          300: '#87c1b6',
          400: '#5ea397',
          500: '#44887d',
          600: '#3a776f',
          700: '#2d5852',
          800: '#284744',
          900: '#243d3a',
        },
        secondary: {
          50: '#f2f6f9',
          100: '#dee9ef',
          200: '#c2d5df',
          300: '#97b7c9',
          400: '#6591ab',
          500: '#4a7590',
          600: '#3f5f78',
          700: '#395165',
          800: '#354655',
          900: '#2f3b4a',
        },
        success: {
          50: '#effef5',
          100: '#d9ffe9',
          200: '#b6fcd3',
          300: '#7df8b2',
          400: '#3deb89',
          500: '#13ce66',
          600: '#09b054',
          700: '#0b8a45',
          800: '#0f6c39',
          900: '#0e5932',
        },
        warning: {
          50: '#fbf8eb',
          100: '#f7eeca',
          200: '#f0dc98',
          300: '#e7c15d',
          400: '#dfa830',
          500: '#ca8e22',
          600: '#b2711c',
          700: '#8f5219',
          800: '#77421c',
          900: '#66381d',
        },
        danger: {
          50: '#fff0f1',
          100: '#ffdddf',
          200: '#ffc1c4',
          300: '#ff959b',
          400: '#ff5962',
          500: '#ff2631',
          600: '#fc0613',
          700: '#e5000c',
          800: '#af050e',
          900: '#900c13',
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
