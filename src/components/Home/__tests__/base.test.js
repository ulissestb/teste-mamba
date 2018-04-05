import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Home from '../index.js'

describe('components/home', () => {
  it('should show the home text', () => {
    const context = shallow(<Home />)
    expect(context.find('h1').text()).toBe('Home')
  })
})
