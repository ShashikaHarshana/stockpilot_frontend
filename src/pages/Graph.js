import React from 'react'
import Chart from '../components/Chart'
import LineChart from "../components/technicalIndicators/linechart";

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
        </div>
    )
}

export default Graph
