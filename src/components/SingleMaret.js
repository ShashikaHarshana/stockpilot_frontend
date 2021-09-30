import React, { useEffect, useState } from 'react'
import { Grid, Button, useTheme, useMediaQuery } from '@material-ui/core'
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
import { useDispatch } from 'react-redux'
import { updateMarketType } from '../redux/ducks/chart'

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
  const dispatch = useDispatch()
  const { type } = useParams()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { externalIndicators, stockLoading } = useSelector(state => state.chart)
  const { macd, obv, roc, rsi, stoch } = externalIndicators

  useEffect(() => {
    dispatch(updateMarketType(type))
  }, [type])

  return (
    <div>
      <NavBar />
      <DesBox type={type} />
      <TimeIndicatorBox type={type} />
      <Grid container>
        <Grid className={classes.mainChart}>
          {type === 'stock' ? (
            <StockChart mobile={mobile} />
          ) : (
            <CryptoChart mobile={mobile} />
          )}
        </Grid>
        <Grid item className={classes.lineChart}>
          {obv && <LineChart mobile={mobile} type='obv' />}
          {roc && <LineChart mobile={mobile} type='roc' />}
          {rsi && <LineChart mobile={mobile} type='rsi' />}
        </Grid>
        {macd && (
          <Grid item>
            <MACDChart mobile={mobile} />
          </Grid>
        )}
        {stoch && (
          <Grid item>
            <StochChart mobile={mobile} />
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default SingleMarket
