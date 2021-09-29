import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

function StochChart ({ type, mobile }) {
  const ref = React.useRef()
  const { market, marketType, timeInterval } = useSelector(state => state.chart)

  const url =
    'http://127.0.0.1:5000/ta/stoch' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  console.log(market, marketType, timeInterval)

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 1067,
      height: 250,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    })
    if (mobile) {
      chart.resize(325, 150)
    }

    chart.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      }
    })
    const slowkSeries = chart.addLineSeries({
      lineWidth: 1.5,
      color: '#8E0072'
    })
    const slowdSeries = chart.addLineSeries({
      lineWidth: 1.5,
      color: '#00733E'
    })

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let tempSlowk = []
        let tempSlowd = []

        let dataSlowk = data['slowk']
        let dataSlowd = data['slowd']
        for (let key in dataSlowk) {
          if (dataSlowk.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: dataSlowk[key]
            }
            tempSlowk.push(object)
          }
          if (dataSlowd.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: dataSlowd[key]
            }
            tempSlowd.push(object)
          }
        }
        slowkSeries.setData(tempSlowk)
        slowdSeries.setData(tempSlowd)
      })
      .catch()

    return () => {
      chart.remove()
    }
  }, [market, marketType, timeInterval, mobile])

  return (
    <>
      <Typography variant='h6'>STOCH</Typography>
      <div ref={ref} />
    </>
  )
}

export default StochChart
