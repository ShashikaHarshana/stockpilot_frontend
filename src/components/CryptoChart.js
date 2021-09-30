import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../../../stockpilot_frontend/src/components/technicalIndicators/maChartFunction'
import getBBands from './technicalIndicators/bbands'
import { useSelector } from 'react-redux'

function CryptoChart () {
  const ref = React.useRef()
  const { market, marketType, internalIndicators, timeInterval, cryptoList } = useSelector(
    state => state.chart
  )
  const { ma, sma, ema, wma, bbands } = internalIndicators

  // console.log(market)

  // const [maSeries, setMaSeries] = useState(null);
  // const [smaSeries, setSmaSeries] = useState(null);
  // const [emaSeries, setEmaSeries] = useState(null);
  // const [wmaSeries, setWmaSeries] = useState(null);

  // const [ma, setMa] = useState(false)
  // const [sma, setSma] = useState(false)
  // const [ema, setEma] = useState(false)
  // const [wma, setWma] = useState(false)
  // const [bbands, setBbands] = useState(false)

  useEffect(() => {
    if (cryptoList.includes(market.toUpperCase())) {
      const chart = createChart(ref.current, {
        width: 1067,
        height: 450,
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
      let candleSeries = chart.addCandlestickSeries()

      chart.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        }
      })
      let tempStockUrl = 'http://127.0.0.1:5000/stock/historical/aapl/5m'
      let tempCryptoUrl = 'http://127.0.0.1:5000/binance/historical/BNBUSDT/1m'
      let newCrypto = `http://127.0.0.1:5000/binance/historical/${market.toUpperCase()}/${timeInterval}`

      let binanceURL =
          'https://api.binance.com/api/v3/klines?symbol=BNBUSDT&interval=1m'
      fetch(newCrypto)
          .then(res => res.json())
          .then(data => {
            // console.log(data)
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
            console.log(tempCandlesticks)
            candleSeries.setData(tempCandlesticks)
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
        const maSeries = chart.addLineSeries({lineWidth: 1, title: 'MA'})
        getMAChart('ma', maSeries, market, marketType, timeInterval)
      }
      if (ema) {
        const emaSeries = chart.addLineSeries({lineWidth: 1, title: 'EMA'})
        getMAChart('ema', emaSeries, market, marketType, timeInterval)
      }
      if (sma) {
        const smaSeries = chart.addLineSeries({lineWidth: 1, title: 'SMA'})
        getMAChart('sma', smaSeries, market, marketType, timeInterval)
      }
      if (wma) {
        const wmaSeries = chart.addLineSeries({lineWidth: 1, title: 'WMA'})
        getMAChart('wma', wmaSeries, market, marketType, timeInterval)
      }
      if (bbands) {
        const bbandUpper = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Upper',
          color: 'purple'
        })
        const bbandMiddle = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Middle',
          color: 'orange'
        })
        const bbandLower = chart.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Lower',
          color: 'purple'
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
      console.log("Opened Stream " + market.toUpperCase())
      return () => {
        chart.remove();
        console.log("Closed Stream.")
        eventSource.close();
      }
    }
  }, [market, timeInterval, internalIndicators])

  return (
    <>
      <div ref={ref} />
    </>
  )
}

export default CryptoChart
