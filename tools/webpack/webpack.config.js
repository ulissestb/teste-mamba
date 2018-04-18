const SimpleProgressPlugin = require('webpack-simple-progress-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
const RuntimeBindPolyfillPlugin = require('../helpers/RuntimeBindPolyfillPlugin.js')

const { fromRoot, fromModulesRoot } = require('../helpers/utils.js')
const { IS_DEV, IS_PROD } = require('../consts.js')
const htmlTemplate = require('../helpers/htmlTemplate.js')

const mainLibs = ['preact', 'preact-compat', 'prop-types', 'classnames']
const webpackResolve = {
  /** Do not resolve symlinks */
  symlinks: false,
  extensions: ['.js', '.jsx', '.json', '.scss', '.sass', '.css'],
  /** Make webpack also resolve modules from './src' */
  modules: [fromRoot('src'), fromModulesRoot()],
  alias: {
    react: 'preact-compat',
    'react-dom': 'preact-compat',
    'create-react-class': 'preact-compat/lib/create-react-class',
    'react-addons-css-transition-group': 'preact-css-transition-group',
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
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          compact: false,
          cacheDirectory: true,
        },
      },
      {
        loader: 'eslint-loader',
        options: {
          emitWarning: IS_DEV,
        },
      },
    ],
  },
  {
    test: /\.(css|less|s[ac]ss|styl)$/,
    resolve: {
      /** When importing from a style file, let's use package.json's 'style' field before the actual 'main' one */
      mainFields: ['style', 'main'],
    },
    use: [
      MiniCssExtractPlugin.loader,
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
    test: /\.(xml|html|txt|md)$/,
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
  context: fromRoot('src'),
  entry: {
    app: [
      /** External scss/css */
      './external.scss',
      /** App entry point */
      './index.js',
    ],
  },
  output: {
    path: fromRoot('dist'),
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
  /** Polyfill only the 'process' node global (needed for preact-compat) */
  node: {
    console: false,
    global: false,
    process: true,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false,
  },
  resolve: webpackResolve,
  optimization,
  module: { rules },
  plugins,
}
