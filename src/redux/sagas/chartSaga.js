import { takeEvery, all, call, put } from 'redux-saga/effects'
import { initializeDataSuccess, INITIALIZE_DATA_REQUEST } from '../ducks/chart'
import * as service from './serviceSaga'

//saga workers
function * initializeData () {
  try {
    const response1 = yield call(service.getCryptoList)
    const response2 = yield call(service.getStockList)
    let cryptoList = response1.data.crypto_symbols
    let stockList = response2.data.stock_symbols
    yield put(initializeDataSuccess({ cryptoList, stockList }))
  } catch (error) {
    console.log(error)
  }
}

//saga watchers
function * watchInitializeData () {
  yield takeEvery(INITIALIZE_DATA_REQUEST, initializeData)
}

export function * watchInit () {
  yield all([watchInitializeData()])
}
