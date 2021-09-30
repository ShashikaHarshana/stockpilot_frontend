import React, {useEffect, useState} from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ChartLoader from "../Loading/ChartLoader";

function LineChart ({ type }) {
  const ref = React.useRef()
  const { market, marketType, timeInterval } = useSelector(state => state.chart)
  const [loading, setLoading] = useState(true)

  const url =
    'http://127.0.0.1:5000/ta/' +
    type +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  useEffect(() => {
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
    const lineSeries = chart.addLineSeries()

    chart.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      }
    })

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let tempLines = []

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: data[key]
            }
            tempLines.push(object)
          }
        }
        lineSeries.setData(tempLines)
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
      <Typography variant='h6'>{type.toUpperCase()}</Typography>
      {loading ?  <ChartLoader /> : null}
      <div ref={ref} />
    </>
  )
}

export default LineChart
