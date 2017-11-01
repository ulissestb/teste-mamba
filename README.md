# pos-mamba-websdk-template
> A template that uses the mamba-websdk library

## Project structure
```
|-- index.html          - app entry point
|-- manifest.xml        - manifest file needed to ship the app into the POS machine
|-- assets              - assets files like images
|-- build               - webpack scripts to build the app
|-- dist                - ready for production app files
|-- src                 - javascript source files of the app
|   |-- components      - components used across the app
|   |-- pages           - app pages
|   |-- router          - router related files
|   |-- shared          - javascript files shared across the app
|   |-- styles          - globally applied styles
|-- test                - test the project features
    |-- unit            - unit tests
```

## Dependencies
- [nodejs](https://nodejs.org/)

## Usage
1. [Clone](https://github.com/stone-payments/pos-mamba-websdk-template) or [Download](https://github.com/stone-payments/pos-mamba-websdk-template/archive/master.zip) this repository
2. Clone the [mamba-websdk](https://github.com/stone-payments/pos-mamba-websdk) into another folder
3. Install the template's npm dependencies
```bash
npm install
```
4. Use [npm link](https://docs.npmjs.com/cli/link) to link the mamba-websdk (this step will be removed when the project becomes public). Please notice you must execute commands in different folders (on the websdk folder and on the template folder).
```bash
# go to your mamba-websdk folder
cd path/to/pos-mamba-websdk/mamba-websdk
npm link

# go to your template folder
cd path/to/your/project
npm link mamba-websdk
```
5. Open your browser at http://localhost:8080. To access it on the POS, use your local ip instead of localhost. To discover your local ip on Windows, open Command Prompt, type `ipconfig` and look for the `IPV4 Adress` field. On Linux and Mac, type `ifconfig` and look for the `inet addr` field.

## What's included
- `npm run dev` - Development task
  - Opens a server using Webpack
  - Uses sass-lint to catch errors on the sass files
  - Uses standard.js to lint javascript files

- `npm run build` - Production ready build
  - Minifies javascript
  - Minifies styles
  - Minifies HTML
  - Copies assets

- `npm run lint` - Lint task
  - Fixes js files formatting
  - Checks sass files formatting

- `npm run clean` - Clean dist folder

## Webpack aliases
With webpack you can create custom aliases to filepaths to avoid having to follow the entire filepath to import a module
```javascript
/*
On your mamba app project
File build/config.js
*/
aliases: Object.assign({
    //Your custom aliases go here

    //Premade aliases to help
    appComponents: path.resolve(__dirname, '../src/components'),
    appShared: path.resolve(__dirname, '../src/shared'),
    appStyles: path.resolve(__dirname, '../src/styles')
  }, buildConfig.aliases)
```
With the aliases above, you could import a component in the components folder like this
```javascript
import YOUR_COMPONENT from 'appComponents/your_component'
```

There are also some aliases in the mamba-websdk that should be noted
```javascript
/*
On mamba-websdk project
File build/config.js
*/
aliases:
    {
      styles: path.resolve(__dirname, '../src/styles'),
      components: path.resolve(__dirname, '../src/components')
    }
```
Same as the previous import example, you could can import a module from mamba-websdk like this
```javascript
import MAMBA_COMPONENT from 'components/mamba_component'
```

When importing from a .scss or .less you need to add a __~__ at the beginning
```scss
/*
On your mamba app project
File src/styles/_custom-variables.scss
*/
@import '~styles/base/colorVariables';

```

