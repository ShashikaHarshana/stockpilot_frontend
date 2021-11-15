import createSagaMiddleware from '@redux-saga/core'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { authReducer } from './ducks/auth'
import { chartReducer } from './ducks/chart'
import { watcherSaga } from './sagas/rootSaga'
import { watchlistReducer } from './ducks/watchlist'
import { notificationReducer } from './ducks/notifications'

const reducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
  chart: chartReducer,
  notifications: notificationReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

sagaMiddleware.run(watcherSaga)

export default store
