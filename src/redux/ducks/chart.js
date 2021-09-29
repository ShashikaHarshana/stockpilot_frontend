const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL'
const UPDATE_INTERNAL_INDICATORS = 'UPDATE_INTERNAL_INDICATORS'
const UPDATE_EXTERNAL_INDICATORS = 'UPDATE_EXTERNAL_INDICATORS'
const UPDATE_MARKET = 'UPDATE_MARKET'
const UPDATE_MARKET_TYPE = 'UPDATE_MARKET_TYPE'
const RESET_INDICATORS = 'RESET_INDICATORS'
const SET_STOCK_LOADING = 'SET_STOCK_LOADING'

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

export const setStockLoading = payload => ({
  type: SET_STOCK_LOADING,
  payload
})

const initialState = {
  timeInterval: '',
  stockLoading: true,
  internalIndicators: {},
  externalIndicators: {},
  marketType: '',
  market: ''
}

export const chartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_TIME_INTERVAL:
      return { ...state, timeInterval: payload, stockLoading: true }
    case UPDATE_MARKET:
      return { ...state, market: payload, stockLoading: true }
    case UPDATE_MARKET_TYPE:
      return { ...state, marketType: payload }
    case UPDATE_INTERNAL_INDICATORS:
      return { ...state, internalIndicators: payload, stockLoading: true }
    case UPDATE_EXTERNAL_INDICATORS:
      return { ...state, externalIndicators: payload }
    case SET_STOCK_LOADING:
      return { ...state, stockLoading: false }
    case RESET_INDICATORS:
      return { ...state, internalIndicators: {}, externalIndicators: {} }
    default:
      return state
  }
}
