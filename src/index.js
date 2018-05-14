import { createHashHistory } from 'svelte-routing'
import App from './components/App'

createHashHistory()

const app = new App({
  target: document.getElementById('root'),
  data: {
    wrapWithPOS: process.env.NODE_ENV !== 'production',
  },
})

window.app = app

export default app
