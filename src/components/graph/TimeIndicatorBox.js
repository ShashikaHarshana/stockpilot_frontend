import React, { useEffect, useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core'

import DropdownSelect from '../chartDropdown/DropdownSelect'
import DropDownSelectExt from '../chartDropdown/DropDownSelectExt'
import { useDispatch, useSelector } from 'react-redux'
import { updateTimeInterval } from '../../redux/ducks/chart'

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '1rem'
  },
  timeIndicatorPaper: {
    height: 'calc(50px*0.8)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: 'space-between',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      height: 150
    }
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
  const stockTimeIntervals = ['5m', '1h', '1d']
  const cryptoTimeIntervals = ['1m', '15m', '30m', '1h', '1d']

  const dispatch = useDispatch()
  const classes = useStyles()
  const { marketType } = useSelector(state => state.chart)
  const [timeInterval, setTimeInterval] = useState(
    type === 'stock' ? stockTimeIntervals[0] : cryptoTimeIntervals[0]
  )

  useEffect(() => {
    setTimeInterval(
      type === 'stock' ? stockTimeIntervals[0] : cryptoTimeIntervals[0]
    )
  }, [type])

  useEffect(() => {
    dispatch(updateTimeInterval(timeInterval))
  }, [timeInterval])

  return (
    <div>
      <Box>
        <Paper elevation={2} className={classes.timeIndicatorPaper}>
          <Grid
            container
            spacing={2}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Grid item sm={12} md={2}>
              <Typography>Time Interval</Typography>
            </Grid>
            <Grid
              item
              md={5}
              sm={12}
              // spacing={{ sm: 2, md: 4 }}
              className={classes.textContainer}
            >
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
              sm={12}
              md={5}
            >
              <DropdownSelect />
              <DropDownSelectExt />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  )
}

export default TimeIndicatorBox
