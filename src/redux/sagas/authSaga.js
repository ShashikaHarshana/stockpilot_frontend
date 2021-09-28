import { takeEvery, all, call, put } from 'redux-saga/effects'
import {
  authUserFail,
  authUserSuccess,
  AUTH_USER_REQUEST,
  userRegisterFail,
  userRegisterSuccess,
  USER_REGISTER_REQUEST
} from '../ducks/auth'
import * as service from './serviceSaga'

//saga workers
function * login ({ payload }) {
  try {
    const response = yield call(service.login, payload)
    let data = response.data
    if (response.data.message === 'Login Successful!'){
      yield put(authUserSuccess(data))
    } else {
      yield put(authUserFail(data.message))
    }

  } catch (error) {
    yield put(authUserFail(error))
  }
}

function * register ({ payload }) {
  try {
    const response = yield call(service.register, payload)
    let message = response.data.message
    yield put(userRegisterSuccess(message))
  } catch (error) {
    yield put(userRegisterFail(error))
  }
}

//saga watchers
function * watchLogin () {
  yield takeEvery(AUTH_USER_REQUEST, login)
}

function * watchRegister () {
  yield takeEvery(USER_REGISTER_REQUEST, register)
}

export function * watchAuth () {
  yield all([watchLogin(), watchRegister()])
}
