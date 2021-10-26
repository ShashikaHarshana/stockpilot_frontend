// noinspection DuplicatedCode

import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../technicalIndicators/maChartFunction'
import getBBands from '../technicalIndicators/bbands'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import { BASE_URL } from '../../utils/CONSTANTS'

function StockChart ({ mobile }) {
  const ref = React.useRef()
  const [loading, setLoading] = useState(true)
  const [visibleRange, setVisibleRange] = useState({})
  const {
    market,
    marketType,
    internalIndicators,
    timeInterval,
    stockList
  } = useSelector(state => state.chart)
  const { ma, sma, ema, wma, bbands } = internalIndicators

  const [chartData, setChartData] = useState([])

  // useEffect(() => {
  //   const { ma, sma, ema, wma, bbands } = internalIndicators
  // }, [internalIndicators])
  // const { ma, sma, ema, wma, bbands } = internalIndicators

  useEffect(() => {
    if (stockList.includes(market)) {
      setLoading(true)
      const chart = createChart(ref.current, {
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
      let candleSeries = chart.addCandlestickSeries({
        upColor: '#00733E',
        downColor: '#BB2E2D'
      })

      chart.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        }
      })

      fetch(BASE_URL + `${marketType}/historical/${market}/${timeInterval}`)
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
          })

          candleSeries.setData(tempCandlesticks)
          // setChartData([...chartData, ...tempCandlesticks])

          if (mobile) {
            chart.resize(325, 150)
          } else {
            chart.resize(1067, 450)
          }
          setLoading(false)
          // const barsInfo = candleSeries.barsInLogicalRange(
          //   chart.timeScale().getVisibleLogicalRange()
          // )
          // console.log(barsInfo)
          // function onVisibleTimeRangeChanged (newVisibleTimeRange) {
          //   setVisibleRange(newVisibleTimeRange)
          // }

          // chart
          //   .timeScale()
          //   .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)
        })
        .catch()

      if (ma) {
        const maSeries = chart.addLineSeries({ lineWidth: 1, title: 'MA' })
        getMAChart('ma', maSeries, market, marketType, timeInterval)
      }
      if (ema) {
        const emaSeries = chart.addLineSeries({ lineWidth: 1, title: 'EMA' })
        getMAChart('ema', emaSeries, market, marketType, timeInterval)
      }
      if (sma) {
        const smaSeries = chart.addLineSeries({ lineWidth: 1, title: 'SMA' })
        getMAChart('sma', smaSeries, market, marketType, timeInterval)
      }
      if (wma) {
        const wmaSeries = chart.addLineSeries({ lineWidth: 1, title: 'WMA' })
        getMAChart('wma', wmaSeries, market, marketType, timeInterval)
      }
      if (bbands) {
        const bbandUpper = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Upper',
          color: '#0069CD'
        })
        const bbandMiddle = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Middle',
          color: 'orange'
        })
        const bbandLower = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Lower',
          color: '#0069CD'
        })
        getBBands(
          bbandUpper,
          bbandMiddle,
          bbandLower,
          market,
          marketType,
          timeInterval
        )
      }

      return () => {
        chart.remove()
      }
    }
  }, [market, marketType, internalIndicators, timeInterval, mobile])

  const handleDrag = () => {
    console.log('api call to load data')
    console.log(visibleRange.from)
  }

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div
        ref={ref}
        onMouseUpCapture={handleDrag}
        onTouchEnd={() => console.log('hello')}
      />
    </>
  )
}

export default StockChart
