const { IS_PROD } = require('./tools/consts.js')

module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended',
  ],
  plugins: ['standard', 'prettier', 'jest', 'html'],
  settings: {
    'html/html-extensions': ['.html', '.svelte'],
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
      modules: true,
    },
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': IS_PROD ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'space-before-function-paren': 'error',
    'no-var': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/*.test.js'],
      env: { jest: true },
    },
  ],
}
