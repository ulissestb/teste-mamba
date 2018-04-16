import { Component } from 'preact-compat'
import { Router, Route } from 'preact-router'
import createHashHistory from 'history/createHashHistory'

import Header from '../Header'
import Home from '../Home'

import './style.scss'

export default class App extends Component {
  render () {
    return (
      <div id="app">
        <Header />
        <Router history={createHashHistory({ hashType: 'hashbang' })}>
          <Route path="/" component={Home} default />
          <div path="/page1">teste</div>
        </Router>
      </div>
    )
  }
}
