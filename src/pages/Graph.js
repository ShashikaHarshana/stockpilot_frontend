import React from 'react'
import Chart from '../components/Chart'
import LineChart from "../../../stockpilot_frontend/src/components/technicalIndicators/linechart";
import StochChart from "../components/technicalIndicators/stochChart";
import MACDChart from "../components/technicalIndicators/macd";

const Graph = () => {
    return (
        <div className="App" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Chart/>
            {/*<LineChart type={'rsi'}/>*/}
            {/*<LineChart type={'obv'}/>*/}
            {/*<LineChart type={'roc'}/>*/}
            {/*<StochChart/>*/}
            {/*<MACDChart />*/}
        </div>
    )
}

export default Graph
