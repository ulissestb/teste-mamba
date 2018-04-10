import { h, Component } from 'preact'
import Header from '../Header'
import Home from '../Home'
import { Router, Route } from 'preact-router'
import createHashHistory from 'history/createHashHistory'

import '../../external.scss'
import './style.scss'

const routerHistory = createHashHistory({ hashType: 'hashbang' })

export default class App extends Component {
  render () {
    return (
      <div id="app">
        <Header />
        <Router history={routerHistory}>
          <Route path="/" component={Home} default />
          <div path="/page1">teste</div>
        </Router>
      </div>
    )
  }
}
