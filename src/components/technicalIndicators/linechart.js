import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import {LINE_SERIES_COLOUR, TA_BASE_URL} from '../../utils/CONSTANTS'
import { useDispatch } from 'react-redux'
import {
  updateExternalIndicatorData,
  updateLineTime,
  updateTimeStampLine
} from '../../redux/ducks/chart'
import { removeDuplicates } from '../../utils/functions'

function LineChart ({ type, mobile }) {
  const ref = React.useRef()
  const chart = useRef()
  const lineSeries = useRef()

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
  const [loading, setLoading] = useState(true);


  let timestamp = lineTimeStamp[type] * 1000;
  if (timestamp === 0){
      timestamp = '0000'
  }


  const url =
    TA_BASE_URL +
    type +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}/${timestamp}`

  useEffect(() => {
    setLoading(true)
    console.log(loading)
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

    lineSeries.current = chart.current.addLineSeries({
      color: LINE_SERIES_COLOUR,
      lineWidth: 1.5

      // lineType: 1
    })

    chart.current.applyOptions({
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
        // lineSeries.current.setData(tempLines)
        lineSeries.current.setData(tempLineData)
        dispatch(
          updateExternalIndicatorData({
            type,
            data: tempLineData
          })
        )
        dispatch(updateLineTime({ type, data: tempTimeLine }))

        if (mobile) {
          chart.current.resize(325, 150)
        } else {
          chart.current.resize(1067, 200)
        }
        setLoading(false)
        function onVisibleTimeRangeChanged (newVisibleTimeRange) {
          setVisibleRange(newVisibleTimeRange)
        }

        chart.current
          .timeScale()
          .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)
      })
      .catch()

    return () => {
      chart.current.remove()
    }
  }, [market, marketType, timeInterval, mobile])

  useEffect(() => {
    lineTimeStamp[type] !== 0 &&
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
          // lineSeries.current.setData(tempLines)
          lineSeries.current.setData(tempLineData)
          dispatch(
            updateExternalIndicatorData({
              type,
              data: tempLineData
            })
          )
          dispatch(updateLineTime({ type, data: tempTimeLine }))
        })
  }, [lineTimeStamp[type]])

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
