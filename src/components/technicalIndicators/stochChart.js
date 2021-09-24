import React, { useEffect } from 'react'
import { createChart, CrosshairMode } from 'lightweight-charts'
import {Typography} from "@material-ui/core";

function StochChart ({type}) {
    const ref = React.useRef()

    const url = 'http://127.0.0.1:5000/ta/stoch';

    useEffect(() => {
        const chart = createChart(ref.current, {
            width: 600,
            height: 100,
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
        const slowkSeries = chart.addLineSeries({lineWidth:1});
        const slowdSeries = chart.addLineSeries({lineWidth:1, color:'orange'});


        fetch(url)
            .then(res => res.json())
            .then(data => {
                let tempSlowk = []
                let tempSlowd = []

                let dataSlowk = data['slowk']
                let dataSlowd = data['slowd']
                console.log(dataSlowd)
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
    }, [])

    return (
        <>
            <Typography
                variant='h6'
            >
                STOCH
            </Typography>
            <div ref={ref} />
        </>
    )
}

export default StochChart
