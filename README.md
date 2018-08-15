# Mamba App template

## Requirements

Make sure all dependencies have been installed before moving on:

- [Node.js](http://nodejs.org/) >= v8.11.3

## Developing

### Installing

#### Mamba cli

```shell
# Install the mamba cli globally
npm i -g @mambasdk/cli

# Create a new mamba app at 'my-mamba-app' directory
mamba app new my-mamba-app

? Name: My Mamba App
? Version: 0.0.1
? Description: My new Mamba app

# Enter the app directory
cd my-mamba-app

# Start the development server
mamba app start
```

#### Manually

```shell
# Create and enter your new app directory
mkdir my-mamba-app
cd my-mamba-app

# Install the standard mamba app template
npx degit stone-payments/pos-mamba-app-template

# Install its dependencies with 'yarn'
npm i

# Run the development server
npm run start
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
