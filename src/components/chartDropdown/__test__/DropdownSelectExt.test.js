import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import DropDownSelectExt from '../DropDownSelectExt'

describe('External Indicators', () => {
  it('renders without crashing', () => {
    render(<DropDownSelectExt />)
    const Dropdown = screen.getByTestId('externalIndicators')
    expect(Dropdown).toBeInTheDocument()
  })
  it('choosing a indicator', () => {
    const { container } = render(<DropDownSelectExt />)

    const checkBox = container.firstChild
    const dropDown = screen.getByTestId('externalIndicators')
    fireEvent.click(dropDown)
    const label = screen.getByText(/Roc/i)
    fireEvent.click(label)

    expect(checkBox).not.toBeChecked()
  })
})
