const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL'
const UPDATE_INTERNAL_INDICATORS = 'UPDATE_INTERNAL_INDICATORS'
const UPDATE_EXTERNAL_INDICATORS = 'UPDATE_EXTERNAL_INDICATORS'
const UPDATE_MARKET = 'UPDATE_MARKET'

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

const initialState = {
  timeInterval: '',
  internalIndicators: {},
  externalIndicators: {},

  market: ''
}

export const chartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_TIME_INTERVAL:
      return { ...state, timeInterval: payload }
    case UPDATE_MARKET:
      return { ...state, market: payload }
    case UPDATE_INTERNAL_INDICATORS:
      return { ...state, internalIndicators: payload }
    case UPDATE_EXTERNAL_INDICATORS:
      return { ...state, externalIndicators: payload }
    default:
      return state
  }
}
