const { resolve } = require('path')

/** Defaults process.env.NODE_ENV to 'development */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports.IS_PROD = process.env.NODE_ENV === 'production'
module.exports.IS_TEST = process.env.NODE_ENV === 'test'
module.exports.IS_DEV = process.env.NODE_ENV === 'development'

/** Current project working directory */
module.exports.PROJECT_ROOT = resolve(__dirname, '..', '..')

/** Current project 'dist' directory */
module.exports.DIST_PATH = resolve(module.exports.PROJECT_ROOT, 'dist')
