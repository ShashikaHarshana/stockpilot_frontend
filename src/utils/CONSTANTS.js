//URLs
export const BASE_URL =
  process.env.REACT_APP_BASEURL !== undefined
    ? process.env.REACT_APP_BASEURL
    : 'http://127.0.0.1:5000/'

export const REGISTER_URL = BASE_URL + 'user/register'
export const LOGIN_URL = BASE_URL + 'user/login'

export const TA_BASE_URL = BASE_URL + 'ta/'

export const HISTORICAL_URL = BASE_URL + 'binance/historical/'
export const LISTEN_URL = BASE_URL + 'binance/listen/'

export const VIEW_WATCHLIST_URL = BASE_URL + 'watchlist/view'
export const ADD_TO_WATCHLIST_URL = BASE_URL + 'watchlist/addBrand'
export const REMOVE_FROM_WATCHLIST_URL = BASE_URL + 'watchlist/removeBrand'

export const GET_ALL_CRYPTO_URL = BASE_URL + 'binance/get_crypto'
export const GET_ALL_STOCK_URL = BASE_URL + 'stock/get_stock_list'

export const GET_NOTIFICATIONS_URL =
  BASE_URL + 'notifications/historical_nots/open_price'

export const ADD_FIREBASE_TOKEN_URL = BASE_URL + '/listen_nots/open_price'
