import { createHashHistory } from 'svelte-routing'
import App from './components/App'

createHashHistory()

const root = document.getElementById('root')
const bootstrapAppFrom = target => new App({ target })

if (process.env.NODE_ENV === 'production') {
  window.app = bootstrapAppFrom(root)
} else {
  /** If developing, wrap the app with a <POS></POS> if running on a web server */
  if (window.location.protocol === 'file:') {
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
}
