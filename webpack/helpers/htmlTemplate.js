const { resolve } = require('path')
const { readFileSync } = require('fs')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
const { minify: htmlMinifier } = require('html-minifier')
const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin

const { IS_PROD, PROJECT_ROOT } = require('./consts.js')

module.exports = ({ css, js, title, publicPath }) => {
  /** Gets the Function.prototype.bind polyfill content to prepend to the html template scripts */
  const bindPolyfillCode = readFileSync(
    resolve(
      PROJECT_ROOT,
      'node_modules',
      'phantomjs-function-bind-polyfill',
      'index.js',
    ),
    'utf8',
  )

  const htmlTemplate = `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <script type="text/javascript">${bindPolyfillCode}</script>
            ${generateCSSReferences(css, publicPath)}
          </head>
          <body>
            ${generateJSReferences(js, publicPath)}
          </body>
        </html>`

  return IS_PROD
    ? htmlMinifier(htmlTemplate, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true,
      keepClosingSlash: true,
      preserveLineBreaks: false,
      removeComments: true,
    })
    : htmlTemplate
}
