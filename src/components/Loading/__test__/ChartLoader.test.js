import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import theme from '../../../utils/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom'
import { render, screen} from "@testing-library/react";
import ChartLoader from "../ChartLoader";

const MockChartLoader = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ChartLoader/>
            </BrowserRouter>
        </ThemeProvider>
    )

}


describe('Chart Loader', () => {
    it('should render chart loader', () => {
        render(
            <MockChartLoader />
        );
        const element = screen.getByTestId("chartLoader");
        expect(element).toBeInTheDocument();
    })
})

