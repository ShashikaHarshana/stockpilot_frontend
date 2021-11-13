import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import NavBar from "../index";
import store from "../../../redux/Store";
import {Provider} from "react-redux";
import React from "react";
import theme from "../../../utils/theme";
import {ThemeProvider} from "@material-ui/core/styles";
import '@testing-library/jest-dom'


const MockNavBar = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar/>
            </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}
global.window = { location: { pathname: null } };

describe('NavBar', () => {

    it('should render NavBar', () => {
        render(
            <MockNavBar />
        );
        const buttonElement = screen.getByTestId("stock");

        // expect(global.window.location.pathname).toEqual('/new-url');
        fireEvent.click(buttonElement);
        console.log(global.window.location.pathname)
        // expect(buttonElement).toBeInTheDocument();
    });
})