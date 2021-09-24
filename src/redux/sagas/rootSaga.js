import { watchAuth } from './authSaga'
import { all } from 'redux-saga/effects'

export function * watcherSaga () {
  yield all([watchAuth()])
}
