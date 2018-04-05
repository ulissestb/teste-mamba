const { resolve } = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const PROJECT_ROOT = resolve(__dirname, '..')
const DIST_PATH = resolve(PROJECT_ROOT, 'dist')

/**
 * Webpack configuration used for development
 */
module.exports = merge(require('./webpack.config.js'), {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    contentBase: DIST_PATH,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    open: true,
    inline: true,
  },
})
