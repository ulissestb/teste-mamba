import { Component } from 'preact-compat'
import { Router, Route } from 'preact-router'
import createHashHistory from 'history/createHashHistory'

import Header from 'components/Header'
import Home from 'routes/Home'
import Example from 'routes/Example'

import './style.scss'

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render () {
    return (
      <div id="app">
        <Header />
        <Router
          history={createHashHistory({ hashType: 'hashbang' })}
          onChange={this.handleRoute}
        >
          <Route path="/" component={Home} />
          <Route path="/example" component={Example} />
        </Router>
      </div>
    )
  }
}
