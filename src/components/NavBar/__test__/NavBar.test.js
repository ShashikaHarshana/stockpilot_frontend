import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import NavBar from "../index";
import React from "react";
import theme from "../../../utils/theme";
import {ThemeProvider} from "@material-ui/core/styles";
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
global.window = { location: { pathname: null } };


describe('NavBar', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
        useSelectorMock.mockReturnValue({ isLoggedIn: false})

    })
    it('should redirect to home', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("home");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/');
    });

    it('should redirect to stock', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("stock");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/analyze/stock');
    });

    it('should redirect to crypto', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("crypto");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/analyze/crypto');
    });

    it('should not display watchlist', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.queryByTestId("watchlist");
        expect(buttonElement).not.toBeInTheDocument();

    });

    it('should display watchlist', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.queryByTestId("watchlist");
        expect(buttonElement).toBeInTheDocument();

    });

    it('should redirect to watchlist', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("watchlist");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/watchList');
    });

    it('should not display profile button', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.queryByTestId("openMenu");
        expect(buttonElement).not.toBeInTheDocument();

    });

    it('should display profile button', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true})
        render(
            <MockNavBar />
        );
        const buttonElement = screen.queryByTestId("openMenu");
        expect(buttonElement).toBeInTheDocument();

    });

    it('should redirect to profile', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true})
        render(
            <MockNavBar />
        );
        const openButton = screen.getByTestId("openMenu");
        fireEvent.click(openButton);
        const buttonElement = screen.getByTestId("profile");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/profile');
    });

    it('should redirect to signin', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("signin");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/sign_in');
    });

    it('should redirect to signup', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("signup");
        fireEvent.click(buttonElement);
        expect(global.window.location.pathname).toEqual('/sign_up');
    });

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