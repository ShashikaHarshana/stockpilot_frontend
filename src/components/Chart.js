import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'

function Chart () {
  const ref = React.useRef()

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

    // fetch('https://api.binance.com/api/v3/klines?symbol=BNBUSDT&interval=1m')
    //     .then(res => res.json())
    //     .then((data) => {
    //         let tempCandlesticks = []
    //         data.forEach(row => {
    //             let object = {
    //                 time: row[0] /1000,
    //                 open: row[1],
    //                 high: row[2],
    //                 low: row[3],
    //                 close: row[4]
    //             }
    //             tempCandlesticks.push(object);
    //         })
    //         candleSeries.setData(tempCandlesticks);
    //     })
    //     .catch()

    fetch('http://127.0.0.1:5000/binance/api/historical/BNBUSDT')
      .then(res => res.json())
      .then(data => {
        console.log(data)
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

    // let binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/bnbusdt@kline_15m");
    // binanceSocket.onmessage = (event) => {
    //     let parsedData = JSON.parse(event.data)
    //     let object = {
    //         time: parsedData.k.t /1000,
    //         open: parsedData.k.o,
    //         high: parsedData.k.h,
    //         low: parsedData.k.l,
    //         close: parsedData.k.c
    //     }
    //     candleSeries.update(object)
    // }

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
