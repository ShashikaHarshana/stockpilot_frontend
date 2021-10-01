export const GET_NOTIFICATION_REQUEST = 'GET_NOTIFICATION_REQUEST'
export const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS'
export const GET_NOTIFICATION_FAIL = 'GET_NOTIFICATION_FAIL'

export const getNotifications = () => ({
  type: GET_NOTIFICATION_REQUEST
})
export const getNotificationsSuccess = payload => ({
  type: GET_NOTIFICATION_SUCCESS,
  payload
})
export const getNotificationsFail = payload => ({
  type: GET_NOTIFICATION_FAIL,
  payload
})

const initialState = {
  notifications: null,
  loading: false,
  error: null
}

export const notificationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_NOTIFICATION_REQUEST:
      return { ...state, loading: true }
    case GET_NOTIFICATION_SUCCESS:
      return { ...state, loading: false, notifications: payload }
    case GET_NOTIFICATION_FAIL:
      return { ...state, loading: true, error: payload }

    default:
      return state
  }
}
