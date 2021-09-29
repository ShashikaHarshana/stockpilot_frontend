import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

function LineChart ({ type, mobile }) {
  const ref = React.useRef()
  const dispatch = useDispatch()

  // const mobile = true
  console.log(mobile)

  const { market, marketType, timeInterval } = useSelector(state => state.chart)

  const url =
    'http://127.0.0.1:5000/ta/' +
    type +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 1067,
      height: 200,

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

    const lineSeries = chart.addLineSeries({
      color: '#001341',
      lineWidth: 1.5

      // lineType: 1
    })
    if (mobile) {
      chart.resize(325, 150)
    } else {
      chart.resize(1067, 200)
    }

    chart.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      },
      layout: {}
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
