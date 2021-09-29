import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

function MACDChart ({ type, mobile }) {
  const ref = React.useRef()

  const { market, marketType, timeInterval } = useSelector(state => state.chart)

  const url =
    'http://127.0.0.1:5000/ta/macd' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 1067,
      height: 300,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    })

    chart.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      }
    })
    const macdSeries = chart.addLineSeries({ lineWidth: 1.5, color: '#22568E' })
    const macdSignalSeries = chart.addLineSeries({
      lineWidth: 1.5,
      color: '#973A80'
    })
    const macdHistSeries = chart.addHistogramSeries({
      base: 0
    })
    if (mobile) {
      chart.resize(325, 150)
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let tempMacd = []
        let tempMacdSignal = []
        let tempMacdHist = []

        let dataMacd = data['macd']
        let dataMacdSignal = data['macdsignal']
        let dataMacdHist = data['macdhist']

        for (let key in dataMacd) {
          if (dataMacd.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: dataMacd[key]
            }
            tempMacd.push(object)
          }
          if (dataMacdSignal.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: dataMacdSignal[key]
            }
            tempMacdSignal.push(object)
          }
          if (dataMacdHist.hasOwnProperty(key)) {
            let color
            if (dataMacdHist[key] > 0) {
              color = '#00733E'
            } else {
              color = '#BB2E2D'
            }

            let object = {
              time: key / 1000,
              value: dataMacdHist[key],
              color
            }
            tempMacdHist.push(object)
          }
        }
        macdSeries.setData(tempMacd)
        macdSignalSeries.setData(tempMacdSignal)
        macdHistSeries.setData(tempMacdHist)
      })
      .catch()

    return () => {
      chart.remove()
    }
  }, [market, marketType, timeInterval, mobile])

  return (
    <>
      <Typography variant='h6'>MACD</Typography>
      <div ref={ref} />
    </>
  )
}

export default MACDChart
