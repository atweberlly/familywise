/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: [
          // From Tailwind CSS plugin
          'open-details',
          // From Swiper
          'swiper',
          'swiper-slide',
          'swiper-prev',
          'swiper-next',
          'swiper-pagination',
        ],
      },
    ],
  },
}
