import { takeEvery, all, call, put } from 'redux-saga/effects'
import {
    viewWatchlistFail,
    viewWatchlistSuccess,
    VIEW_WATCHLIST_REQUEST,
    addToWatchlistFail,
    addToWatchlistSuccess,
    ADD_TO_WATCHLIST_REQUEST,
    removeFromWatchlistFail,
    removeFromWatchlistSuccess, REMOVE_FROM_WATCHLIST_REQUEST
} from '../ducks/watchlist'
import * as service from './serviceSaga'

//saga workers
function * viewWatchlist ({ payload }) {
    try {
        const response = yield call(service.viewWatchlist, payload)
        let data = response.data
        if (response.data.error === false){
            yield put(viewWatchlistSuccess(data))
        } else {
            yield put(viewWatchlistFail(data.message))
        }

    } catch (error) {
        yield put(viewWatchlistFail(error))
    }
}

function * addToWatchlist ({ payload }) {
    try {
        const response = yield call(service.addToWatchlist, payload)
        let message = response.data.message
        yield put(addToWatchlistSuccess(message))
    } catch (error) {
        yield put(addToWatchlistFail(error))
    }
}

function * removeFromWatchlist ({ payload }) {
    try {
        const response = yield call(service.removeFromWatchlist, payload)
        let message = response.data.message
        if (response.data.error === 'false'){
            yield put(removeFromWatchlistSuccess(message))
        } else {
            yield put(removeFromWatchlistFail(message))
        }

    } catch (error) {
        yield put(removeFromWatchlistFail(error))
    }
}

//saga watchers
function * watchViewWatchlist () {
    yield takeEvery(VIEW_WATCHLIST_REQUEST, viewWatchlist)
}

function * watchAddToWatchlist () {
    yield takeEvery(ADD_TO_WATCHLIST_REQUEST, addToWatchlist)
}

function * watchRemoveFromWatchlist () {
    yield takeEvery(REMOVE_FROM_WATCHLIST_REQUEST, removeFromWatchlist)
}

export function * watchWatchlist () {
    yield all([watchViewWatchlist(), watchAddToWatchlist(), watchRemoveFromWatchlist()])
}
