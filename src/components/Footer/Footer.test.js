import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'

import Footer from './Footer'

test('matches snapshot', () => {
  const wrapper = shallow(<Footer />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
