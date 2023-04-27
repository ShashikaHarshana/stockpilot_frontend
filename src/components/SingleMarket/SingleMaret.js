import React, { useEffect } from 'react'
import { Grid, useTheme, useMediaQuery } from '@material-ui/core'
import { useParams } from 'react-router'
import DesBox from '../graph/DesBox'
import TimeIndicatorBox from '../graph/TimeIndicatorBox'
import NavBar from '../NavBar'
import StockChart from '../Charts/StockChart'
import LineChart from '../technicalIndicators/linechart'
import MACDChart from '../technicalIndicators/macd'
import StochChart from '../technicalIndicators/stochChart'

import { makeStyles } from '@material-ui/core'
import CryptoChart from '../Charts/CryptoChart'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateMarketType } from '../../redux/ducks/chart'
import Fade from 'react-reveal/Fade'

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
  const { externalIndicators } = useSelector(state => state.chart)
  const { macd, obv, roc, rsi, stoch } = externalIndicators

  useEffect(() => {
    dispatch(updateMarketType(type))
  }, [type])

  return (
    <div>
      <Fade top>
        <NavBar />
      </Fade>
      <Fade left>
        <DesBox type={type} />
      </Fade>
      <Fade left delay={500}>
        <TimeIndicatorBox type={type} />
      </Fade>
      <Fade delay={1500}>
        <Grid container>
          <Grid className={classes.mainChart}>
            {type === 'stock' ? (
              <StockChart mobile={mobile} />
            ) : (
              <CryptoChart mobile={mobile} />
            )}
          </Grid>
          <Grid item className={classes.lineChart}>
            {rsi && <LineChart mobile={mobile} type='rsi' />}
            {obv && <LineChart mobile={mobile} type='obv' />}
            {roc && <LineChart mobile={mobile} type='roc' />}
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
      </Fade>
    </div>
  )
}

export default SingleMarket
