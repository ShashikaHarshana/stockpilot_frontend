// noinspection JSUnusedGlobalSymbols

const UPDATE_TIME_INTERVAL = 'UPDATE_TIME_INTERVAL'
const UPDATE_INTERNAL_INDICATORS = 'UPDATE_INTERNAL_INDICATORS'
const UPDATE_EXTERNAL_INDICATORS = 'UPDATE_EXTERNAL_INDICATORS'
const UPDATE_MARKET = 'UPDATE_MARKET'
const UPDATE_MARKET_TYPE = 'UPDATE_MARKET_TYPE'
const RESET_INDICATORS = 'RESET_INDICATORS'
const SET_STOCK_LOADING = 'SET_STOCK_LOADING'
export const INITIALIZE_DATA_REQUEST = 'INITIALIZE_DATA_REQUEST'
const INITIALIZE_DATA_SUCCESS = 'INITIALIZE_DATA_SUCCESS'
const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA'
const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP'

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
export const initializeDataRequest = () => ({
  type: INITIALIZE_DATA_REQUEST
})

export const initializeDataSuccess = payload => ({
  type: INITIALIZE_DATA_SUCCESS,
  payload
})

export const updateChartData = payload => ({
  type: UPDATE_CHART_DATA,
  payload
})

export const updateTimeStamp = payload => ({
  type: UPDATE_TIME_STAMP,
  payload
})

const initialState = {
  cryptoList: [],
  stockList: [],
  timeInterval: '',
  stockLoading: true,
  internalIndicators: {},
  externalIndicators: {},
  marketType: '',
  market: '',
  isLoading: false,
  chartData: [],
  timeLine: [],
  timeStamp: 0
}

export const chartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_DATA_REQUEST:
      return { ...state, isLoading: true }
    case INITIALIZE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cryptoList: payload.cryptoList,
        stockList: payload.stockList
      }
    case UPDATE_TIME_INTERVAL:
      return {
        ...state,
        timeInterval: payload,
        stockLoading: true,
        chartData: [],
        timeLine: [],
        timeStamp: 0
      }
    case UPDATE_MARKET:
      return {
        ...state,
        market: payload,
        stockLoading: true,
        chartData: [],
        timeLine: [],
        timeStamp: 0
      }
    case UPDATE_MARKET_TYPE:
      return { ...state, marketType: payload }
    case UPDATE_INTERNAL_INDICATORS:
      return { ...state, internalIndicators: payload, stockLoading: true }
    case UPDATE_EXTERNAL_INDICATORS:
      return { ...state, externalIndicators: payload }
    case UPDATE_CHART_DATA:
      // const data = [...new Set(payload.chartData)]
      // const time = [...new Set(payload.timeLine)]
      const removeDuplicates = arr => {
        const seen = new Set()
        const filteredArr = arr.filter(el => {
          const duplicate = seen.has(el.time)
          seen.add(el.time)
          return !duplicate
        })
        return filteredArr
      }

      const filteredChartData = removeDuplicates(payload.chartData)
      const filteredTimeLine = removeDuplicates(payload.timeLine)

      return {
        ...state,
        chartData: filteredChartData,
        timeLine: filteredTimeLine
      }
    case UPDATE_TIME_STAMP:
      return { ...state, timeStamp: payload }
    case SET_STOCK_LOADING:
      return { ...state, stockLoading: false }
    case RESET_INDICATORS:
      return { ...state, internalIndicators: {}, externalIndicators: {} }
    default:
      return state
  }
}
