// noinspection DuplicatedCode

import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../technicalIndicators/maChartFunction'
import getBBands from '../technicalIndicators/bbands'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import { HISTORICAL_URL, LISTEN_URL } from '../../utils/CONSTANTS'

function CryptoChart ({ mobile }) {
  const ref = React.useRef()
  const {
    market,
    marketType,
    internalIndicators,
    timeInterval,
    cryptoList
  } = useSelector(state => state.chart)
  const { ma, sma, ema, wma, bbands } = internalIndicators
  const [loading, setLoading] = useState(true)
  const [timeStamp, setTimeStamp] = useState(0)
  const [chartData, setChartData] = useState([])
  const [visibleRange, setVisibleRange] = useState({})
  const [temp, setTemp] = useState([])
  const [timeLine, setTimeLine] = useState([])

  useEffect(() => {
    setTimeStamp(0)
    setChartData([])
    setTimeLine([])
    console.log('hello')
  }, [market, timeInterval])

  useEffect(() => {
    if (cryptoList.includes(market.toUpperCase())) {
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

      let newCrypto =
        HISTORICAL_URL +
        `${market.toUpperCase()}/${timeInterval}/${timeStamp}000`

      fetch(newCrypto)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
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
            tempTimeLine.push(object.time)
            tempCandlesticks.push(object)
            // console.log(object)
          })
          // chartData !== null
          // ? candleSeries.setData(chartData)

          // chartData !== null &&
          console.log('initial chart data', chartData)
          candleSeries.setData([...tempCandlesticks, ...chartData])
          candleSeries.setData(tempCandlesticks)
          console.log('candles', tempCandlesticks)
          console.log('timeLine', tempTimeLine)
          setChartData([...tempCandlesticks, ...chartData])
          setTimeLine([...tempTimeLine, ...timeLine])

          if (mobile) {
            chart.resize(325, 150)
          } else {
            chart.resize(1067, 450)
          }
          setLoading(false)

          function onVisibleTimeRangeChanged (newVisibleTimeRange) {
            setVisibleRange(newVisibleTimeRange)
          }

          chart
            .timeScale()
            .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)
        })
        .catch()

      let eventSource = new EventSource(
        LISTEN_URL + `${market.toUpperCase()}/${timeInterval}`
      )
      eventSource.addEventListener(
        'message',
        function (e) {
          let parsedData = JSON.parse(e.data)
          let object = {
            time: parsedData.k.t / 1000,
            open: parsedData.k.o,
            high: parsedData.k.h,
            low: parsedData.k.l,
            close: parsedData.k.c
          }
          candleSeries.update(object)
        },
        false
      )

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
      console.log('Opened Stream ' + market.toUpperCase())
      return () => {
        chart.remove()
        console.log('Closed Stream.')
        eventSource.close()
      }
    }
  }, [market, timeInterval, internalIndicators, mobile, timeStamp])

  const handleDrag = () => {
    console.log('api call to load data')
    console.log(visibleRange.from)
    console.log('state', timeLine)
    console.log('state', chartData)
    console.log(timeLine[0])
    // if (visibleRange.from !== null) {
    //   setTimeStamp(visibleRange.from)
    // }
    // console.log(timeLine[0])
    if (timeLine[0] === visibleRange.from) {
      setTimeStamp(visibleRange.from)
    }
  }

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div ref={ref} onMouseUpCapture={handleDrag} />
    </>
  )
}

export default CryptoChart
