/**
 * Webpack configuration for active development
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const { fromCwd } = require('quickenv')

module.exports = merge(require('./config.base.js'), {
  devtool: 'source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },

  devServer: {
    contentBase: [fromCwd('src')],
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
    inline: true,
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hot: true,
  },
})
