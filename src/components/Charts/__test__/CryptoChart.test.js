import { render, screen} from '../../../utils/testUtils'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import CryptoChart from '../CryptoChart'
import 'jest-canvas-mock'

jest.mock('../../Loading/ChartLoader', () => () => <div></div>)

describe('Crypto Chart', () => {
  it('renders without crashing', () => {
    render(<CryptoChart />)
    const cryptoChartElement = screen.getByTestId('cryptoChart')
    expect(cryptoChartElement).toBeInTheDocument()
  })
})
