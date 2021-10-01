import { takeEvery, all, call, put } from 'redux-saga/effects'
import { authUser, authUserFail } from '../ducks/auth'
import {
  getNotificationsFail,
  getNotificationsSuccess,
  GET_NOTIFICATION_REQUEST
} from '../ducks/notifications'
import * as service from './serviceSaga'
// saga workers

function * getNotifications ({ payload }) {
  try {
    const response = yield call(service.notifications, payload)
    let data = response.data
    if (response.data.error === false) {
      yield put(getNotificationsSuccess(data))
    } else {
      yield put(getNotificationsFail(data.message))
    }
  } catch (error) {
    yield put(authUserFail(error))
  }
}

// sagaWatchers

export function * watchNotifications () {
  yield takeEvery(GET_NOTIFICATION_REQUEST, getNotifications)
}
