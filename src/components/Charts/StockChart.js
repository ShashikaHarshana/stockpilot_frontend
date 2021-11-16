import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../technicalIndicators/maChartFunction'
import getBBands from '../technicalIndicators/bbands'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import {
  BASE_URL, BBANDS_COLOUR, BBANDS_MIDDLE_COLOUR,
  DOWN_CANDLESTICK_COLOUR,
  EMA_COLOUR,
  MA_COLOUR,
  SMA_COLOUR,
  UP_CANDLESTICK_COLOUR, WMA_COLOUR
} from '../../utils/CONSTANTS'
import { useDispatch } from 'react-redux'
import { updateChartData, updateTimeStamp } from '../../redux/ducks/chart'
import { compare } from '../../utils/functions'

function StockChart ({ mobile }) {
  const ref = React.useRef()
  const [loading, setLoading] = useState(true)
  const [visibleRange, setVisibleRange] = useState({})
  const {
    market,
    marketType,
    internalIndicators,
    timeInterval,
    stockList,
    timeStamp,
    chartData,
    timeLine,
    internalIndicatorData
  } = useSelector(state => state.chart)
  const { ma, sma, ema, wma, bbands } = internalIndicators

  // const [chartData, setChartData] = useState([])
  const dispatch = useDispatch()
  const chart = useRef()
  const candleSeries = useRef()

  const removeDuplicates = arr => {
    const seen = new Set()
    // noinspection UnnecessaryLocalVariableJS
    const filteredArr = arr.filter(el => {
      const duplicate = seen.has(el.time)
      seen.add(el.time)
      return !duplicate
    })
    return filteredArr
  }

  // useEffect(() => {
  //   const { ma, sma, ema, wma, bbands } = internalIndicators
  // }, [internalIndicators])
  // const { ma, sma, ema, wma, bbands } = internalIndicators

  useEffect(() => {
    if (stockList.includes(market)) {
      setLoading(true)
      chart.current = createChart(ref.current, {
        width: 0,
        height: 0,
        // layout: {
        //     backgroundColor: '#f2f2f2',
        //     textColor: 'rgba(255, 255, 255, 0.9)',
        // },
        // grid: {
        //     vertLines: {
        //         color: 'rgba(197, 203, 206, 0.5)',
        //     },
        //     horzLines: {
        //         color: 'rgba(197, 203, 206, 0.5)',
        //     },
        // },
        crosshair: {
          mode: CrosshairMode.Normal
        }
        // rightPriceScale: {
        //     borderColor: 'rgba(197, 203, 206, 0.8)',
        // },
        // timeScale: {
        //     borderColor: 'rgba(197, 203, 206, 0.8)',
        // },
      })
      candleSeries.current = chart.current.addCandlestickSeries({
        upColor: UP_CANDLESTICK_COLOUR,
        downColor: DOWN_CANDLESTICK_COLOUR
      })

      chart.current.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        }
      })

      fetch(
        BASE_URL +
          `${marketType}/historical/${market}/${timeInterval}/${timeStamp}000`
      )
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          let tempTimeLine = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
            tempTimeLine.push(object.time)
          })
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)

          let chars = [...tempTimeLine, ...timeLine]
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          candleSeries.current.setData(tempChartData)
          // setChartData([...chartData, ...tempCandlesticks])

          dispatch(
            updateChartData({
              chartData: tempChartData,
              timeLine: tempTimeLineData
            })
          )

          if (mobile) {
            chart.current.resize(325, 150)
          } else {
            chart.current.resize(1067, 450)
          }
          setLoading(false)
          function onVisibleTimeRangeChanged (newVisibleTimeRange) {
            setVisibleRange(newVisibleTimeRange)
          }

          chart.current
            .timeScale()
            .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)
          chart.current.timeScale().setVisibleLogicalRange({ from: 0, to: 150 })
          chart.current.timeScale().scrollToPosition(1)
        })
        // const barsInfo = candleSeries.barsInLogicalRange(
        //   chart.current.timeScale().getVisibleLogicalRange()
        // )
        // console.log(barsInfo)
        // function onVisibleTimeRangeChanged (newVisibleTimeRange) {
        //   setVisibleRange(newVisibleTimeRange)
        // }

        // chart.current
        //   .timeScale()
        //   .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)

        .catch()

      if (ma) {
        const maSeries = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'MA',
          color:MA_COLOUR
        })
        getMAChart(
          'ma',
          maSeries,
          market,
          marketType,
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.ma
        )
      }
      if (ema) {
        const emaSeries = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'EMA',
          color: EMA_COLOUR
        })
        getMAChart(
          'ema',
          emaSeries,
          market,
          marketType,
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.sma
        )
      }
      if (sma) {
        const smaSeries = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'SMA',
          color: SMA_COLOUR
        })
        getMAChart(
          'sma',
          smaSeries,
          market,
          marketType,
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.ema
        )
      }
      if (wma) {
        const wmaSeries = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'WMA',
          color: WMA_COLOUR
        })
        getMAChart(
          'wma',
          wmaSeries,
          market,
          marketType,
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.wma
        )
      }
      if (bbands) {
        const bbandUpper = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Upper',
          color: BBANDS_COLOUR
        })
        const bbandMiddle = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Middle',
          color: BBANDS_MIDDLE_COLOUR
        })
        const bbandLower = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Lower',
          color: BBANDS_COLOUR
        })
        getBBands(
          bbandUpper,
          bbandMiddle,
          bbandLower,
          market,
          marketType,
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.bbands
        )
      }

      return () => {
        chart.current.remove()
      }
    }
  }, [market, marketType, internalIndicators, timeInterval, mobile])

  useEffect(() => {
    timeStamp !== 0 &&
      fetch(
        BASE_URL +
          `${marketType}/historical/${market}/${timeInterval}/${timeStamp}000`
      )
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          let tempTimeLine = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
            tempTimeLine.push(object.time)
          })
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)

          let chars = [...tempTimeLine, ...timeLine]
          // console.log('timeLine', timeLine)
          // console.log('timeStamp', timeStamp)
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          candleSeries.current.setData(tempChartData)
          // setChartData([...chartData, ...tempCandlesticks])

          dispatch(
            updateChartData({
              chartData: tempChartData,
              timeLine: tempTimeLineData
            })
          )
          if (timeStamp !== 0) {
            if (ma) {
              const maSeries = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'MA',
                color: MA_COLOUR
              })
              getMAChart(
                'ma',
                maSeries,
                market,
                marketType,
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.ma
              )
            }
            if (ema) {
              const emaSeries = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'EMA',
                color: EMA_COLOUR
              })
              getMAChart(
                'ema',
                emaSeries,
                market,
                marketType,
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.ema
              )
            }
            if (sma) {
              const smaSeries = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'SMA',
                color: SMA_COLOUR
              })
              getMAChart(
                'sma',
                smaSeries,
                market,
                marketType,
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.sma
              )
            }
            if (wma) {
              const wmaSeries = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'WMA',
                color: WMA_COLOUR
              })
              getMAChart(
                'wma',
                wmaSeries,
                market,
                marketType,
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.wma
              )
            }
            if (bbands) {
              const bbandUpper = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'BBAND Upper',
                color: BBANDS_COLOUR
              })
              const bbandMiddle = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'BBAND Middle',
                color: BBANDS_MIDDLE_COLOUR
              })
              const bbandLower = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'BBAND Lower',
                color: BBANDS_COLOUR
              })
              getBBands(
                bbandUpper,
                bbandMiddle,
                bbandLower,
                market,
                marketType,
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.bbands
              )
            }
          }
        })
        .catch()
  }, [timeStamp])

  const handleDrag = () => {
    console.log('api call to load data')
    console.log(visibleRange.from)
    if (timeLine[0] === visibleRange.from) {
      // setTimeStamp(visibleRange.from)
      dispatch(updateTimeStamp(visibleRange.from))
    }
  }

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div ref={ref} onMouseUpCapture={handleDrag} />
    </>
  )
}

export default StockChart
