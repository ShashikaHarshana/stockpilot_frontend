import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import Button from '../controls/Button'
import candleStick from '../../svgs/chart/candleStick.svg'
import indicators from '../../svgs/chart/indicators.svg'

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

const TimeIndicatorBox = () => {
  const classes = useStyles()
  return (
    <div>
      <Box>
        <Paper elevation={8} className={classes.timeIndicatorPaper}>
          <Grid item sm={3}>
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
            item
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
    </div>
  )
}

export default TimeIndicatorBox
