import { shallow } from 'preact-render-spy'
import Header from '../index.js'
import { Link } from 'preact-router/match'

describe('components/Header', () => {
  test('Header renders 3 nav items', () => {
    const context = shallow(<Header />)
    expect(context.find('h1').text()).toBe('Mamba App')
    expect(context.find(<Link />)).toHaveLength(2)
  })
})
