import React, { useEffect, useRef, useState } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ChartLoader from '../Loading/ChartLoader'
import { TA_BASE_URL } from '../../utils/CONSTANTS'
import { useDispatch } from 'react-redux'
import {
  updateExternalIndicatorData,
  updateMacdTime,
  updateTimeStampMacd
} from '../../redux/ducks/chart'

import { removeDuplicates } from '../../utils/functions'

function MACDChart ({ mobile }) {
  const ref = React.useRef()
  const chart = useRef()
  const macdSeries = useRef()
  const macdSignalSeries = useRef()
  const macdHistSeries = useRef()

  const dispatch = useDispatch()
  const [visibleRange, setVisibleRange] = useState({})

  const {
    market,
    marketType,
    timeInterval,
    macdTimeStamp,
    macdTime,
    externalIndicatorData
  } = useSelector(state => state.chart)
  const [loading, setLoading] = useState(true)

    let timestamp = macdTimeStamp * 1000;
    if (timestamp === 0){
        timestamp = '0000'
    }

  const url =
    TA_BASE_URL +
    'macd' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}/${timestamp}`

  useEffect(() => {
    setLoading(true)
    chart.current = createChart(ref.current, {
      width: 0,
      height: 0,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    })

    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      }
    })
    macdSeries.current = chart.current.addLineSeries({
      lineWidth: 1.5,
      color: '#22568E'
    })
    macdSignalSeries.current = chart.current.addLineSeries({
      lineWidth: 1.5,
      color: '#973A80'
    })
    macdHistSeries.current = chart.current.addHistogramSeries({
      base: 0
    })

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let tempMacd = []
        let tempMacdSignal = []
        let tempMacdHist = []
        let tempTimeLine = []

        let dataMacd = data['macd']
        let dataMacdSignal = data['macdsignal']
        let dataMacdHist = data['macdhist']

        for (let key in dataMacd) {
          if (dataMacd.hasOwnProperty(key)) {
            if (dataMacd.hasOwnProperty(key)) {
              let object = {
                time: key / 1000,
                value: dataMacd[key]
              }
              tempMacd.push(object)
              tempTimeLine.push(object.time)
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
        }
        let tempMacdData = removeDuplicates([
          ...tempMacd,
          ...externalIndicatorData.macd.series
        ])
        let tempMacdSignalData = removeDuplicates([
          ...tempMacdSignal,
          ...externalIndicatorData.macd.signalSeries
        ])
        let tempMacdHistData = removeDuplicates([
          ...tempMacdHist,
          ...externalIndicatorData.macd.histSeries
        ])

        macdSeries.current.setData(tempMacdData)
        macdSignalSeries.current.setData(tempMacdSignalData)
        macdHistSeries.current.setData(tempMacdHistData)
        dispatch(
          updateExternalIndicatorData({
            type: 'macd',
            data: {
              series: tempMacdData,
              signalSeries: tempMacdSignalData,
              histSeries: tempMacdHistData
            }
          })
        )
        dispatch(updateMacdTime(tempTimeLine))
        if (mobile) {
          chart.current.resize(325, 150)
        } else {
          chart.current.resize(1067, 200)
        }
        function onVisibleTimeRangeChanged (newVisibleTimeRange) {
          setVisibleRange(newVisibleTimeRange)
        }

        chart.current
          .timeScale()
          .subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged)

        setLoading(false)
      })
      .catch()

    return () => {
      chart.current.remove()
    }
  }, [market, marketType, timeInterval, mobile])

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let tempMacd = []
        let tempMacdSignal = []
        let tempMacdHist = []
        let tempTimeLine = []

        let dataMacd = data['macd']
        let dataMacdSignal = data['macdsignal']
        let dataMacdHist = data['macdhist']

        for (let key in dataMacd) {
          if (dataMacd.hasOwnProperty(key)) {
            if (dataMacd.hasOwnProperty(key)) {
              let object = {
                time: key / 1000,
                value: dataMacd[key]
              }
              tempMacd.push(object)
              tempTimeLine.push(object.time)
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
        }
        let tempMacdData = removeDuplicates([
          ...tempMacd,
          ...externalIndicatorData.macd.series
        ])
        let tempMacdSignalData = removeDuplicates([
          ...tempMacdSignal,
          ...externalIndicatorData.macd.signalSeries
        ])
        let tempMacdHistData = removeDuplicates([
          ...tempMacdHist,
          ...externalIndicatorData.macd.histSeries
        ])

        macdSeries.current.setData(tempMacdData)
        macdSignalSeries.current.setData(tempMacdSignalData)
        macdHistSeries.current.setData(tempMacdHistData)
        dispatch(
          updateExternalIndicatorData({
            type: 'macd',
            data: {
              series: tempMacdData,
              signalSeries: tempMacdSignalData,
              histSeries: tempMacdHistData
            }
          })
        )
        dispatch(updateMacdTime(tempTimeLine))
      })
  }, [macdTimeStamp])

  const handleDrag = () => {
    if (macdTime[0] === visibleRange.from) {
      dispatch(updateTimeStampMacd(visibleRange.from))
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
          MACD
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

export default MACDChart
