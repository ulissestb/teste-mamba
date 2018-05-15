# Mamba App template

## Requirements

Make sure all dependencies have been installed before moving on:

* [Node.js](http://nodejs.org/) >= 6.9.x
* [Yarn](https://yarnpkg.com/en/docs/install)

## Developing

### Commands

* `yarn run start` - Start the dev server;
* `yarn run build` - Build the production bundle;
* `yarn run build:analyze` - Analyze the final bundle;
* `yarn run lint` - Lint all style and script files;
* `yarn run format` - Format all style and script files;

### Local dependencies

If developing with local dependencies only, you must `link` the local packages.

Example:

```shell
yarn link @mamba/core-styles @mamba/styles-utils @mamba/pos
```
