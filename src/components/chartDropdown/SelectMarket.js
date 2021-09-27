import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useDispatch } from 'react-redux'
import { updateMarket } from '../../redux/ducks/chart'

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
    }
  }
}))

const allMarkets = ['BBC', 'BNB', 'BDC', 'AAPL']

const SelectMarket = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [market, setMarket] = React.useState(allMarkets[0])

  const handleChange = event => {
    setMarket(event.target.value)
  }

  useEffect(() => {
    dispatch(updateMarket(market))
  }, [market])

  return (
    <div>
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
          {allMarkets.map((market, index) => (
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
