import createSagaMiddleware from '@redux-saga/core'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { authReducer } from './ducks/auth'
import { chartReducer } from './ducks/chart'
import { watcherSaga } from './sagas/rootSaga'

const reducer = combineReducers({
  auth: authReducer,
  chart: chartReducer
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
