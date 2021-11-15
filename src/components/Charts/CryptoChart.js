import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from '../technicalIndicators/maChartFunction'
import getBBands from '../technicalIndicators/bbands'
import { useDispatch, useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import { HISTORICAL_URL, LISTEN_URL } from '../../utils/CONSTANTS'
import {updateChartData, updateInternalIndicatorData, updateTimeStamp} from '../../redux/ducks/chart'
import { removeDuplicates } from '../../utils/functions'
import { compare } from '../../utils/functions'

function CryptoChart ({ mobile }) {
  const ref = React.useRef()
  const {
    market,
    marketType,
    internalIndicators,
    timeInterval,
    cryptoList,
    timeStamp,
    chartData,
    timeLine,
    internalIndicatorData
  } = useSelector(state => state.chart)

  const { ma, sma, ema, wma, bbands } = internalIndicators
  const [loading, setLoading] = useState(true)
  // const [timeStamp, setTimeStamp] = useState(0)
  // const [currentInterval, setCurrentInterval] = useState(timeInterval)
  // const [chartData, setChartData] = useState([])
  const [visibleRange, setVisibleRange] = useState({})

  // const [timeLine, setTimeLine] = useState([])
  const dispatch = useDispatch()
  const chart = useRef()
  const candleSeries = useRef()

  useEffect(() => {
    if (cryptoList.includes(market.toUpperCase())) {
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
        upColor: '#00733E',
        downColor: '#BB2E2D'
      })

      chart.current.applyOptions({
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true,
          autoScale: false,
          shiftVisibleRangeOnNewBar: false
        },
        priceScale: {
          autoScale: true
        }
      })

      let newCrypto =
        HISTORICAL_URL + `${market.toUpperCase()}/${timeInterval}/0000`

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
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...chartData
          ]).sort(compare)
          // let tempTimeLineData = removeDuplicates([
          //   ...tempTimeLine,
          //   ...timeLine
          // ]).sort(compare)
          let chars = [...tempTimeLine, ...timeLine]
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })

          // console.log(tempTimeLineData)

          // candleSeries.current.setData(tempCandlesticks)
          console.log('temp', tempCandlesticks)
          candleSeries.current.setData(tempChartData)

          dispatch(
            updateChartData({
              chartData: tempChartData,
              timeLine: tempTimeLineData
            })
          )
          // setChartData([...tempCandlesticks, ...chartData])
          // setTimeLine([...tempTimeLine, ...timeLine])

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
          candleSeries.current.update(object)
          // console.log(object.time)
        },
        false
      )

      if (ma) {
        const maSeries = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'MA'
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
          title: 'EMA'
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
          title: 'SMA'
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
          title: 'WMA'
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
          color: '#0069CD'
        })
        const bbandMiddle = chart.current.addLineSeries({
          lineWidth: 1,
          title: 'BBAND Middle',
          color: 'orange'
        })
        const bbandLower = chart.current.addLineSeries({
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
          timeInterval,
          timeStamp,
          dispatch,
          internalIndicatorData.bbands
        )
      }
      console.log('Opened Stream ' + market.toUpperCase())
      return () => {
        chart.current.remove()
        console.log('Closed Stream.')
        eventSource.close()
        dispatch(updateInternalIndicatorData({ type: 'ma', data: [] }))
        dispatch(updateInternalIndicatorData({ type: 'sma', data: [] }))
        dispatch(updateInternalIndicatorData({ type: 'wma', data: [] }))
        dispatch(updateInternalIndicatorData({ type: 'ema', data: [] }))
        dispatch(updateInternalIndicatorData({ type: 'bbands', data: {upper: [], middle: [], lower: [] }}))
        dispatch(
            updateChartData({
              chartData: [],
              timeLine: []
            })
        )
      }
    }
  }, [market, timeInterval, internalIndicators, mobile])

  useEffect(() => {
    let newCrypto =
      HISTORICAL_URL + `${market.toUpperCase()}/${timeInterval}/${timeStamp}000`
    console.log('timestamp', timeStamp)
    timeStamp !== 0 &&
      fetch(newCrypto)
        .then(res => res.json())
        .then(data => {
          let newData = []
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
            newData.push(object)
            // console.log(object)
          })
          let chars = [...tempTimeLine, ...timeLine]
          // console.log('timeLine', timeLine)
          // console.log('timeStamp', timeStamp)
          let tempTimeLineData = chars.filter((c, index) => {
            return chars.indexOf(c) === index
          })
          let tempChartData = removeDuplicates([...newData, ...chartData]).sort(
            compare
          )
          console.log('newData', newData)
          console.log('chartData', tempChartData)
          candleSeries.current.setData(tempChartData)

          // chart.current.timeScale().setVisibleRange({
          //   from: tempTimeLine[0],
          //   to: tempTimeLine[tempTimeLine.length - 1]
          // })
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
                title: 'MA'
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
                title: 'EMA'
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
                title: 'SMA'
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
                title: 'WMA'
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
                color: '#0069CD'
              })
              const bbandMiddle = chart.current.addLineSeries({
                lineWidth: 1,
                title: 'BBAND Middle',
                color: 'orange'
              })
              const bbandLower = chart.current.addLineSeries({
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
                timeInterval,
                timeStamp,
                dispatch,
                internalIndicatorData.bbands
              )
            }
          }

          // console.log(object)
        })
        .catch()
  }, [timeStamp])

  const handleDrag = () => {
    // console.log('api call to load data')
    // console.log(visibleRange.from)
    // console.log('state', timeLine)
    // console.log('state', chartData)
    console.log(timeStamp)
    // console.log(timeLine[0])
    // if (visibleRange.from !== null) {
    //   setTimeStamp(visibleRange.from)
    // }
    // console.log(timeLine[0])
    if (timeLine[0] === visibleRange.from) {
      // setTimeStamp(visibleRange.from)
      dispatch(updateTimeStamp(visibleRange.from))
    }
  }

  return (
    <>
      {loading ? <ChartLoader /> : null}
      <div
        ref={ref}
        onMouseUpCapture={handleDrag}
        onTouchEnd={handleDrag}
        data-testid='cryptoChart'
      />
    </>
  )
}

export default CryptoChart
