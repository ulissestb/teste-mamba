import { createHashHistory } from 'svelte-routing'
import App from './components/App'

createHashHistory()

const root = document.getElementById('root')
const bootstrapAppInto = target => new App({ target })
let app

/** If developing, wrap the app with a <POS></POS> */
if (process.env.NODE_ENV === 'production') {
  app = bootstrapAppInto(root)
} else {
  const POS = require('@mamba/pos').default
  const appContainer = document.createElement('DIV')
  bootstrapAppInto(appContainer)

  app = new POS({
    target: root,
    slots: {
      default: appContainer,
    },
  })
}

export default app
