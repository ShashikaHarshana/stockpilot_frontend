import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'

import { act } from 'react-dom/test-utils'

test('matches snapshot', async () => {
  const DropdownSelect = require('./DropdownSelect').default
  let wrapper
  await act(async () => {
    wrapper = mount(<DropdownSelect />)
  })
  wrapper.update()
})
