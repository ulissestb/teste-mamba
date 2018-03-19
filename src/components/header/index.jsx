import { h, Component } from 'preact'
import style from './style.scss'

export default class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>Preact App</h1>
      </header>
    )
  }
}
