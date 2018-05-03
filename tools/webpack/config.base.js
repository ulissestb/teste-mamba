const SimpleProgressPlugin = require('webpack-simple-progress-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

const RuntimeBindPolyfillPlugin = require('../helpers/RuntimeBindPolyfillPlugin.js')
const { fromWorkspace, fromModulesRoot } = require('../helpers/utils.js')
const { IS_DEV, IS_PROD } = require('../consts.js')
const htmlTemplate = require('../helpers/htmlTemplate.js')

const mainLibs = ['svelte', 'classnames']
const webpackResolve = {
  /** Do not resolve symlinks */
  symlinks: false,
  mainFields: ['svelte', 'browser', 'module', 'main'],
  extensions: [
    '.js',
    '.jsx',
    '.json',
    '.scss',
    '.css',
    '.html',
    '.svelte',
    '.sve',
  ],
  /** Make webpack also resolve modules from './src' */
  modules: [fromWorkspace('src'), fromModulesRoot()],
  alias: {
    /**
     * Ensure we're always importing the main packages from this project's root.
     * Fixes linked components using their own dependencies.
     */
    ...mainLibs.reduce((acc, libName) => {
      acc[libName] = fromModulesRoot(libName)
      return acc
    }, {}),
  },
}

const optimization = {
  /** Create a separate chunk for webpack runtime */
  runtimeChunk: { name: 'runtime' },
  splitChunks: {
    cacheGroups: {
      /** Disable default chunk groups */
      default: false,
      vendor: false,
      /** Chunk that contains every external dependency that doesn't begin with '@mamba' */
      libraries: {
        test: /node_modules(?!\/@mamba)/i,
        name: 'lib',
        chunks: 'initial',
        minSize: 0,
        minChunks: 1,
      },
      /** Chunk that contains used polyfills */
      polyfills: {
        test: /core-js/,
        name: 'polyfills',
        chunks: 'all',
        minSize: 0,
        minChunks: 1,
      },
    },
  },
}

const rules = [
  {
    test: /\.(html|svelte)$/,
    exclude: /node_modules\/(?!svelte)/,
    use: [
      {
        loader: 'inspect-loader',
        options: {
          callback (inspect) {
            console.log(inspect.arguments)
          },
        },
      },
      {
        loader: 'babel-loader',
        options: {
          compact: false,
          cacheDirectory: IS_DEV,
        },
      },
      {
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          hotReload: IS_DEV,
        },
      },
      {
        loader: 'eslint-loader',
        options: { emitWarning: IS_DEV },
      },
    ],
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules\/(?!svelte)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          compact: false,
          cacheDirectory: IS_DEV,
        },
      },
      {
        loader: 'eslint-loader',
        options: { emitWarning: IS_DEV },
      },
    ],
  },
  {
    test: /\.(css|s[ac]ss)$/,
    resolve: {
      /** When importing from a style file, let's use package.json's 'style' field before the actual 'main' one */
      mainFields: ['style', 'main'],
    },
    use: [
      /**
       * MiniCssExtractPlugin doesn't support HMR.
       * For developing, use 'style-loader' instead.
       * */
      IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap: IS_DEV },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-import')(),
            require('autoprefixer')(),
            require('postcss-reporter')({ clearReportedMessages: true }),
          ],
          sourceMap: IS_DEV,
        },
      },
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: IS_DEV,
          keepQuery: true,
          fail: true,
          debug: IS_DEV,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true, // 'resolve-url-loader' requires this to be always true
        },
      },
    ],
  },
  {
    test: /\.(txt)$/,
    use: 'raw-loader',
  },
  {
    test: /\.(eot|woff2?|otf|ttf)$/,
    loader: 'url-loader',
    options: {
      // TODO: Test if an inline font works on the POS
      limit: 1, // Copy font files instead of inserting them on the css
      outputPath: 'assets/',
      name: './fonts/[name].[ext]',
    },
  },
  {
    test: /\.(gif|jpe?g|png|ico|svg)$/,
    loader: 'url-loader',
    options: {
      limit: 1,
      outputPath: 'assets/',
      name: './images/[name].[ext]',
    },
  },
]

const plugins = [
  new RuntimeBindPolyfillPlugin(),
  new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: '[name].css',
  }),
  new StyleLintPlugin(),
  new SimpleProgressPlugin({
    messageTemplate: [':bar', ':percent', ':elapseds', ':msg'].join(' '),
  }),
  new MiniHtmlWebpackPlugin({
    context: { title: 'Mamba Application' },
    template: htmlTemplate,
  }),
]

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  cache: true,
  target: 'web',
  context: fromWorkspace('src'),
  entry: {
    app: [
      /** External scss/css */
      './external.scss',
      /** App entry point */
      './index.js',
    ],
  },
  output: {
    path: fromWorkspace('dist'),
    publicPath: './',
    filename: '[name].js',
  },
  /** Minimal useful output log */
  stats: {
    modules: false,
    chunks: false,
    colors: true,
    children: false,
  },
  resolve: webpackResolve,
  optimization,
  module: { rules },
  plugins,
}
