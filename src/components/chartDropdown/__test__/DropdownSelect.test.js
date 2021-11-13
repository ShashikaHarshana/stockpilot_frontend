import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import DropdownSelect from '../DropdownSelect'

describe('Market Select', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    useSelectorMock.mockReturnValue({ marketType: 'stock' })
  })

  it('renders properly', () => {
    render(<DropdownSelect />)
    const dropDown = screen.getByTestId('internalSelect')
    expect(dropDown).toBeInTheDocument()
  })

  it('drop down chart will appear after clicking', () => {
    render(<DropdownSelect />)
    const dropDown = screen.getByTestId('internalSelect')
    fireEvent.click(dropDown)
    const label = screen.getByText(/SMA/i)
    expect(label).toBeInTheDocument()
  })
  it('choosing a indicator', () => {
    render(<DropdownSelect />)
    const dropDown = screen.getByTestId('internalSelect')
    fireEvent.click(dropDown)
    const label = screen.getByText(/SMA/i)
    fireEvent.click(label)
  })
  it('choosing a indicator', () => {
    render(<DropdownSelect />)

    const setIndicators = jest.fn()
    const useStyles = jest.fn()
    const handleClick = jest.spyOn(React, 'useState')
    handleClick.mockImplementation(indicators => [indicators, setIndicators])

    const dropDown = screen.getByTestId('internalSelect')
    fireEvent.click(dropDown)
    const label = screen.getByText(/SMA/i)
    fireEvent.click(label)
    expect(setIndicators).toBeCalledTimes(1)
  })
})
