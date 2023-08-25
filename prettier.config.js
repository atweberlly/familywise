/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    '@prettier/plugin-xml',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '<BUILTIN_MODULES>',
    '^react',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^~(.*)$',
    '<TYPES>',
    '<TYPES>^[.]',
    '^[.]',
  ],
}
