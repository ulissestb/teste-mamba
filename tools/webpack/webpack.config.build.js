const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { fromRoot, fromDist } = require('../helpers/utils.js')
const { IS_PROD } = require('../consts.js')
const {
  dangerousReplacePreactCompat,
  dangerousRemovePropTypes,
} = require('../config.js')

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
    /** Generate hashes based on module's relative path */
    new webpack.HashedModuleIdsPlugin(),
  )

  if (dangerousRemovePropTypes) {
    plugins.push(
      /**
       * Replace 'prop-types' with a empty module stub.
       *
       * We can do this because all @mamba/components wrap their propTypes
       * with a if(process.env.NODE_ENV === 'production') which is removed when evaluated to false by the uglify process.
       *
       * If there's any other external module requesting PropTypes.properties, disable the 'dangerousRemovePropTypes'.
       */
      new webpack.NormalModuleReplacementPlugin(
        /prop-?types$/i,
        fromRoot('__mocks__', 'moduleStub.js'),
      ),
    )
  }

  if (dangerousReplacePreactCompat) {
    plugins.push(
      /**
       * Replace 'preact-compat' with 'preact', generating smaller bundles.]
       *
       * We can do this because all @mamba/components were built to work with 'preact' only.
       * If the app is using any method exclusive to 'preact-compat', disable the 'dangerousReplacePreactCompat'.
       */
      new webpack.NormalModuleReplacementPlugin(/^preact-compat$/i, 'preact'),
    )
  }
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
          /**
           * We disable 'reduce_funcs' for keeping uglify from inlining Preact's VNode.
           * If enabled, the 'new VNode()' is replaced with a anonymous 'function(){}',
           * which is problematic for 'preact-compat', since it extends the VNode prototype
           * to accomodate React's API.
           * https://github.com/developit/preact/issues/1065
           */
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
