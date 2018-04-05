const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** Defaults process.env.NODE_ENV to 'development */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = !IS_PROD

/** Current project working directory */
const PROJECT_ROOT = resolve(__dirname, '..')

module.exports = {
  target: 'web',
  stats: {
    modules: false,
    chunks: false,
    colors: true,
    children: false,
  },
  context: resolve(PROJECT_ROOT, 'src'),
  entry: {
    lib: [
      /** Necessary polyfill for Mamba Environment */
      'phantomjs-function-bind-polyfill',
    ],
    app: [
      /** App entry point */
      './index.js',
    ],
  },
  output: {
    path: resolve(PROJECT_ROOT, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    /** Do not resolve symlinks */
    symlinks: false,
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.scss',
      '.sass',
      '.css',
    ],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      components: resolve(PROJECT_ROOT, 'src/components'),
      style: resolve(PROJECT_ROOT, 'src/style'),
      /** Ensure we're always importing the same preact/preact-compat package */
      'preact-compat': resolve(PROJECT_ROOT, 'node_modules', 'preact-compat'),
      preact: resolve(PROJECT_ROOT, 'node_modules', 'preact'),
    },
  },
  /** Polyfill only the 'process' node global */
  node: {
    console: false,
    global: false,
    process: true,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]',
                minimize: {
                  core: IS_PROD,
                  discardComments: IS_PROD,
                },
                sourceMap: IS_DEV,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                parser: require('postcss-scss'),
                plugins: [
                  require('postcss-import')(),
                  require('autoprefixer')(),
                  require('postcss-reporter')({ clearReportedMessages: true }),
                ],
                sourceMap: IS_DEV,
              },
            },
          ],
        }),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
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
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new StyleLintPlugin(),
    new ProgressBarPlugin({
      format:
        '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m',
      renderThrottle: 100,
      summary: false,
      clear: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: { collapseWhitespace: true },
      inject: false,
    }),
  ],
}
