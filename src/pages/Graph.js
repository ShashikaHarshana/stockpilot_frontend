import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Chart from '../components/Chart'
import NavBar from '../components/NavBar'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import candleStick from '../svgs/chart/candleStick.svg'
import indicators from '../svgs/chart/indicators.svg'

const useStyles = makeStyles({
  box: {
    marginTop: '1rem'
  },
  detailPaper: {
    maxWidth: 'calc(1322px*0.8)',
    height: 'calc(90px*0.8)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: 'space-between'
  },
  timeIndicatorPaper: {
    height: 'calc(50px*0.8)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: 'space-between',
    marginTop: '2rem'
  },
  textUpper: {
    fontSize: '1rem'
  },
  textLower: { fontSize: '0.8rem' },
  textContainer: { display: 'flex' },
  addBtn: {
    borderRadius: '40px',
    padding: '5px 25px',
    width: '210px',
    color: '#fff'
  }
})

const Graph = () => {
  const classes = useStyles()

  return (
    <div>
      <NavBar />
      <Box className={classes.box}>
        <Paper elevation={8} className={classes.detailPaper}>
          <Grid container sm={3}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>
              BTC/USD
            </Typography>
          </Grid>
          <Grid item container spacing={4} className={classes.textContainer}>
            <Grid item>
              <Typography className={classes.textUpper}>0.073101</Typography>
              <Typography className={classes.textLower}>$3316.16</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h Change</Typography>
              <Typography className={classes.textLower}>-0.331616</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h High</Typography>
              <Typography className={classes.textLower}>0.331616</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h Low </Typography>
              <Typography className={classes.textLower}>-0.331616</Typography>
            </Grid>
            {/* <Grid item>
              <Typography className={classes.textUpper}>24h Volume</Typography>
              <Typography className={classes.textLower}>lower</Typography>
            </Grid> */}

            {/* <Grid item>
              <Typography className={classes.textUpper}>upper</Typography>
              <Typography className={classes.textLower}>lower</Typography>
            </Grid> */}
          </Grid>

          <Grid container sm={4}>
            <Button
              className={classes.addBtn}
              variant='contained'
              color='primary'
            >
              Add to Watch List
            </Button>
          </Grid>
        </Paper>
      </Box>

      <Box>
        <Paper elevation={8} className={classes.timeIndicatorPaper}>
          <Grid sm={3}>
            <Typography>Time Interval</Typography>
          </Grid>
          <Grid container spacing={4} className={classes.textContainer}>
            <Grid item>
              <Typography>1m</Typography>
            </Grid>
            <Grid item>
              <Typography>5m</Typography>
            </Grid>
            <Grid item>
              <Typography>1H</Typography>
            </Grid>
            <Grid item>
              <Typography>1D</Typography>
            </Grid>
            <Grid item>
              <Typography>1W</Typography>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center '
            }}
            sm={5}
          >
            {/* <Menu>Menu</Menu> */}
            <IconButton style={{ marginRight: '1rem' }}>
              <img src={candleStick} alt='candleStick' />
            </IconButton>

            <IconButton>
              <img src={indicators} alt='indicators' />
            </IconButton>
          </Grid>
        </Paper>
      </Box>

      {/* <Chart /> */}
    </div>
  )
}

export default Graph
