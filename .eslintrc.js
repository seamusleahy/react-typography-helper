module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    project: './tsconfig.eslint.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'prettier/@typescript-eslint',
    'airbnb-typescript',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  }
};