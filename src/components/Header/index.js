import { h } from 'preact'
import { Component } from 'preact-compat'
import { Link } from 'preact-router/match'

import './style.scss'

export default class Header extends Component {
  render () {
    return (
      <div>
        <header className="header">
          <h1>Preact App</h1>
        </header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/page1">Page 1</Link>
          <Link href="/page2">Page 2</Link>
          <Link href="/page3">Page 3</Link>
          <Link href="/page4">Page 4</Link>
        </nav>
      </div>
    )
  }
}
