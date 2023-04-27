import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useDispatch } from 'react-redux'
import { resetIndicators, updateMarket } from '../../redux/ducks/chart'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    '& .MuiSelect-select.MuiSelect-select': {
      fontSize: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiSelect-select.MuiSelect-select': {
        fontSize: '1rem'
      }
    }
  }
}))

// const stockMarkets = [
//   'AAPL',
//   'MSFT',
//   'GOOG',
//   'AMZN',
//   'FB',
//   'TSLA',
//   'NVDA',
//   'V',
//   'JPM',
//   'JNJ',
//   'BABA',
//   'WMT',
//   'UNH',
//   'HD'
// ]

// const cryptoMarkets = ['BNBUSDT', 'BNBBTC', 'LTCBTC', 'ETHUSDT', 'BTCUSDT', 'SOLUSDT']

const SelectMarket = ({ type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const cryptoMarkets = useSelector(state => state.chart.cryptoList)
  const stockMarkets = useSelector(state => state.chart.stockList)
  const [market, setMarket] = React.useState('')
  // const [market, setMarket] = React.useState(
  //   type === 'stock' && stockMarkets && cryptoMarkets
  //     ? stockMarkets[0]
  //     : cryptoMarkets[0]
  // )
  if (!stockMarkets || !cryptoMarkets) {
    // console.log('loading')
  }

  const handleChange = event => {
    setMarket(event.target.value)
  }

  useEffect(() => {
    setMarket(
      type === 'stock'
        ? stockMarkets[0] !== undefined
          ? 'AAPL'
          : stockMarkets[0]
        : cryptoMarkets[0]
    )
    dispatch(resetIndicators())
  }, [type])

  useEffect(() => {
    market && dispatch(updateMarket(market.toLowerCase()))
  }, [market])

  return (
    <div data-testid='selectMarket'>
      <FormControl className={classes.formControl}>
        <Select
          autoWidth
          value={market}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem style={{ fontW }} value='BBC'>
            BBC
          </MenuItem>
          <MenuItem value={'BNB'}>BNB</MenuItem>
          <MenuItem value={'BDC'}>BDC</MenuItem>
          <MenuItem value={'AAPL'}>AAPL</MenuItem> */}
          {type === 'stock'
            ? stockMarkets.map((market, index) => (
                <MenuItem key={index} value={market.toUpperCase()}>
                  {market.toUpperCase()}
                </MenuItem>
              ))
            : cryptoMarkets.map((market, index) => (
                <MenuItem key={index} value={market}>
                  {market}
                </MenuItem>
              ))}
        </Select>
        {/* <FormHelperText>Change Market</FormHelperText> */}
      </FormControl>
    </div>
  )
}

export default SelectMarket
