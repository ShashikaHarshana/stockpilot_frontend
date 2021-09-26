import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from './technicalIndicators/maChartFunction'
import getBBands from './technicalIndicators/bbands'

function StockChart () {
  const ref = React.useRef()
  const [ma, setMa] = useState(true)
  const [sma, setSma] = useState(true)
  const [ema, setEma] = useState(true)
  const [wma, setWma] = useState(false)
  const [bbands, setBbands] = useState(false)

  // const [maSeries, setMaSeries] = useState(null);
  // const [smaSeries, setSmaSeries] = useState(null);
  // const [emaSeries, setEmaSeries] = useState(null);
  // const [wmaSeries, setWmaSeries] = useState(null);

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 600,
      height: 300,
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

    fetch('http://127.0.0.1:5000/stock/historical/aapl/5m')
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
      })
      .catch()

    if (ma) {
      const maSeries = chart.addLineSeries({ lineWidth: 1, title: 'MA' })
      getMAChart('ma', maSeries)
    }
    if (ema) {
      const emaSeries = chart.addLineSeries({ lineWidth: 1, title: 'EMA' })
      getMAChart('ema', emaSeries)
    }
    if (sma) {
      const smaSeries = chart.addLineSeries({ lineWidth: 1, title: 'SMA' })
      getMAChart('sma', smaSeries)
    }
    if (wma) {
      const wmaSeries = chart.addLineSeries({ lineWidth: 1, title: 'WMA' })
      getMAChart('wma', wmaSeries)
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
      getBBands(bbandUpper, bbandMiddle, bbandLower)
    }

    return () => {
      chart.remove()
    }
  }, [])

  return (
    <>
      <div ref={ref} />
    </>
  )
}

export default StockChart
