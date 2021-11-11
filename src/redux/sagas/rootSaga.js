import { watchAuth } from './authSaga'
import { watchWatchlist } from './watchlistSaga'
import { all } from 'redux-saga/effects'
import { watchInit } from './chartSaga'
import {
  watchNotifications,
  watchNotificationWatcher
} from './notificationSaga'

export function * watcherSaga () {
  yield all([
    watchAuth(),
    watchWatchlist(),
    watchInit(),
    watchNotificationWatcher()
  ])
}
