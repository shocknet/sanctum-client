module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'semi': ['error', 'always'],  // Mandatory semicolons
    'indent': ['error', 2],       // 2 space indentation
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
  },
}; 