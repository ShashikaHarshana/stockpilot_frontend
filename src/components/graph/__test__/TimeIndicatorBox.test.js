import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import TimeIndicatorBox from '../TimeIndicatorBox'

describe('TimeIndicatorBox', () => {
  it('renders properly', () => {
    render(<TimeIndicatorBox />)
    const TimeIndicator = screen.getByTestId('timeIndicator')
    expect(TimeIndicator).toBeInTheDocument()
  })
  it('Changes time interval on Click', () => {
    render(<TimeIndicatorBox />)
    const TimeIndicator = screen.getByTestId('timeButton-0')
    fireEvent.click(TimeIndicator)
    expect(TimeIndicator).toBeInTheDocument()
  })
})
