import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import * as reactRedux from "react-redux";
import ReactNotificationComponent from "../ReactNotifications";


describe("Notifications", () => {
    it('should render notifs correctly', async () => {
        const {debug} = render(
            <ReactNotificationComponent title="mock" body="mock"/>
        );
        const toastElement = await screen.findByRole("alert")
        expect(toastElement).toBeInTheDocument();
    })

    it('should render notifs correctly', async () => {
        const {debug} = render(
            <ReactNotificationComponent title='' />
        );

        const toastElement =  screen.queryByTestId('alert')
        expect(toastElement).not.toBeInTheDocument();
    })


})