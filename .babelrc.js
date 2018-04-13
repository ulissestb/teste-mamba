const { IS_PROD, IS_DEV, IS_TEST } = require('./tools/helpers/consts.js')

const presets = [
  [
    '@babel/preset-env',
    {
      /** Polyfill only used built-ins */
      useBuiltIns: 'usage',
      loose: true,
      /** Only parse modules if testing. If not, let webpack handle it */
      modules: IS_TEST ? 'commonjs' : false,
      debug: IS_DEV,
      forceAllTransforms: true,
    },
  ],
  ['@babel/preset-stage-0', { loose: true }],
  ['@babel/preset-react', { development: IS_DEV, pragma: 'h' }],
]

const plugins = ['@babel/plugin-proposal-decorators']

if (IS_PROD) {
  plugins.push(
    /** Remove component's proptypes and 'prop-types' package import */
    [
      'transform-react-remove-prop-types',
      { mode: 'remove', removeImport: true },
    ],
    /** Scope hoisting for constant components (ex: <span>sample text</span>) */
    '@babel/plugin-transform-react-constant-elements',
  )
}

if (IS_DEV) {
  plugins.push(
    '@babel/plugin-transform-react-jsx-self',
    '@babel/plugin-transform-react-jsx-source',
  )
}

module.exports = {
  sourceMaps: true,
  presets,
  plugins,
}
