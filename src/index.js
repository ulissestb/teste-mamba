// import 'babel-polyfill'
import { h, render } from 'preact'
import App from './components/App'

let root
function init () {
  root = render(<App />, document.getElementById('root'), root)
}

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    require('preact/debug')
    module.hot.accept('./components/App', init)
  }
}

init()
