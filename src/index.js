import { render } from 'preact-compat'
import App from './components/App'

let root
function init () {
  root = render(<App />, document.getElementById('root'), root)
}

if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
  if (module.hot) {
    module.hot.accept('./components/App', init)
  }
}

init()
