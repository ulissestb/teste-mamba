const { resolve } = require('path')

const rootPath = process.cwd()
const resolveFromRoot = (...args) => resolve(rootPath, ...args)

/** Defaults process.env.NODE_ENV to 'development */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  IS_DEV: process.env.NODE_ENV === 'development',

  /** Current project working directory */
  fromRoot: resolveFromRoot,

  /** Modules path */
  fromModulesRoot: (...args) => resolveFromRoot('node_modules', ...args),

  /** Current project 'dist' directory */
  fromDist: (...args) => resolveFromRoot('dist', ...args),
}
