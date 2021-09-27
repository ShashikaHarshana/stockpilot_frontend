import React, { useEffect, useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core'

import candleStick from '../../svgs/chart/candleStick.svg'
import indicators from '../../svgs/chart/indicators.svg'
import DropdownSelect from '../chartDropdown/DropdownSelect'
import DropDownSelectExt from '../chartDropdown/DropDownSelectExt'
import { useDispatch } from 'react-redux'
import { updateTimeInterval } from '../../redux/ducks/chart'

const useStyles = makeStyles(theme => ({
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
  },
  btn: {
    '&:focus': {
      color: theme.palette.secondary.main
    }
  }
}))

const TimeIndicatorBox = ({ type }) => {
  const stockTimeIntervals = ['5m', '10m', '1H', '1D', '1W']
  const cryptoTimeIntervals = ['1m', '10m', '1H', '1D', '1W']

  const dispatch = useDispatch()
  const classes = useStyles()
  const [timeInterval, setTimeInterval] = useState(stockTimeIntervals[0])

  useEffect(() => {
    dispatch(updateTimeInterval(timeInterval))
  }, [timeInterval])

  return (
    <div>
      <Box>
        <Paper elevation={2} className={classes.timeIndicatorPaper}>
          <Grid item sm={3}>
            <Typography>Time Interval</Typography>
          </Grid>
          <Grid container spacing={4} className={classes.textContainer}>
            {type === 'stock'
              ? stockTimeIntervals.map((time, index) => {
                  return (
                    <Grid item key={index}>
                      <Button
                        onClick={() => {
                          setTimeInterval(time)
                        }}
                        className={classes.btn}
                      >
                        {time}
                      </Button>
                    </Grid>
                  )
                })
              : cryptoTimeIntervals.map((time, index) => {
                  return (
                    <Grid item key={index}>
                      <Button
                        onClick={() => {
                          setTimeInterval(time)
                        }}
                        className={classes.btn}
                      >
                        {time}
                      </Button>
                    </Grid>
                  )
                })}
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
            <DropdownSelect />
            <DropDownSelectExt />
          </Grid>
        </Paper>
      </Box>
    </div>
  )
}

export default TimeIndicatorBox
