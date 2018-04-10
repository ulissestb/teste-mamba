const merge = require('webpack-merge')
const webpack = require('webpack')
const { DIST_PATH } = require('./helpers/consts.js')

/**
 * Webpack configuration used for development
 */
module.exports = merge(require('./webpack.config.js'), {
  devtool: 'cheap-module-eval-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hot: true,
  },
})
