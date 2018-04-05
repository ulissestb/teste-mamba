import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Header from '../index.js'

describe('components/Header', () => {
  it('should show the correct navigation links', () => {
    const context = shallow(<Header />)
    expect(context.find('a').length).toBe(3)
  })
})
