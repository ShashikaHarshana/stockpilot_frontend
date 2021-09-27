import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { useParams } from 'react-router'
import DesBox from '../components/graph/DesBox'
import TimeIndicatorBox from '../components/graph/TimeIndicatorBox'
import NavBar from '../components/NavBar'
import StockChart from './StockChart'
import LineChart from './technicalIndicators/linechart'
import MACDChart from './technicalIndicators/macd'
import StochChart from './technicalIndicators/stochChart'

import { makeStyles } from '@material-ui/core'
import CryptoChart from './CryptoChart'
import { useSelector } from 'react-redux'
// import { Gif } from '@material-ui/icons'

const useStyles = makeStyles({
  mainChart: {
    marginTop: 30
  },
  lineChart: {
    marginTop: 20
  }
})

const SingleMarket = () => {
  const classes = useStyles()
  const { type } = useParams()
  const [test, setTest] = useState(false)
  const state = useSelector(state => state.chart)
  // console.log(state.timeInterval)

  return (
    <div>
      <NavBar />
      {/* <Button onClick={() => setTest(!test)}>test</Button> */}
      <DesBox title={type} />
      <TimeIndicatorBox />
      <Grid container>
        <Grid className={classes.mainChart}>
          <StockChart />
          <CryptoChart />
        </Grid>
        <Grid item className={classes.lineChart}>
          <LineChart type='obv' />
          <LineChart type='roc' />
          <LineChart type='rsi' />
        </Grid>
        {test && (
          <Grid item>
            <MACDChart />
          </Grid>
        )}
        <Grid item>
          <StochChart />
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleMarket
