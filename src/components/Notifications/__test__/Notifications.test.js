// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import Notifications from "../Notifications";
// import * as reactRedux from "react-redux";
//
// jest.mock('../../../firebaseInit.js', () => ({
//     getToken: jest.fn().mockReturnValue("Mock"),
// }));
//
// describe("Notifications", () => {
//     const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
//     it('should render notifs correctly', async () => {
//         const dummyDispatch = jest.fn()
//         useDispatchMock.mockReturnValue(dummyDispatch);
//
//         render(
//             <Notifications />
//         );
//     })
//
// })