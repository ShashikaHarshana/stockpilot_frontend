import { render} from '../../utils/testUtils'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import Home from '../Home'

describe('Home', () => {
  it('renders properly', () => {
    render(<Home />)
  })
  const textElement = getBytext(/smart trading/i)
  expect(textElement).toBeInTheDocument()

  it('renders button', () => {})
})
