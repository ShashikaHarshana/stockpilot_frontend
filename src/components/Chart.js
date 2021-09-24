import React, {useEffect, useState} from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import getMAChart from "../../../stockpilot_frontend/src/components/technicalIndicators/maChartFunction";

function Chart () {
  const ref = React.useRef()
  const [ma, setMa] = useState(true);
  const [sma, setSma] = useState(true);
  const [ema, setEma] = useState(true);
  const [wma, setWma] = useState(true);

  // const [maSeries, setMaSeries] = useState(null);
  // const [smaSeries, setSmaSeries] = useState(null);
  // const [emaSeries, setEmaSeries] = useState(null);
  // const [wmaSeries, setWmaSeries] = useState(null);


  useEffect(() => {
    const chart = createChart(ref.current, {
      width: 600,
      height: 300,
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
    let candleSeries = chart.addCandlestickSeries()

    chart.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true
      }
    })

    fetch('http://127.0.0.1:5000/binance/api/historical/BNBUSDT')
        .then(res => res.json())
        .then(data => {
          let tempCandlesticks = []
          data.forEach(row => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4]
            }
            tempCandlesticks.push(object)
          })
          candleSeries.setData(tempCandlesticks)
        })
        .catch()


    let eventSource = new EventSource(
        'http://localhost:5000/binance/listen/BNBUSDT'
    )

    eventSource.addEventListener(
        'message',
        function (e) {
          let parsedData = JSON.parse(e.data)
          let object = {
            time: parsedData.k.t / 1000,
            open: parsedData.k.o,
            high: parsedData.k.h,
            low: parsedData.k.l,
            close: parsedData.k.c
          }
          candleSeries.update(object)
        },
        false
    )

    if (ma){
      const maSeries = chart.addLineSeries({lineWidth:1, title:'MA'});
      getMAChart('ma', maSeries)
    }
    if (ema){
      const emaSeries = chart.addLineSeries({lineWidth:1, title:'EMA'});
      getMAChart('ema', emaSeries)
    }
    if (sma){
      const smaSeries = chart.addLineSeries({lineWidth:1, title: 'SMA'});
      getMAChart('sma', smaSeries)
    }
    if (wma){
      const wmaSeries = chart.addLineSeries({lineWidth:1, title: 'WMA'});
      getMAChart('wma', wmaSeries)
    }


    return () => {
      chart.remove()
    }
  }, [])

  return (
      <>
        <div ref={ref} />
      </>
  )
}

export default Chart
