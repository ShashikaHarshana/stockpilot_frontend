import React, { useEffect, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import { TA_BASE_URL } from '../../utils/CONSTANTS'
import { useDispatch } from 'react-redux'
import {
  updateExternalIndicatorData,
  updateLineTime,
  updateTimeStampLine
} from '../../redux/ducks/chart'
import { removeDuplicates } from '../../utils/functions'

function LineChart ({ type, mobile }) {
  const ref = React.useRef()
  const dispatch = useDispatch()
  const [visibleRange, setVisibleRange] = useState({})
  // const mobile = true

  const {
    market,
    marketType,
    timeInterval,
    lineTimeStamp,
    lineTime,
    externalIndicatorData
  } = useSelector(state => state.chart)
  const [loading, setLoading] = useState(true)

  const url =
    TA_BASE_URL +
    type +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}/${lineTimeStamp[type]}000`

  useEffect(() => {
    setLoading(true)
    console.log(loading)
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

    const lineSeries = chart.addLineSeries({
      color: '#001341',
      lineWidth: 1.5

      // lineType: 1
    })

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
        let tempTimeLine = []

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let object = {
              time: key / 1000,
              value: data[key]
            }
            tempLines.push(object)
            tempTimeLine.push(object.time)
          }
        }
        let tempLineData = removeDuplicates([
          ...tempLines,
          ...externalIndicatorData[type]
        ])
        // lineSeries.setData(tempLines)
        lineSeries.setData(tempLineData)
        dispatch(
          updateExternalIndicatorData({
            type,
            data: tempLineData
          })
        )
        dispatch(updateLineTime({ type, data: tempTimeLine }))

        if (mobile) {
          chart.resize(325, 150)
        } else {
          chart.resize(1067, 200)
        }
        setLoading(false)
        function onVisibleTimeRangeChanged (newVisibleTimeRange) {
          setVisibleRange(newVisibleTimeRange)
        }

        chart
          .timeScale()
          .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)
      })
      .catch()

    return () => {
      chart.remove()
    }
  }, [market, marketType, timeInterval, mobile, lineTimeStamp[type]])

  const handleDrag = () => {
    if (lineTime[type][0] === visibleRange.from) {
      dispatch(updateTimeStampLine({ type, data: visibleRange.from }))
    }
  }

  return (
    <>
      <div>
        <Typography
          style={{
            margin: '0 auto',
            marginTop: '1rem',

            width: 'fit-content'
          }}
          variant='h6'
        >
          {type.toUpperCase()}
        </Typography>
      </div>

      {loading ? <ChartLoader /> : null}
      <div
        ref={ref}
        onMouseUpCapture={handleDrag}
        style={{ marginBottom: '1rem' }}
      />
    </>
  )
}

export default LineChart
