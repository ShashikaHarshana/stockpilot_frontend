import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  // useMediaQuery,
  // useTheme,
  CircularProgress,
  useMediaQuery
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import SelectMarket from '../chartDropdown/SelectMarket'
import { addToWatchlist } from '../../redux/ducks/watchlist'
import { LISTEN_URL } from '../../utils/CONSTANTS'
import { useTheme } from '@material-ui/styles'

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
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      height: '80px'
    }
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
  textContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  addBtn: {
    borderRadius: '40px',
    padding: '5px 25px',
    width: '180px',
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2px 2px',
      width: '50px'
    }
  },
  btnContainer: {
    // marginLeft: 30
  }
}))
let initObject = {
  symbol: null,
  price: 0,
  high: 0,
  low: 0,
  volume: 0
}

const DesBox = ({ type }) => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const { marketType } = useSelector(state => state.chart)
  // const theme = useTheme()
  // const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const market = useSelector(state => state.chart.market)
  const [liveData, setLiveData] = useState(initObject)
  const isWatchlistLoading = useSelector(state => state.watchlist.isLoading)
  const added = useSelector(state => state.watchlist.added)

  useEffect(() => {
    if (marketType === 'crypto') {
      if (market !== null) {
        let eventSource = new EventSource(
          LISTEN_URL + market.toUpperCase() + '/1d'
        )
        eventSource.addEventListener(
          'message',
          function (e) {
            let parsedData = JSON.parse(e.data)
            let object = {
              symbol: market,
              price: parsedData.k.c,
              high: parsedData.k.h,
              low: parsedData.k.l,
              volume: parsedData.k.v
            }
            setLiveData(object)
          },
          false
        )

        return function cleanup () {
          eventSource.close()
        }
      }
    }
  }, [market])

  const handleClick = () => {
    if (!isLoggedIn) {
      return history.push('/sign_up')
    } else {
      dispatch(addToWatchlist({ brands: [market.toUpperCase()], token: token }))
    }
  }
  return (
    <div data-testid='descriptionBox'>
      <Box className={classes.box}>
        <Paper elevation={4} className={classes.detailPaper}>
          <Grid container className={classes.detailPaper}>
            <Grid
              item
              sm={12}
              md={3}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SelectMarket type={type} />
            </Grid>
            {marketType === 'crypto' ? (
              <Grid
                item
                container
                md={7}
                sm={12}
                spacing={4}
                className={classes.textContainer}
              >
                <Grid item>
                  <Typography className={classes.textUpper}>Price</Typography>
                  <Typography className={classes.textLower}>
                    {parseFloat(liveData.price).toFixed(4)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textUpper}>
                    24h High
                  </Typography>
                  <Typography className={classes.textLower}>
                    {parseFloat(liveData.high).toFixed(4)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textUpper}>
                    24h Low{' '}
                  </Typography>
                  <Typography className={classes.textLower}>
                    {parseFloat(liveData.low).toFixed(4)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textUpper}>Volume</Typography>
                  <Typography className={classes.textLower}>
                    {parseFloat(liveData.volume).toFixed(4)}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}

            <Grid className={classes.btnContainer} item md={2} sm={12}>
              {marketType === 'crypto' ? (
                <Button
                  onClick={handleClick}
                  className={classes.addBtn}
                  variant='contained'
                  // color='primary'
                >
                  {isWatchlistLoading ? (
                    <CircularProgress color='primary' size='1.6rem' />
                  ) : added.includes(market.toUpperCase()) ? (
                    'Added'
                  ) : mobile ? (
                    'Add'
                  ) : (
                    'Add to Watch List'
                  )}
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  )
}

export default DesBox
