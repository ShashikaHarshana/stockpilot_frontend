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
const SET_LOADING = 'SET_LOADING'
const UPDATE_BBANDS = 'UPDATE_BBANDS'
const UPDATE_STOCH_TIME = 'UPDATE_STOCH_TIME'
const UPDATE_TIME_STAMP_STOCH = 'UPDATE_TIME_STAMP_STOCH'
const UPDATE_MACD_TIME = 'UPDATE_MACD_TIME'
const UPDATE_TIME_STAMP_MACD = 'UPDATE_TIME_STAMP_MACD'
const UPDATE_LINE_TIME = 'UPDATE_LINE_TIME'
const UPDATE_TIME_STAMP_LINE = 'UPDATE_TIME_STAMP_LINE'
// const UPDATE_MA = 'UPDATE_MA'
// const UPDATE_SMA = 'UPDATE_SMA'
// const UPDATE_EMA = 'UPDATE_EMA'
// const UPDATE_WMA = 'UPDATE_WMA'
const UPDATE_INTERNAL_INDICATOR_DATA = 'UPDATE_INTERNAL_INDICATOR_DATA'
const UPDATE_EXTERNAL_INDICATOR_DATA = 'UPDATE_EXTERNAL_INDICATOR_DATA'

export const setLoading = payload => ({
  type: SET_LOADING,
  payload
})

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

export const updateBbands = payload => ({
  type: UPDATE_BBANDS,
  payload
})

export const updateInternalIndicatorData = payload => ({
  type: UPDATE_INTERNAL_INDICATOR_DATA,
  payload
})
export const updateExternalIndicatorData = payload => ({
  type: UPDATE_EXTERNAL_INDICATOR_DATA,
  payload
})
export const updateStochTime = payload => ({
  type: UPDATE_STOCH_TIME,
  payload
})

export const updateTimeStampStoch = payload => ({
  type: UPDATE_TIME_STAMP_STOCH,
  payload
})
export const updateMacdTime = payload => ({
  type: UPDATE_MACD_TIME,
  payload
})

export const updateTimeStampMacd = payload => ({
  type: UPDATE_TIME_STAMP_MACD,
  payload
})
export const updateLineTime = payload => ({
  type: UPDATE_LINE_TIME,
  payload
})

export const updateTimeStampLine = payload => ({
  type: UPDATE_TIME_STAMP_LINE,
  payload
})
// export const updateMa = payload => ({
//   type: UPDATE_MA,
//   payload
// })
// export const updateSma = payload => ({
//   type: UPDATE_SMA,
//   payload
// })
// export const updateEma = payload => ({
//   type: UPDATE_EMA,
//   payload
// })
// export const updateWma = payload => ({
//   type: UPDATE_WMA,
//   payload
// })

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
  timeStamp: 0,
  internalIndicatorData: {
    ma: [],
    sma: [],
    ema: [],
    wma: [],
    bbands: {
      upper: [],
      middle: [],
      lower: []
    }
  },
  externalIndicatorData: {
    rsi: [],
    obv: [],
    roc: [],
    macd: {
      series: [],
      signalSeries: [],
      histSeries: []
    },
    stoch: {
      slowk: [],
      slowd: []
    }
  },
  stochTime: [],
  stochTimeStamp: 0,
  macdTime: [],
  macdTimeStamp: 0,
  lineTime: { rsi: [], obv: [], roc: [] },
  lineTimeStamp: { rsi: 0, obv: 0, roc: 0 }
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
        timeStamp: 0,
        internalIndicatorData: {
          ma: [],
          sma: [],
          ema: [],
          wma: [],
          bbands: {
            upper: [],
            middle: [],
            lower: []
          }
        },
        externalIndicatorData: {
          rsi: [],
          obv: [],
          roc: [],
          macd: {
            series: [],
            signalSeries: [],
            histSeries: []
          },
          stoch: {
            slowk: [],
            slowd: []
          }
        },
        stochTime: [],
        stochTimeStamp: 0,
        macdTime: [],
        macdTimeStamp: 0,
        lineTime: { rsi: [], obv: [], roc: [] },
        lineTimeStamp: { rsi: 0, obv: 0, roc: 0 }
      }
    case UPDATE_MARKET:
      return {
        ...state,
        market: payload,
        stockLoading: true,
        chartData: [],
        timeLine: [],
        timeStamp: 0,
        internalIndicatorData: {
          ma: [],
          sma: [],
          ema: [],
          wma: [],
          bbands: {
            upper: [],
            middle: [],
            lower: []
          }
        },
        externalIndicatorData: {
          rsi: [],
          obv: [],
          roc: [],
          macd: {
            series: [],
            signalSeries: [],
            histSeries: []
          },
          stoch: {
            slowk: [],
            slowd: []
          }
        },
        stochTime: [],
        stochTimeStamp: 0,
        macdTime: [],
        macdTimeStamp: 0,
        lineTime: { rsi: [], obv: [], roc: [] },
        lineTimeStamp: { rsi: 0, obv: 0, roc: 0 }
      }
    case UPDATE_MARKET_TYPE:
      return {
        ...state,
        marketType: payload,
        chartData: [],
        timeLine: [],
        timeStamp: 0,
        internalIndicatorData: {
          ma: [],
          sma: [],
          ema: [],
          wma: [],
          bbands: {
            upper: [],
            middle: [],
            lower: []
          }
        },
        externalIndicatorData: {
          rsi: [],
          obv: [],
          roc: [],
          macd: {
            series: [],
            signalSeries: [],
            histSeries: []
          },
          stoch: {
            slowk: [],
            slowd: []
          }
        },
        stochTime: [],
        stochTimeStamp: 0,
        macdTime: [],
        macdTimeStamp: 0,
        lineTime: { rsi: [], obv: [], roc: [] },
        lineTimeStamp: { rsi: 0, obv: 0, roc: 0 }
      }
    case UPDATE_INTERNAL_INDICATORS:
      return {
        ...state,
        internalIndicators: payload,
        stockLoading: true,
        chartData: [],
        timeLine: [],
        timeStamp: 0,
        internalIndicatorData: {
          ma: [],
          sma: [],
          ema: [],
          wma: [],
          bbands: {
            upper: [],
            middle: [],
            lower: []
          }
        },
        externalIndicatorData: {
          rsi: [],
          obv: [],
          roc: [],
          macd: {
            series: [],
            signalSeries: [],
            histSeries: []
          },
          stoch: {
            slowk: [],
            slowd: []
          }
        },
        stochTime: [],
        stochTimeStamp: 0,
        macdTime: [],
        macdTimeStamp: 0,
        lineTime: { rsi: [], obv: [], roc: [] },
        lineTimeStamp: { rsi: 0, obv: 0, roc: 0 }
      }
    case UPDATE_EXTERNAL_INDICATORS:
      return { ...state, externalIndicators: payload }
    case UPDATE_CHART_DATA:
      const filteredChartData = payload.chartData
      const filteredTimeLine = payload.timeLine

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
      return {
        ...state,
        internalIndicators: {},
        externalIndicators: {},
        timeStamp: 0,
        chartData: [],
        timeLine: []
      }

    case UPDATE_INTERNAL_INDICATOR_DATA:
      return {
        ...state,
        internalIndicatorData: {
          ...state.internalIndicatorData,
          [payload.type]: payload.data
        }
      }
    case UPDATE_EXTERNAL_INDICATOR_DATA:
      return {
        ...state,
        externalIndicatorData: {
          ...state.externalIndicatorData,
          [payload.type]: payload.data
        }
      }
    case UPDATE_BBANDS:
      return {
        ...state,
        internalIndicatorData: {
          ...state.internalIndicatorData,
          bbands: payload
        }
      }
    case UPDATE_STOCH_TIME:
      return { ...state, stochTime: payload }

    case UPDATE_TIME_STAMP_STOCH:
      return {
        ...state,
        stochTimeStamp: payload
      }
    case UPDATE_MACD_TIME:
      return { ...state, macdTime: payload }

    case UPDATE_TIME_STAMP_MACD:
      return {
        ...state,
        macdTimeStamp: payload
      }
    case UPDATE_LINE_TIME:
      return {
        ...state,
        lineTime: { ...state.lineTime, [payload.type]: payload.data }
      }

    case UPDATE_TIME_STAMP_LINE:
      return {
        ...state,
        lineTimeStamp: { ...state.lineTimeStamp, [payload.type]: payload.data }
      }

    // case UPDATE_MA:
    //   return {
    //     ...state,
    //     internalIndicatorData: { ...internalIndicatorData, ma: payload }
    //   }
    // case UPDATE_SMA:
    //   return {
    //     ...state,
    //     internalIndicatorData: { ...internalIndicatorData, sma: payload }
    //   }
    // case UPDATE_EMA:
    //   return {
    //     ...state,
    //     internalIndicatorData: { ...internalIndicatorData, ema: payload }
    //   }
    // case UPDATE_WMA:
    //   return {
    //     ...state,
    //     internalIndicatorData: { ...internalIndicatorData, wma: payload }
    //   }

    default:
      return state
  }
}
