import { Component } from 'preact'

export class NavigationPage extends Component {
  constructor (props) {
    super(props)
    this.path = props.path
    this.handleHashChange()
    window.addEventListener('hashchange', _ => {
      this.handleHashChange()
    })
  }

  path
  element

  getPath () {
    console.log(`window.location.hash: ${window.location.hash}`)
    const path = window.location.hash.split('#')[1]
    if (path) return `/${path}`
    return '/'
  }

  validatePath (path) {
    console.log(`parsed path: ${path}`)
    if (this.path === path) {
      this.setState({ isActive: true })
    } else {
      this.setState({ isActive: false })
    }
  }

  handleHashChange () {
    this.validatePath(this.getPath())
  }

  render () {
    if (this.state.isActive !== false) return this.props.children[0]
  }
}
