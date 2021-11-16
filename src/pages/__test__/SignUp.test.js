import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import SignIn from "../SignIn";
import theme from "../../utils/theme";
import SignUp from "../SignUp";

const MockSignUp = () => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        </ThemeProvider>
    )

}
global.window = { location: { pathname: null } }


describe('SignUp', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    it('should redirect if logged in', () => {
        useSelectorMock.mockReturnValue({ isRegistered: true, signupMessage: null, isLoading:false})
        render(
            <MockSignUp />
        );
        expect(global.window.location.pathname).toEqual('/sign_in');
    });

    it('should redirect to sign in', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: 'Mock message', isLoading:false})
        render(
            <MockSignUp />
        );
        const buttonElement = screen.getByTestId("signInButton");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/sign_in');
    })

    it('should show success alert', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: 'Successfully Registered', isLoading:false})
        render(
            <MockSignUp />
        );
        const alertElement = screen.getByTestId("success");
        expect(alertElement).toBeInTheDocument();
    })

    it('should show error alert', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: 'Error', isLoading:false})
        render(
            <MockSignUp />
        );
        const alertElement = screen.getByTestId("error");
        expect(alertElement).toBeInTheDocument();
    })

    it('should display loading', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: null, isLoading:true})
        render(
            <MockSignUp />
        );
        const loadingElement = screen.getByTestId("loading");
        expect(loadingElement).toBeInTheDocument();
    })

    it('should submit form correctly', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: null, isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockSignUp />
        );
        const inputFirstNameElement = screen.getByTestId('firstName');
        const inputLastNameElement = screen.getByTestId('lastName');
        const inputEmailElement = screen.getByTestId('email');
        const inputPasswordElement = screen.getByTestId('password');

        const buttonElement = screen.getByTestId("submitButton" );

        fireEvent.change(inputEmailElement, { target: { value: 'mock@gmail.com' } });
        fireEvent.change(inputPasswordElement, { target: { value: 'abcd1234' } });
        fireEvent.change(inputFirstNameElement, { target: { value: 'Mock' } });
        fireEvent.change(inputLastNameElement, { target: { value: 'Mock' } });
        fireEvent.click(buttonElement);
        expect(dummyDispatch).toHaveBeenCalled()
    })

    it('should indicate incorrect email error', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: null, isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockSignUp />
        );
        const inputFirstNameElement = screen.getByTestId('firstName');
        const inputLastNameElement = screen.getByTestId('lastName');
        const inputEmailElement = screen.getByTestId('email');
        const inputPasswordElement = screen.getByTestId('password');

        const buttonElement = screen.getByTestId("submitButton" );

        fireEvent.change(inputEmailElement, { target: { value: 'mock' } });
        fireEvent.change(inputPasswordElement, { target: { value: 'abcd1234' } });
        fireEvent.change(inputFirstNameElement, { target: { value: 'Mock' } });
        fireEvent.change(inputLastNameElement, { target: { value: 'Mock' } });
        fireEvent.click(buttonElement);

        const textElement = screen.queryByText('*Email is not Valid')
        expect(textElement).toBeInTheDocument();
        expect(dummyDispatch).not.toHaveBeenCalled()
    })


    it('should indicate incorrect password format', () => {
        useSelectorMock.mockReturnValue({ isRegistered: false, signupMessage: null, isLoading:false})
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)

        render(
            <MockSignUp />
        );
        const inputFirstNameElement = screen.getByTestId('firstName');
        const inputLastNameElement = screen.getByTestId('lastName');
        const inputEmailElement = screen.getByTestId('email');
        const inputPasswordElement = screen.getByTestId('password');

        const buttonElement = screen.getByTestId("submitButton" );

        fireEvent.change(inputEmailElement, { target: { value: 'mock' } });
        fireEvent.change(inputPasswordElement, { target: { value: 'dfs' } });
        fireEvent.change(inputFirstNameElement, { target: { value: 'Mock' } });
        fireEvent.change(inputLastNameElement, { target: { value: 'Mock' } });
        fireEvent.click(buttonElement);

        const textElement = screen.queryByText('*Password must be at least 8 characters with numbers and letters')
        expect(textElement).toBeInTheDocument();
        expect(dummyDispatch).not.toHaveBeenCalled()
    })

})

