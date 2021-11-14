import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import SignIn from "../SignIn";
import theme from "../../utils/theme";
import WatchList from "../WatchList";

jest.mock('../../components/controls/ConfirmDialog.js');



const MockWatchList = () => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        </ThemeProvider>
    )

}
global.window = { location: { pathname: null } }


describe('Watch List', () => {
    const mEventSourceInstance = {
        addEventListener: jest.fn(),
        close: jest.fn()
    };

    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })


    it('should call dispatch on inititalize', () => {
        global.EventSource = jest.fn(() => mEventSourceInstance);

        useSelectorMock.mockReturnValue({ token: 'Mock Token', brands: ['BNBUSDT'], isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockWatchList />
        );
        expect(dummyDispatch).toHaveBeenCalled()
    })

    it('should close event sources', () => {
        global.EventSource = jest.fn(() => mEventSourceInstance);

        useSelectorMock.mockReturnValue({ token: 'Mock Token', brands: ['BNBUSDT'], isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        const { unmount } = render(
            <MockWatchList />
        );
        unmount()
        expect(mEventSourceInstance.close).toHaveBeenCalled()
    })

    it('should display loader', () => {
        global.EventSource = jest.fn(() => mEventSourceInstance);

        useSelectorMock.mockReturnValue({ token: 'Mock Token', brands: ['BNBUSDT'], isLoading:true})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockWatchList />
        );

        const loaderElement = screen.getByTestId("loader");
        expect(loaderElement).toBeInTheDocument();
    })

    it('should display empty watchlist', () => {
        global.EventSource = jest.fn(() => mEventSourceInstance);

        useSelectorMock.mockReturnValue({ token: 'Mock Token', brands: [], isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockWatchList />
        );

        const textElement = screen.getByText("No items currently in your Watch List");
        expect(textElement).toBeInTheDocument();
    })

    it('should display watchlist', () => {
        global.EventSource = jest.fn(() => mEventSourceInstance);

        useSelectorMock.mockReturnValue({ token: 'Mock Token', brands: ['BNBUSDT'], isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockWatchList />
        );

        const tableElement = screen.getByTestId("watchlistTable");
        expect(tableElement).toBeInTheDocument();
    })

})

