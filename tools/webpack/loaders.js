const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sass = require('node-sass')

const { fromWorkspace, fromModulesRoot } = require('../helpers/utils.js')
const { IS_DEV, IS_PROD } = require('../consts.js')

/** Read the project's .babelrc.js to enforce it in 'babel-loader' */
const babelrc = require(fromWorkspace('.babelrc.js'))
/** 'babel-loader' already appends 'sourceMap: true'. Cannot have both. */
delete babelrc.sourceMaps

module.exports = {
  babel: {
    loader: 'babel-loader',
    options: {
      compact: false,
      cacheDirectory: IS_DEV,
      babelrc: false,
      ...babelrc,
    },
  },
  svelte: {
    loader: 'svelte-loader',
    options: {
      emitCss: true,
      hotReload: IS_DEV,
      preprocess: {
        style: ({ content, attributes, filename }) => {
          const type = (attributes.type || attributes.lang || 'css').replace(
            /text\/(.+)/,
            '$1',
          )

          if (type === 'scss') {
            return new Promise((resolve, reject) => {
              sass.render(
                {
                  data: content,
                  includePaths: [fromWorkspace('src'), fromModulesRoot()],
                  sourceMap: true,
                  outFile: filename + '.css', // Needed node-sass property
                },
                (err, result) => {
                  if (err) return reject(err)

                  resolve({
                    code: result.css.toString(),
                    map: result.map.toString(),
                  })
                },
              )
            })
          }
        },
      },
    },
  },
  eslint: {
    loader: 'eslint-loader',
    options: { emitWarning: IS_DEV },
  },
  /**
   * MiniCssExtractPlugin doesn't support HMR.
   * For developing, use 'style-loader' instead.
   * */
  extractCss: IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
  css: {
    loader: 'css-loader',
    options: { sourceMap: IS_DEV },
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-import')(), require('autoprefixer')()],
      sourceMap: IS_DEV,
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: true, // 'resolve-url-loader' requires this to be always true
    },
  },
  resolveUrl: {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: IS_DEV,
      keepQuery: true,
      fail: true,
      debug: IS_DEV,
    },
  },
  fonts: {
    loader: 'url-loader',
    options: {
      // TODO: Test if an inline font works on the POS
      limit: 1, // Copy font files instead of inserting them on the css
      outputPath: 'assets/',
      name: './fonts/[name].[ext]',
    },
  },
  images: {
    loader: 'url-loader',
    options: {
      limit: 1,
      outputPath: 'assets/',
      name: './images/[name].[ext]',
    },
  },
}
