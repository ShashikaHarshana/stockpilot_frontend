import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import CryptoChart from '../CryptoChart'
import 'jest-canvas-mock'
import Lottie from 'react-lottie'

jest.mock('../../Loading/ChartLoader', () => () => <div></div>)

describe('Crypto Chart', () => {
  it('renders without crashing', () => {
    render(<CryptoChart />)
    const cryptoChartElement = screen.getByTestId('cryptoChart')
    expect(cryptoChartElement).toBeInTheDocument()
  })
})
