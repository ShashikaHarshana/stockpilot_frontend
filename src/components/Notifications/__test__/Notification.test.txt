import { render, screen } from '@testing-library/react';
import Notification from "../Notification";
import '@testing-library/jest-dom'

describe("Notification", () => {

    it('should render notif correctly', async () => {
        render(
            <Notification notify={{message: "Test message", isOpen:true }} setNotify={jest.fn()}/>
        );
        const alertElement = screen.getByTestId("notifAlert");
        expect(alertElement.innerHTML).toMatch(/Test message/i);
    })
})