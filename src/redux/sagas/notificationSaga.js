import { takeEvery, call, put, all } from 'redux-saga/effects'
import { authUserFail } from '../ducks/auth'
import {
  getNotificationsFail,
  getNotificationsSuccess,
  GET_NOTIFICATION_REQUEST,
  POST_FIREBASE_TOKEN
} from '../ducks/notifications'
import * as service from './serviceSaga'
// saga workers

function * getNotifications () {
  try {
    const response = yield call(service.notifications)
    let data = response.data
    console.log(data)
    if (data.error !== false) {
      let notifications = data['last 5 days notifications']
      yield put(getNotificationsSuccess(notifications))
    } else {
      yield put(getNotificationsFail(data.message))
    }
  } catch (error) {
    yield put(authUserFail(error))
  }
}

function * firebase ({ payload }) {
  try {
    const response = yield call(service.firebase, payload)
  } catch (error) {}
}

// sagaWatchers

export function * watchNotifications () {
  yield takeEvery(GET_NOTIFICATION_REQUEST, getNotifications)
}

export function * watchFirebase () {
  yield takeEvery(POST_FIREBASE_TOKEN, firebase)
}

export function * watchNotificationWatcher () {
  yield all([watchNotifications(), watchFirebase()])
}
