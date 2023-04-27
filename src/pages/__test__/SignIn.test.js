import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import SignIn from "../SignIn";
import theme from "../../utils/theme";

const MockSignIn = () => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        </ThemeProvider>
    )

}
global.window = { location: { pathname: null } }


describe('SignIn', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    it('should redirect if logged in', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true, loginMessage: 'Mock message', isLoading:false})
        render(
            <MockSignIn />
        );
        expect(global.window.location.pathname).toEqual('/');
    });

    it('should redirect to sign up', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, loginMessage: 'Mock message', isLoading:false})
        render(
            <MockSignIn />
        );
        const buttonElement = screen.getByTestId("signupButton");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/sign_up');
    })

    it('should show success alert', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, loginMessage: 'Login Successful!', isLoading:false})
        render(
            <MockSignIn />
        );
        const alertElement = screen.getByTestId("success");
        expect(alertElement).toBeInTheDocument();
    })

    it('should show error alert', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, loginMessage: 'Error', isLoading:false})
        render(
            <MockSignIn />
        );
        const alertElement = screen.getByTestId("error");
        expect(alertElement).toBeInTheDocument();
    })

    it('should submit form', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, loginMessage: 'Error', isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockSignIn />
        );
        const inputEmailElement = screen.getByTestId('email');
        const inputPasswordElement = screen.getByTestId('password');

        const buttonElement = screen.getByTestId("submitButton" );

        fireEvent.change(inputEmailElement, { target: { value: 'Mock email' } });
        fireEvent.change(inputPasswordElement, { target: { value: 'Mock password' } });

        fireEvent.click(buttonElement);
        expect(dummyDispatch).toHaveBeenCalled()

    })

    it('should display loading', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, loginMessage: null, isLoading:true})
        render(
            <MockSignIn />
        );
        const loadingElement = screen.getByTestId("loading");
        expect(loadingElement).toBeInTheDocument();
    })


})

