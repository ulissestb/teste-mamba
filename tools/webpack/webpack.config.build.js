const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { IS_PROD, IS_DEV, fromRoot, fromDist } = require('../helpers/utils.js')

/** Webpack plugins to be used while building */
const plugins = [
  new CleanWebpackPlugin([fromDist()], { root: fromRoot() }),
  new CopyWebpackPlugin([
    { from: './assets/', to: fromDist('assets') },
    { from: fromRoot('manifest.xml'), to: fromDist() },
  ]),
]

/** If building for production... */
if (IS_PROD) {
  plugins.push(
    /**
     * In production build, replace required 'prop-types' with a empty module stub.
     *
     * We can do this because all @mamba/components wrap their propTypes
     * with a if(process.env.NODE_ENV === 'production') which is removed when evaluated to false by the uglify process.
     *
     * Note: This is a little bit dangerous if there's any other external module requesting PropTypes.properties in bundle.
     */
    new webpack.NormalModuleReplacementPlugin(
      /prop-?types$/i,
      fromRoot('__mocks__', 'moduleStub.js'),
    ),
    /**
     * Replace 'preact-compat' with 'preact'. We can do this because:
     * - PropTypes are excluded in production bundles.
     * - Preact also exports 'createElement'.
     *
     * Note: This is can also be dangerous, but for now it's safe to use.
     */
    new webpack.NormalModuleReplacementPlugin(/^preact-compat$/i, 'preact'),
    /** Generate hashes based on module's relative path */
    new webpack.HashedModuleIdsPlugin(),
  )
}

/** Build optimizations */
const optimization = {
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
}

/** Webpack configuration used for bulding */
module.exports = merge(require('./webpack.config.js'), {
  devtool: IS_DEV && 'source-map',
  plugins,
  optimization,
})
