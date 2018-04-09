import { h, Component } from 'preact'
import Header from '../Header'
import Home from '../Home'
import NavigationPage from '../NavigationPage'

import '../../external.scss'
import './style.scss'

export default class App extends Component {
  render () {
    return (
      <div id="app">
        <Header />
        <NavigationPage path="/">
          <Home />
        </NavigationPage>
      </div>
    )
  }
}
