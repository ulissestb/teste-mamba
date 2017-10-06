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
2. Clone the [mamba-websdk](https://github.com/stone-payments/pos-mamba-websdk/tree/master/mamba-websdk) into another folder
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
