import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../technicalIndicators/maChartFunction'
import getBBands from '../technicalIndicators/bbands'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'

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
  const [initiated, setInitiated] = useState(false)

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

      let newCrypto = `http://127.0.0.1:5000/binance/historical/${market.toUpperCase()}/${timeInterval}`

      fetch(newCrypto)
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
          if (mobile) {
            chart.resize(325, 150)
          } else {
            chart.resize(1067, 450)
            setLoading(false)
          }
        })
        .catch()

      let eventSource = new EventSource(
        `http://localhost:5000/binance/listen/${market.toUpperCase()}/${timeInterval}`
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
      // console.log('Opened Stream ' + market.toUpperCase())
      return () => {
        chart.remove()
        // console.log('Closed Stream.')
        eventSource.close()
      }
    }
  }, [market, timeInterval, internalIndicators, mobile])

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div ref={ref} />
    </>
  )
}

export default CryptoChart
