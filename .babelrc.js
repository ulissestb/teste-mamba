const ENV = process.env.NODE_ENV || 'development'
const IS_PROD = ENV === 'production'
const IS_TEST = ENV === 'test'
const IS_DEV = ENV === 'development'

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
  /** Remove component's proptypes and 'prop-types' package import */
  plugins.push([
    'transform-react-remove-prop-types',
    { mode: 'remove', removeImport: true },
  ])
}

module.exports = {
  sourceMaps: true,
  presets,
  plugins,
}
