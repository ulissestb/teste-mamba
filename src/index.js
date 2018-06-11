import App from './components/App'
import store from './store'

/**
 * Bootstrap the application.
 * If developing, it wraps the whole app within a '@mamba/pos' for better visuals.
 * If the code is running on the production environment, just initialize the app.
 *
 * We use dynamic import here for preventing webpack from bundling the @mamba/pos
 * even in a production environment build.
 * */
const root = document.getElementById('root')
const bootstrapAppFrom = target =>
  new App({
    target,
    store,
  })

if (process.env.NODE_ENV === 'production') {
  window.MambaApp = bootstrapAppFrom(root)
}

if (process.env.NODE_ENV !== 'production') {
  window.MambaStore = store
  /** If developing, wrap the app with a <POS></POS> if running on a web server */
  if (window.location.protocol === 'file:') {
    window.MambaApp = bootstrapAppFrom(root)
  } else {
    import('@mamba/pos').then(({ default: POS }) => {
      const appContainer = document.createElement('DIV')
      window.MambaApp = bootstrapAppFrom(appContainer)
      new POS({
        target: root,
        store,
        slots: {
          default: appContainer,
        },
      })
    })
  }
}
