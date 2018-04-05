const merge = require('webpack-merge')

process.env.ANALYZING_BUNDLE = true

/** Webpack configuration for bundle analyzing */
module.exports = merge(require('./webpack.config.build.js'), {
  stats: 'normal',
})
