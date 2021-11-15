export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL'

export const USER_REGISTER_REQUEST = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_REFRESH = 'USER_REFRESH'

export const authUser = creds => ({
  type: AUTH_USER_REQUEST,
  payload: creds
})

export const authUserSuccess = data => ({
  type: AUTH_USER_SUCCESS,
  payload: data
})

export const authUserFail = error => ({
  type: AUTH_USER_FAIL,
  payload: error
})

export const userRegister = user => ({
  type: USER_REGISTER_REQUEST,
  payload: user
})

export const userRegisterSuccess = user => ({
  type: USER_REGISTER_SUCCESS,
  payload: user
})

export const userRegisterFail = error => ({
  type: USER_REGISTER_FAIL,
  payload: error
})

export const logOut = () => ({
  type: USER_LOGOUT
})

export const userRefresh = payload => ({
  type: USER_REFRESH,
  payload
})

export const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRegistered: false,
  error: null,
  message: null
}

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_USER_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        message: payload.message,
        isLoggedIn: true,
        isLoading: false
      }
    case AUTH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        message: payload,
        error: payload
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: payload,
        isRegistered: true,
        isLoading: false
      }
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case USER_LOGOUT:
      localStorage.removeItem('token')
      return { ...state, isLoggedIn: false }

    case USER_REFRESH:
      return { ...state, token: payload, isLoggedIn: true }

    default:
      return state
  }
}

//comment
