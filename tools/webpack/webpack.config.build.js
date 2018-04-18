const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { fromRoot, fromDist } = require('../helpers/utils.js')
const { IS_PROD } = require('../helpers/consts.js')

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
     * We can,'t do this when using a component which depends on 'preact-compat' (Ex: tabs)
     *
     * Note: turned off by default.
     */
    // new webpack.NormalModuleReplacementPlugin(/^preact-compat$/i, 'preact'),
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
    /** Minifiy the bundle. Based on create-react-app */
    new UglifyJsPlugin({
      /** Enable file caching */
      cache: true,
      /**
       * Use multi-process parallel running to improve the build speed
       * Default number of concurrent runs: os.cpus().length - 1
       */
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        parse: {
          /**
           * We want uglify-js to parse ecma 8 code. However, we don't want it
           * to apply any minfication steps that turns valid ecma 5 code
           * into invalid ecma 5 code. This is why the 'compress' and 'output'
           * sections only apply transformations that are ecma 5 safe
           * https://github.com/facebook/create-react-app/pull/4234
           */
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          /**
           * Disabled because of an issue with Uglify breaking seemingly valid code:
           * https://github.com/facebook/create-react-app/issues/2376
           * Pending further investigation:
           * https://github.com/mishoo/UglifyJS2/issues/2011
           */
          comparisons: false,
          /** NEED TO BE FALSE for not inlining preact's VNode constructor */
          reduce_funcs: false,
          /** Functions that doesn't have side-effects */
          pure_funcs: [
            'classCallCheck',
            '_classCallCheck',
            '_possibleConstructorReturn',
            'Object.freeze',
            'invariant',
            'warning',
          ],
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          /**
           *  Turned on because emoji and regex is not minified properly using default
           * https://github.com/facebook/create-react-app/issues/2488
           */
          ascii_only: true,
        },
      },
    }),
  ],
}

/** Webpack configuration used for bulding */
module.exports = merge(require('./webpack.config.js'), {
  devtool: 'source-map',
  plugins,
  optimization,
})
