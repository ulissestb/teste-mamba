import { h, Component } from 'preact'
import Header from './header'
import Home from './home'
import { NavigationPage } from '../navigation-page/index'

export default class App extends Component {
  render() {
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
