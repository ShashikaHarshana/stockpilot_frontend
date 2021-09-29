import React, {useEffect, useState} from 'react'
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button
} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router'
import SelectMarket from '../chartDropdown/SelectMarket'
import {addToWatchlist} from "../../redux/ducks/watchlist";

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
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
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
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const { marketType } = useSelector(state => state.chart)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const market = useSelector(state => state.chart.market)
  const [liveData, setLiveData] = useState(initObject)


  useEffect(() => {
    if (market !== null) {
        let eventSource = new EventSource('http://localhost:5000/binance/listen/' + market.toUpperCase() + '/1d')
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

      return function cleanup() {
        eventSource.close();
      }
    }
  }, [market])


  const handleClick = () => {
    if (!isLoggedIn) {
      return history.push('/sign_up')
    } else {
      dispatch(addToWatchlist({"brands":[market.toUpperCase()], "token": token}))
    }
  }
  return (
    <div>
      <Box className={classes.box}>
        <Paper elevation={4} className={classes.detailPaper}>
          <Grid container item sm={3}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>
              <SelectMarket type={type} />
            </Typography>
          </Grid>
          <Grid item container spacing={4} className={classes.textContainer}>
            <Grid item>
              <Typography className={classes.textUpper}>Price</Typography>
              <Typography className={classes.textLower}>{liveData.price}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h High</Typography>
              <Typography className={classes.textLower}>{liveData.high}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h Low </Typography>
              <Typography className={classes.textLower}>{liveData.low}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>Volume</Typography>
              <Typography className={classes.textLower}>{liveData.volume}</Typography>
            </Grid>
          </Grid>

          <Grid container item sm={4}>
            {marketType === 'crypto' ? (
              <Button
                onClick={handleClick}
                className={classes.addBtn}
                variant='contained'
                // color='primary'
              >
                Add to Watch List
              </Button>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </div>
  )
}

export default DesBox
