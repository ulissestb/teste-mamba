import { h } from 'preact'
import { Component } from 'preact-compat'
import style from './style.scss'

export default class Header extends Component {
  render () {
    return (
      <header className={style.header}>
        <h1>Preact App</h1>
      </header>
    )
  }
}
