import { h } from 'preact'
import { Component } from 'preact-compat'

import './style.scss'

export default class Header extends Component {
  render () {
    return (
      <header className="header">
        <h1>Preact App</h1>
      </header>
    )
  }
}
