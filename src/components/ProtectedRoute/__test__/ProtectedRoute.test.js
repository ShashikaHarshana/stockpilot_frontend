import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"

import React from "react";
import theme from "../../../utils/theme";
import {ThemeProvider} from "@material-ui/core/styles";
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import ProtectedRoute from "../ProtectedRoute";
import Profile from "../../../pages/Profile";
import debug from "debug";

const mockComponent = () => <div />

const MockProtectedRoute = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ProtectedRoute path='/mock' component={mockComponent}/>
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
    })

    it('should render component if logged in', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true})
        render(
            <MockProtectedRoute />
        );
        const component = screen.queryByTestId("data-testid")
        expect(component).toBeDefined();

    });

    it('should redirect to home if not logged in', () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false})
        render(
            <MockProtectedRoute />
        );
        expect(global.window.location.pathname).toEqual('/');
    });

})