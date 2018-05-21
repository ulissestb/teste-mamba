import App from './components/App'

/**
 * Bootstrap the application.
 * If developing, it wraps the whole app within a '@mamba/pos' for better visuals.
 * If the code is running on the production environment, just initialize the app.
 *
 * We use dynamic import here for preventing webpack from bundling the @mamba/pos
 * even in a production environment build.
 * */
const root = document.getElementById('root')
const bootstrapAppFrom = target => new App({ target })

/** If developing, wrap the app with a <POS></POS> */
if (process.env.NODE_ENV === 'production') {
  window.app = bootstrapAppFrom(root)
} else {
  import('@mamba/pos').then(({ default: POS }) => {
    const appContainer = document.createElement('DIV')
    bootstrapAppFrom(appContainer)

    window.app = new POS({
      target: root,
      slots: {
        default: appContainer,
      },
    })
  })
}
