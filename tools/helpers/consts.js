/** Defaults process.env.NODE_ENV to 'development */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  IS_DEV: process.env.NODE_ENV === 'development',

  /** Pragma handler */
  PRAGMA_HANDLE: 'createElement',
}
