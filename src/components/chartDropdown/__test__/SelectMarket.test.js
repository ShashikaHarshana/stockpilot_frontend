import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import SelectMarket from '../SelectMarket'

describe('SelectMarket', () => {
  it('renders properly', () => {
    render(<SelectMarket type='crypto' />)
    const dropDown = screen.getByTestId('selectMarket')
    expect(dropDown).toBeInTheDocument()
  })
})
