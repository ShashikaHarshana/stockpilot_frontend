import { watchAuth } from './authSaga'
import { watchWatchlist } from './watchlistSaga'
import { all } from 'redux-saga/effects'

export function * watcherSaga () {
  yield all([watchAuth(), watchWatchlist()])
}
