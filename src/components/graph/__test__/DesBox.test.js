import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import DesBox from '../DesBox'

describe('Description Box', () => {
  it('renders without crashing', () => {
    render(<DesBox />)
    const desBox = screen.getByTestId('descriptionBox')
    expect(desBox).toBeInTheDocument()
  })
})
