const { IS_PROD } = require('quickenv')

module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['standard', 'prettier', 'html', 'import', 'jest'],
  settings: {
    'html/html-extensions': ['.html', '.svelte'],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    /** Enforce indentation of two spaces */
    indent: ['error', 2, { SwitchCase: 1 }],

    /** Enforce trailing comma */
    'comma-dangle': ['error', 'always-multiline'],

    /** Allow __meta__ variable */
    'no-underscore-dangle': 'off',

    /** Disallow 'console.log' on production */
    'no-console': IS_PROD()
      ? [
          'error',
          {
            allow: ['warn', 'error'],
          },
        ]
      : 'off',

    /** Disallow 'var' */
    'no-var': 'error',

    /** Allow unstored instantiations */
    'no-new': 'off',

    /** Enforce file extensions on 'import' statements */
    'import/extensions': ['error', 'ignorePackages'],

    /** Don't complain about non-module svelte files */
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.(?:svelte|html)$', '^(@mamba[\\/]|svelte-)'],
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
