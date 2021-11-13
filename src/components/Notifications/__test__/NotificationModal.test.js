import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import React from "react";
import theme from "../../../utils/theme";
import {ThemeProvider} from "@material-ui/core/styles";
import '@testing-library/jest-dom'
import * as reactRedux from 'react-redux'
import NotificationModal from "../NotificationModal";

const MockNotificationModal = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NotificationModal />
            </BrowserRouter>
        </ThemeProvider>
    )
}


describe('NotificationModal', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    it('should view no notifications', () => {
        useSelectorMock.mockReturnValue({ notifications: []})
        render(
            <MockNotificationModal />
        );
        const textElement = screen.getByText(/No new Notifications/i);
        expect(textElement).toBeInTheDocument();
    });
    describe('Notification details', () => {
        it('should view symbol', () => {
            useSelectorMock.mockReturnValue({ notifications: [["Mock", {symbol:"BNBUSDT", type:"Mock Type", 'open price':100.0, 'current peak price':"Mock Peak Price"}]]})

            render(
                <MockNotificationModal />
            );
            const symbol = screen.queryByText("BNBUSDT")
            expect(symbol).toBeInTheDocument();
        });

        it('should view type', () => {
            useSelectorMock.mockReturnValue({ notifications: [["Mock", {symbol:"BNBUSDT", type:"Mock Type", 'open price':100.0, 'current peak price':"Mock Peak Price"}]]})

            render(
                <MockNotificationModal />
            );
            const type = screen.queryByText("Mock Type")
            expect(type).toBeInTheDocument();
        });

        it('should view open price', () => {
            useSelectorMock.mockReturnValue({ notifications: [["Mock", {symbol:"BNBUSDT", type:"Mock Type", 'open price':100.0, 'current peak price':"Mock Peak Price"}]]})

            render(
                <MockNotificationModal />
            );
            const open = screen.queryByText("100.0000")
            expect(open).toBeInTheDocument();
        });

        it('should view peak price', () => {
            useSelectorMock.mockReturnValue({ notifications: [["Mock", {symbol:"BNBUSDT", type:"Mock Type", 'open price':100.0, 'current peak price':"100.0"}]]})

            render(
                <MockNotificationModal />
            );
            const peak = screen.queryByText("100.0")
            expect(peak).toBeInTheDocument();
        });
    })

    it('should call delete notif', () => {
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
        useSelectorMock.mockReturnValue({ notifications: [["Mock", {symbol:"BNBUSDT", type:"Mock Type", 'open price':100.0, 'current peak price':"100.0"}]]})


        render(
            <MockNotificationModal />
        );
        const deleteButton = screen.getAllByRole("button")
        fireEvent.click(deleteButton[deleteButton.length - 1])
        expect(dummyDispatch).toHaveBeenCalled()
    });


})