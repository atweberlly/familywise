/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const files = require('./files')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [...files],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2.5rem',
    },
    extend: {
      backgroundImage: {
        texture: "url('/images/hero/hero-video-placeholder@4x.jpg')",
        'book-cover': "url('/images/book-cover.png')",
      },
      boxShadow: {
        xl: '0 24px 48px -12px rgba(16, 24, 40, 0.25)',
      },
      colors: {
        vanilla: '#d6c7b2',
        sunglow: '#fec339',
        eggshell: '#F3E9DB',
        dark: '#323337',
        woodsmoke: '#111315',
        shark: '#212325',
        mercury: '#e2e2e2',
        palesky: '#697586',
        'black-pearl': '#07222d',
        'lemon-curry': '#CA8E22',
        'ghost-white': '#F9FAFB',
        primary: {
          100: '#F1ECE3',
          200: '#E1D7C7',
          300: '#D6C7B2',
          400: '#B99D7E',
          500: '#AB8664',
          600: '#9E7558',
        },
        secondary: {
          100: '#f5f6f8',
          200: '#e6e9ed',
          300: '#b1c3d2',
          400: '#95afc6',
          500: '#6c92b2',
          600: '#3f5f78',
        },
        success: {
          100: '#e7faf0',
          200: '#c4f3d9',
          300: '#89e7b3',
          400: '#4eda8c',
          500: '#2bd375',
          600: '#13ce66',
        },
        warning: {
          600: '#ca8e22',
        },
        danger: {
          100: '#ffe5e7',
          200: '#ffbfc3',
          300: '#ff8086',
          400: '#ff4049',
          500: '#ff1925',
          600: '#e5000c',
        },
        dark: {
          100: '#e7e8ea',
          200: '#757785',
          300: '#393c51',
          400: '#11142d',
          500: '#0c0e1f',
          600: '#0a0c1b',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ['Freight Big Pro', ...defaultTheme.fontFamily.serif],
      },
      minWidth: {
        xs: '320px',
      },
      zIndex: {
        top: 9999,
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    plugin(({ addBase, addVariant }) => {
      addBase({
        body: {
          fontSize: '16px',
        },
      })

      // addVariant('peer-choice', '.peer-choice:checked ~ * &')
      addVariant('open-details', '.open-details[open] &')
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
