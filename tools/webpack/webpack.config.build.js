const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const {
  IS_PROD,
  IS_DEV,
  PROJECT_ROOT,
  DIST_PATH,
} = require('../helpers/consts.js')

/** Webpack plugins to be used while building */
let plugins = [
  new CleanWebpackPlugin([DIST_PATH], { root: PROJECT_ROOT }),
  new CopyWebpackPlugin([
    { from: './assets/', to: resolve(DIST_PATH, 'assets') },
    { from: resolve(PROJECT_ROOT, 'manifest.xml'), to: resolve(DIST_PATH) },
  ]),
]

/** If building for production... */
if (IS_PROD) {
  plugins = plugins.concat(
    /**
     * In production build, replace required 'prop-types' with a empty module stub.
     *
     * We can do this because all @mamba/components wrap their propTypes
     * with a if(process.env.NODE_ENV === 'production') which is removed when evaluated to false by the uglify process.
     *
     * This is a little bit dangerous if there's any other external module requesting PropTypes.properties in bundle.
     **/
    new webpack.NormalModuleReplacementPlugin(
      /prop-?types$/i,
      resolve(PROJECT_ROOT, '__mocks__', 'moduleStub.js'),
    ),
    /** Generate hashes based on module's relative path */
    new webpack.HashedModuleIdsPlugin(),
  )
}

/** Webpack configuration used for bulding */
module.exports = merge(require('./webpack.config.js'), {
  devtool: IS_DEV && 'source-map',
  plugins,
  optimization: {
    minimize: IS_PROD,
    minimizer: [
      /** Minify the bundle's css */
      new OptimizeCSSAssetsPlugin({
        /** Default css processor is 'cssnano' */
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          core: IS_PROD,
          discardComments: IS_PROD,
          autoprefixer: false, // We already use autoprefixer in postcss-loader
        },
      }),
      /** Minifiy the bundle */
      new UglifyJsPlugin({
        cache: true, // Enables file caching
        parallel: true, // Use multiple CPUs if available,
        sourceMap: true, // Enables sourcemap,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
})
