import { all } from 'redux-saga/effects'
import { AUTH_USER_REQUEST } from '../ducks/auth'

function * authFlow () {
  while (true) {
    const action = yield take(AUTH_USER_REQUEST)
    console.log(action)
  }
}

export function * authSaga () {
  yield all([authFlow(), RegisterWatcher()])
}
