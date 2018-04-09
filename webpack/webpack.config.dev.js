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
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    open: true,
    inline: true,
  },
})
