const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  extends: [
    'standard',
    'standard-preact',
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['react', 'standard', 'prettier', 'jest'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
    'jest/globals': true,
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
  rules: {
    indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    'no-console': isProd ? 2 : 0,
    'space-before-function-paren': 2,
    'jsx-quotes': ['error', 'prefer-double'],
  },
}
