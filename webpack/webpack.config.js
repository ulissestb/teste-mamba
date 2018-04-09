const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
const RuntimeBindPolyfillPlugin = require('./helpers/RuntimeBindPolyfillPlugin.js')

const {
  PROJECT_ROOT,
  MODULES_ROOT,
  IS_DEV,
  IS_PROD,
} = require('./helpers/consts.js')
const htmlTemplate = require('./helpers/htmlTemplate.js')

const webpackResolve = {
  /** Do not resolve symlinks */
  symlinks: false,
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.sass', '.css'],
  alias: {
    react: 'preact-compat',
    'react-dom': 'preact-compat',
    components: resolve(PROJECT_ROOT, 'src/components'),
    style: resolve(PROJECT_ROOT, 'src/style'),
    /** Ensure we're always importing the same preact/preact-compat package */
    'preact-compat': resolve(MODULES_ROOT, 'preact-compat'),
    preact: resolve(MODULES_ROOT, 'preact'),
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
      /** Chunk that contains used libraries */
      libraries: {
        test: /preact/,
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
      /** Chunk for all used css files */
      styles: {
        test: /\.css$/,
        name: 'styles',
        chunks: 'all',
        enforce: true,
      },
    },
  },
}

const rules = [
  {
    test: /\.jsx?$/,
    enforce: 'pre',
    exclude: resolve(PROJECT_ROOT, 'src'),
    use: 'source-map-loader',
  },
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
    // SASS
    test: /\.s[ac]ss$/,
    enforce: 'pre',
    resolve: {
      /** When importing from a scss file, let's use package.json's 'scss' and 'style' fields before the actual 'main' one */
      mainFields: ['scss', 'style', 'main'],
    },
    use: [
      {
        loader: 'sass-loader',
        options: {
          sourceMap: IS_DEV,
        },
      },
    ],
  },
  {
    test: /\.(css|less|s[ac]ss|styl)$/,
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
  new ProgressBarPlugin({
    format:
      '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m',
    renderThrottle: 100,
    summary: false,
    clear: true,
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
  context: resolve(PROJECT_ROOT, 'src'),
  entry: {
    app: [
      /** App entry point */
      './index.js',
    ],
  },
  output: {
    path: resolve(PROJECT_ROOT, 'dist'),
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
