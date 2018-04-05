const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

process.env.ANALYZING_BUNDLE = true

/** Webpack configuration for bundle analyzing */
module.exports = merge(require('./webpack.config.build.js'), {
  stats: 'normal',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
      logLevel: 'info',
    }),
  ],
})
