import { render, screen} from '../../../utils/testUtils'
import React from 'react'
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
