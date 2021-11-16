// export const GET_NOTIFICATION_REQUEST = 'GET_NOTIFICATION_REQUEST'
// const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS'
// const GET_NOTIFICATION_FAIL = 'GET_NOTIFICATION_FAIL'
// const OPEN_POP_UP = 'OPEN_POP_UP'
// const CLOSE_POP_UP = 'CLOSE_POP_UP'
// const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
// export const POST_FIREBASE_TOKEN = 'POST_FIREBASE_TOKEN'
//
// export const postFirebaseToken = payload => ({
//   type: POST_FIREBASE_TOKEN,
//   payload
// })
//
// export const openPopUp = payload => ({
//   type: OPEN_POP_UP,
//   payload
// })
//
// export const closePopUp = () => ({
//   type: CLOSE_POP_UP
// })
//
// export const getNotifications = () => ({
//   type: GET_NOTIFICATION_REQUEST
// })
// export const getNotificationsSuccess = payload => ({
//   type: GET_NOTIFICATION_SUCCESS,
//   payload
// })
// export const getNotificationsFail = payload => ({
//   type: GET_NOTIFICATION_FAIL,
//   payload
// })
//
// export const deleteNotification = payload => ({
//   type: DELETE_NOTIFICATION,
//   payload
// })
//
// const initialState = {
//   notifications: null,
//   token: '',
//   loading: false,
//   error: null,
//   confirmationDialog: {
//     isOpen: false,
//     title: '',
//     subTitle: '',
//     item: {}
//   }
// }
//
// export const notificationReducer = (
//   state = initialState,
//   { type, payload }
// ) => {
//   switch (type) {
//     case GET_NOTIFICATION_REQUEST:
//       return { ...state, loading: true }
//     case GET_NOTIFICATION_SUCCESS:
//       return { ...state, loading: false, notifications: payload }
//     case GET_NOTIFICATION_FAIL:
//       return { ...state, loading: true, error: payload }
//     case OPEN_POP_UP:
//       return {
//         ...state,
//         confirmationDialog: payload
//       }
//     case CLOSE_POP_UP:
//       return {
//         ...state,
//         confirmationDialog: { ...state.confirmationDialog, isOpen: false }
//       }
//     case DELETE_NOTIFICATION:
//       let tempNotifications = state.notifications.filter(
//         item => item[0] !== payload
//       )
//       return {
//         ...state,
//         notifications: tempNotifications
//       }
//     case POST_FIREBASE_TOKEN:
//       return { ...state, token: payload }
//     default:
//       return state
//   }
// }
