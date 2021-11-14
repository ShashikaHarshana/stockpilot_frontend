import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import DesBox from '../DesBox'

jest.mock('../../chartDropdown/SelectMarket', () => () => <div></div>)

describe('Description Box', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  // beforeEach(() => {
  //   useSelectorMock.mockClear()
  //   useDispatchMock.mockClear()
  //   useSelectorMock.mockReturnValue({
  //     market: 'ETHUSDT',
  //     marketType: 'crypto',
  //     token: 'sdflksdjflks',
  //     cryptoMarkets: [],
  //     stockMarkets: []
  //   })
  // })

  it('renders without crashing', () => {
    render(<DesBox type='crypto' />)
    const desBox = screen.getByTestId('descriptionBox')
    expect(desBox).toBeInTheDocument()
  })
})
