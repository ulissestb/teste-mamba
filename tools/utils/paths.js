const { resolve } = require('path')
const posixify = require('./posixify.js')

const rootPath = resolve(__dirname, '..', '..')
const resolveFromRoot = (...args) => posixify(resolve(rootPath, ...args))

/** Current project working directory */
exports.fromProject = resolveFromRoot

/** Current project 'dist' directory */
exports.fromDist = (...args) => resolveFromRoot('dist', ...args)
