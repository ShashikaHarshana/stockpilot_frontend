import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from './technicalIndicators/maChartFunction'
import getBBands from './technicalIndicators/bbands'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setStockLoading } from '../redux/ducks/chart'

function StockChart () {
  const ref = React.useRef()
  const dispatch = useDispatch()
  const { market, marketType, internalIndicators, timeInterval } = useSelector(
    state => state.chart
  )

  const { ma, sma, ema, wma, bbands } = internalIndicators

  useEffect(() => {
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

    // console.log(loading)

    fetch(
      `http://127.0.0.1:5000/${marketType}/historical/${market}/${timeInterval}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch(setStockLoading())

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
  }, [market, marketType, internalIndicators, timeInterval])

  return (
    <>
      <div ref={ref} />
    </>
  )
}

export default StockChart
