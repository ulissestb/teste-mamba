const path = require('path')
const packageJSON = require('../package.json')
const buildConfig = require('mamba-websdk/build/config')

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
  },
  aliases: Object.assign({
    //Your custom aliases go here

    
    appComponents: path.resolve(__dirname, '../src/components'),
    appShared: path.resolve(__dirname, '../src/shared'),
    appStyles: path.resolve(__dirname, '../src/styles')
  }, buildConfig.aliases)
}

module.exports = config
