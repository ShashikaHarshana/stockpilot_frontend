export const VIEW_WATCHLIST_REQUEST = 'VIEW_WATCHLIST_REQUEST'
const VIEW_WATCHLIST_SUCCESS = 'VIEW_WATCHLIST_SUCCESS'
const VIEW_WATCHLIST_FAIL = 'VIEW_WATCHLIST_FAIL'

export const ADD_TO_WATCHLIST_REQUEST = 'ADD_TO_WATCHLIST'
const ADD_TO_WATCHLIST_SUCCESS = 'ADD_TO_WATCHLIST_SUCCESS'
const ADD_TO_WATCHLIST_FAIL = 'ADD_TO_WATCHLIST_FAIL'

export const REMOVE_FROM_WATCHLIST_REQUEST = 'REMOVE_FROM_WATCHLIST'
const REMOVE_FROM_WATCHLIST_SUCCESS = 'REMOVE_FROM_WATCHLIST_SUCCESS'
const REMOVE_FROM_WATCHLIST_FAIL = 'REMOVE_FROM_WATCHLIST_FAIL'


export const viewWatchlist = token => ({
    type: VIEW_WATCHLIST_REQUEST,
    payload: token
})

export const viewWatchlistSuccess = data => ({
    type: VIEW_WATCHLIST_SUCCESS,
    payload: data
})

export const viewWatchlistFail = data => ({
    type: VIEW_WATCHLIST_FAIL,
    payload: data
})

export const addToWatchlist = data => ({
    type: ADD_TO_WATCHLIST_REQUEST,
    payload: data
})

export const addToWatchlistSuccess = data => ({
    type: ADD_TO_WATCHLIST_SUCCESS,
    payload: data
})

export const addToWatchlistFail = data => ({
    type: ADD_TO_WATCHLIST_FAIL,
    payload: data
})

export const removeFromWatchlist = data => ({
    type: REMOVE_FROM_WATCHLIST_REQUEST,
    payload: data
})

export const removeFromWatchlistSuccess = data => ({
    type: REMOVE_FROM_WATCHLIST_SUCCESS,
    payload: data
})

export const removeFromWatchlistFail = data => ({
    type: REMOVE_FROM_WATCHLIST_FAIL,
    payload: data
})

const initialState = {
    brands: null,
    message: null,
    isLoading: false,
    added: [],
}

export const watchlistReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case VIEW_WATCHLIST_REQUEST:
        case REMOVE_FROM_WATCHLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case ADD_TO_WATCHLIST_REQUEST:
            let added = state.added;
            added.push(payload.brands[0])
            return {
                ...state,
                added : added,
                isLoading: true
            }

        case VIEW_WATCHLIST_SUCCESS:
            return {
                ...state,
                brands: payload.brands,
                message: payload.message,
                isLoading: false
            }
        case VIEW_WATCHLIST_FAIL:
            return {
                ...state,
                isLoading: false,
                message: payload,
            }
        case ADD_TO_WATCHLIST_SUCCESS:
            return {
                ...state,
                message: payload,
                isLoading: false
            }
        case ADD_TO_WATCHLIST_FAIL:
            return {
                ...state,
                isLoading: false,
                message: payload,
            }
        case REMOVE_FROM_WATCHLIST_SUCCESS:
            return {
                ...state,
                message: payload.message,
                brands: payload.brands,
                isLoading: false
            }
        case REMOVE_FROM_WATCHLIST_FAIL:
            return {
                ...state,
                isLoading: false,
                message: payload,
            }
        default:
            return state
    }
}

//comment
