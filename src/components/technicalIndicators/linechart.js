import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

function LineChart ({ type }) {
  const ref = React.useRef()
  const { market, marketType,timeInterval } = useSelector(
    state => state.chart
  )

  const url =
    'http://127.0.0.1:5000/ta/' +
    type +
    `/${marketType}/${market}/${timeInterval}`
  console.log(url)

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 1067,
      height: 200,
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
      })
      .catch()

    return () => {
      chart.remove()
    }
  }, [market, marketType, timeInterval])

  return (
    <>
      <Typography variant='h6'>{type.toUpperCase()}</Typography>
      <div ref={ref} />
    </>
  )
}

export default LineChart
