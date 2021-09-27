export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
const AUTH_USER_FAIL = 'AUTH_USER_FAIL'

export const USER_REGISTER_REQUEST = 'USER_REGISTER'
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

export const USER_LOGOUT = 'USER_LOGOUT'

export const authUser = creds => ({
  type: AUTH_USER_REQUEST,
  payload: creds
})

export const authUserSuccess = user => ({
  type: AUTH_USER_SUCCESS,
  payload: user
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

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
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
        user: payload,
        isLoggedIn: true,
        isLoading: false
      }
    case AUTH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: payload,
        isLoggedIn: true,
        isLoading: false
      }
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case USER_LOGOUT:
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

//comment
