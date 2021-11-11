import axios from 'axios'
import {
  ADD_TO_WATCHLIST_URL,
  GET_ALL_CRYPTO_URL,
  GET_ALL_STOCK_URL,
  LOGIN_URL,
  REGISTER_URL,
  REMOVE_FROM_WATCHLIST_URL,
  VIEW_WATCHLIST_URL,
  GET_NOTIFICATIONS_URL
} from '../../utils/CONSTANTS'

export function register (user) {
  return axios.post(REGISTER_URL, {
    user
  })
}

export function login (creds) {
  return axios.post(LOGIN_URL, {
    creds
  })
}

export function viewWatchlist (token) {
  return axios.get(VIEW_WATCHLIST_URL, {
    headers: {
      'x-access-token': token
    }
  })
}

export function addToWatchlist (data) {
  return axios.post(
    ADD_TO_WATCHLIST_URL,
    {
      brands: data.brands
    },
    {
      headers: {
        'x-access-token': data.token
      }
    }
  )
}

export function removeFromWatchlist (data) {
  return axios.delete(REMOVE_FROM_WATCHLIST_URL, {
    data: { brands: data.brands },
    headers: { 'x-access-token': data.token }
  })
}

export function getCryptoList () {
  return axios.get(GET_ALL_CRYPTO_URL)
}

export function getStockList () {
  return axios.get(GET_ALL_STOCK_URL)
}

export function notifications () {
  return axios.get(GET_NOTIFICATIONS_URL)
}
export function firebase (payload) {
  return axios.post(ADD_FIREBASE_TOKEN_URL, {
    token: payload
  })
}
//
///user/login
//user/register
