const path = require('path')
const packageJSON = require('../package.json')

let config = {
  root: path.join(__dirname, '../'),
  src: {
    root: 'src',
    assets: 'assets',
    indexHTML: 'index.html',
    indexJS: 'src/index.js',
    manifest: 'manifest.xml'
  },
  dist: {
    root: 'dist',
    name: packageJSON.name
  },
  lib: {
    mambaWebSdk: {
      assets: 'node_modules/mamba-websdk/dist/assets'
    }
  }
}

module.exports = config
