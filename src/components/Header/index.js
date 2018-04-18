import { Component } from 'preact-compat'
import { Link } from 'preact-router/match'

import './style.scss'

export default class Header extends Component {
  render () {
    return (
      <header className="header">
        <h1>Mamba App</h1>
        <nav>
          <Link activeClassName="active" href="/">
            Home
          </Link>
          <Link activeClassName="active" href="/example">
            Example page
          </Link>
        </nav>
      </header>
    )
  }
}
