import { shallow } from 'preact-render-spy'

import Example from '../index.js'

describe('components/home', () => {
  it('should show the home text', () => {
    const context = shallow(<Example />)
    expect(context.find('h1').text()).toBe('Example')
  })
})
