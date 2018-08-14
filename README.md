# Mamba App template

## Requirements

Make sure all dependencies have been installed before moving on:

- [Node.js](http://nodejs.org/) >= v8.11.3
- [Yarn](https://yarnpkg.com/en/docs/install) >= v1.7

## Developing

### Installing

```shell
# Create and enter your new app directory
mkdir my-mamba-app
cd my-mamba-app

# Install the standard mamba app template
npx degit stone-payments/pos-mamba-app-template

# Install its dependencies with 'yarn'
yarn

# Run the development server
yarn start
```

### Building and deploying to the `POS`

1. Generate the *production* app bundle

```shell
yarn build
```

This will generate the `bundle` directory and a `bundle.tar.gz` file, which both contains your Mamba app.

2. **TODO**

### Commands

- `yarn start` - Start the dev server;
- `yarn build` - Build the production bundle;
- `yarn build:dev` - Build the development bundle;
- `yarn build:analyze` - Analyze the final bundle;
- `yarn lint` - Lint all style and script files;
- `yarn format` - Format all style and script files;

### Local dependencies

If developing with local dependencies only, you must `link` the local packages.

**Example:**

```shell
yarn link @mambasdk/styles @mambasdk/styles-utils @mambasdk/pos
```
