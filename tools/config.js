module.exports = {
  /** Pragma config for .babelrc.js and .eslintrc.js */
  pragma: {
    handle: 'createElement',
    module: 'preact-compat',
  },
  /**
   * Dangerous replacement of 'prop-types' with a empty module stub for smaller PRODUCTION bundles.
   * Only use this if you can guarantee your app was doesn't use propTypes in production.
   */
  dangerousRemovePropTypes: true,
  /**
   * Dangerous replacement of 'preact-compat' with 'preact' for smaller PRODUCTION bundles.
   * Only use this if you can guarantee your app was built for 'preact', not 'react'.
   * */
  dangerousReplacePreactCompat: false,
}
