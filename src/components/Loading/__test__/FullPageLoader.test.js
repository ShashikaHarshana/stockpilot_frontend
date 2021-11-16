import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import theme from '../../../utils/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import {render, screen} from "@testing-library/react";
import FullPageLoader from "../FullPageLoader";

const MockFullPageLoader = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <FullPageLoader/>
            </BrowserRouter>
        </ThemeProvider>
    )

}


describe('Full Page Loader', () => {
    it('should render chart loader', () => {
        render(
            <MockFullPageLoader />
        );
        const element = screen.getByTestId("loader");
        expect(element).toBeInTheDocument();
    })
})

