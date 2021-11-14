import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../index'
import React from 'react'
import theme from '../../../utils/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'

const MockNavBar = () => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar/>
            </BrowserRouter>
        </ThemeProvider>
    )

}
global.window = { location: { pathname: null } }


describe('NavBar', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
        useSelectorMock.mockReturnValue({ isLoggedIn: false})

    })

    it('should open Notifications', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true, notifications: []})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("notifs");
        fireEvent.click(buttonElement);
        const modalElement = screen.queryByTestId("notifModel")
        expect(modalElement).toBeInTheDocument();
    });

})

