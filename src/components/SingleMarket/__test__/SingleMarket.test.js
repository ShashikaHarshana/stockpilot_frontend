import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import React from "react";
import theme from "../../../utils/theme";
import {ThemeProvider} from "@material-ui/core/styles";
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import SingleMarket from "../SingleMaret";
import store from "../../../redux/Store";
import {Provider} from "react-redux";
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\chartDropdown\\SelectMarket.js');
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\graph\\TimeIndicatorBox.js');
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\Charts\\CryptoChart.js');
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\Charts\\StockChart.js')
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\technicalIndicators\\linechart.js')
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\technicalIndicators\\macd.js')
jest.mock('G:\\Projects\\stockpilot_frontend\\src\\components\\technicalIndicators\\stochChart.js')


jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
}));


const MockSingleMarket = () => {
    return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <SingleMarket/>
                </BrowserRouter>
            </ThemeProvider>
    )
}
global.window = { location: { pathname: null } };


describe('Single Market', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    const useParams = jest.spyOn(ReactRouter, 'useParams')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })


    it('should render stock chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:false, obv:false, roc:false, rsi:false, stoch:false},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'stock' });
        render(
            <MockSingleMarket />
        );
        const stockChartElement = screen.getByTestId("stockChart")
        expect(stockChartElement).toBeInTheDocument();
    });

    it('should render crypto chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:false, obv:false, roc:false, rsi:false, stoch:false},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'crypto' });
        render(
            <MockSingleMarket />
        );
        const cryptoChartElement = screen.getByTestId("cryptoChart")
        expect(cryptoChartElement).toBeInTheDocument();
    });

    it('should render only line chart for rsi, roc, obv chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:false, obv:false, roc:false, rsi:true, stoch:false},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'crypto' });
        render(
            <MockSingleMarket />
        );
        const lineChartElement = screen.queryByTestId("LineChart")
        const macdChartElement = screen.queryByTestId("MACDChart")
        const stochChartElement = screen.queryByTestId("StochChart")

        expect(lineChartElement).toBeInTheDocument();
        expect(macdChartElement).not.toBeInTheDocument();
        expect(stochChartElement).not.toBeInTheDocument();
    });

    it('should render only macd chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:true, obv:false, roc:false, rsi:false, stoch:false},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'crypto' });
        render(
            <MockSingleMarket />
        );
        const lineChartElement = screen.queryByTestId("LineChart")
        const macdChartElement = screen.queryByTestId("MACDChart")
        const stochChartElement = screen.queryByTestId("StochChart")

        expect(lineChartElement).not.toBeInTheDocument();
        expect(macdChartElement).toBeInTheDocument();
        expect(stochChartElement).not.toBeInTheDocument();
    });

    it('should render stoch chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:false, obv:false, roc:false, rsi:false, stoch:true},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'crypto' });
        render(
            <MockSingleMarket />
        );
        const lineChartElement = screen.queryByTestId("LineChart")
        const macdChartElement = screen.queryByTestId("MACDChart")
        const stochChartElement = screen.queryByTestId("StochChart")

        expect(lineChartElement).not.toBeInTheDocument();
        expect(macdChartElement).not.toBeInTheDocument();
        expect(stochChartElement).toBeInTheDocument();
    });

    it('should render all chart', () =>  {
        useSelectorMock.mockReturnValue(
            {
                externalIndicators: { macd:true, obv:true, roc:true, rsi:true, stoch:true},
            })
        useDispatchMock.mockReturnValue(jest.fn)
        useParams.mockReturnValue({ type: 'crypto' });
        render(
            <MockSingleMarket />
        );
        const lineChartElements = screen.queryAllByTestId("LineChart")
        const macdChartElement = screen.queryByTestId("MACDChart")
        const stochChartElement = screen.queryByTestId("StochChart")

        expect(lineChartElements[0]).toBeInTheDocument();
        expect(macdChartElement).toBeInTheDocument();
        expect(stochChartElement).toBeInTheDocument();
    });
})