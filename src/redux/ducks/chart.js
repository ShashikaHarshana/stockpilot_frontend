import axios from "axios";
import {GET_ALL_CRYPTO_URL, GET_ALL_STOCK_URL} from "../../CONSTANTS";

const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL'
const UPDATE_INTERNAL_INDICATORS = 'UPDATE_INTERNAL_INDICATORS'
const UPDATE_EXTERNAL_INDICATORS = 'UPDATE_EXTERNAL_INDICATORS'
const UPDATE_MARKET = 'UPDATE_MARKET'
const UPDATE_MARKET_TYPE = 'UPDATE_MARKET_TYPE'
const RESET_INDICATORS = 'RESET_INDICATORS'
export const INITIALIZE_DATA_REQUEST = 'INITIALIZE_DATA_REQUEST'
const INITIALIZE_DATA_SUCCESS = 'INITIALIZE_DATA_SUCCESS'

export const updateMarket = payload => ({
  type: UPDATE_MARKET,
  payload
})

export const updateTimeInterval = payload => ({
  type: UPDATE_TIME_INTERVAL,
  payload
})

export const updateInternalIndicators = payload => ({
  type: UPDATE_INTERNAL_INDICATORS,
  payload
})

export const updateExternalIndicators = payload => ({
  type: UPDATE_EXTERNAL_INDICATORS,
  payload
})

export const updateMarketType = payload => ({
  type: UPDATE_MARKET_TYPE,
  payload
})

export const resetIndicators = () => ({
  type: RESET_INDICATORS
})

export const initializeDataRequest = () => ({
  type: INITIALIZE_DATA_REQUEST,
})

export const initializeDataSuccess = payload => ({
  type: INITIALIZE_DATA_SUCCESS,
  payload
})

const initialState = {
  cryptoList : [],
  stockList : [],
  timeInterval: '',
  internalIndicators: {},
  externalIndicators: {},
  marketType: '',
  market: '',
  isLoading: false
}

export const chartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_DATA_REQUEST:
      return { ...state, isLoading: true }
    case INITIALIZE_DATA_SUCCESS:
      return { ...state, isLoading: false, cryptoList: payload.cryptoList, stockList: payload.stockList }
    case UPDATE_TIME_INTERVAL:
      return { ...state, timeInterval: payload }
    case UPDATE_MARKET:
      return { ...state, market: payload }
    case UPDATE_MARKET_TYPE:
      return { ...state, marketType: payload }
    case UPDATE_INTERNAL_INDICATORS:
      return { ...state, internalIndicators: payload }
    case UPDATE_EXTERNAL_INDICATORS:
      return { ...state, externalIndicators: payload }
    case RESET_INDICATORS:
      return { ...state, internalIndicators: {}, externalIndicators: {} }
    default:
      return state
  }
}
