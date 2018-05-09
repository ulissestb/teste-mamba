const { resolve } = require('path')

const rootPath = resolve(__dirname, '..', '..')
const resolveFromRoot = (...args) => resolve(rootPath, ...args)

/** Current project working directory */
exports.fromProject = resolveFromRoot

/** Current project 'dist' directory */
exports.fromDist = (...args) => resolveFromRoot('dist', ...args)
