module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // отключает правила ESLint, конфликтующие с Prettier
  ],
  plugins: ['react', 'jsx-a11y', 'import', '@typescript-eslint'],
  rules: {
    'eol-last': ['error', 'always'], // 👈 авто-перенос строки в конце
    'react/react-in-jsx-scope': 'off', // для React 17+
    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
  },
};
