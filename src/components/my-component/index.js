import './my-component.scss'
import template from './my-component.html'
import log from '../../shared/log'

export default {
  template,
  onCreate () {
    log.hello('Mamba developer')
    console.log('this is my-component on your console')
    console.log(`Node env = ${process.env.NODE_ENV}`)
  }
}
