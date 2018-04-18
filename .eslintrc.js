const { IS_PROD } = require('./tools/consts.js')
const { pragma } = require('./tools/config.js')

module.exports = {
  extends: [
    'standard',
    'standard-preact',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['react', 'standard', 'prettier', 'jest'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  globals: {
    sleep: true,
  },
  settings: {
    react: {
      pragma: pragma.handle,
    },
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': IS_PROD ? 2 : 0,
    'space-before-function-paren': 2,
    'jsx-quotes': ['error', 'prefer-double'],
    'react/react-in-jsx-scope': 0, // Babel automatically imports the pragma
    'react/display-name': 0, // Allow anonymous stateless components
    'react/prop-types': [
      2,
      {
        ignore: ['children'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/*.test.js'],
      env: { jest: true },
    },
  ],
}
