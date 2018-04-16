module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: function (path, state) {
        if (path.node.source.value === 'preact') {
          throw new Error(
            `file '${
              state.filename
            }' should import 'preact-compat' instead of 'preact'`,
          )
        }
      },
    },
  }
}
