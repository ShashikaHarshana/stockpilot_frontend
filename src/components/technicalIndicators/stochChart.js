import React, {useEffect, useState} from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ChartLoader from "../Loading/ChartLoader";

function StochChart ({ type }) {
  const ref = React.useRef()
  const { market, marketType, timeInterval } = useSelector(state => state.chart)
  const [loading, setLoading] = useState(true)


  const url =
    'http://127.0.0.1:5000/ta/stoch' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  console.log(market, marketType, timeInterval)

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 0,
      height: 0,
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
    const slowkSeries = chart.addLineSeries({ lineWidth: 1 })
    const slowdSeries = chart.addLineSeries({ lineWidth: 1, color: 'orange' })

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
        chart.resize(1067,200)
        setLoading(false)
      })
      .catch()

    return () => {
      chart.remove()
    }
  }, [market, marketType, timeInterval])

  return (
    <>
      <Typography variant='h6'>STOCH</Typography>
      {loading ?  <ChartLoader /> : null}
      <div ref={ref} />
    </>
  )
}

export default StochChart
