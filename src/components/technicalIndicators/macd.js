import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'

function MACDChart ({ type }) {
  const ref = React.useRef()

  const url = 'http://127.0.0.1:5000/ta/macd' + '/stock/aapl/5m'

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
    const macdSeries = chart.addLineSeries({ lineWidth: 1 })
    const macdSignalSeries = chart.addLineSeries({
      lineWidth: 1,
      color: 'purple'
    })
    const macdHistSeries = chart.addHistogramSeries({
      base: 0
    })

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
              color = '#26a69a'
            } else {
              color = '#ef5350'
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
  }, [])

  return (
    <>
      <Typography variant='h6'>MACD</Typography>
      <div ref={ref} />
    </>
  )
}

export default MACDChart
