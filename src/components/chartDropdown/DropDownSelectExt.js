import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Checkbox from '@material-ui/core/Checkbox'

import indicatorsIcon from '../../svgs/chart/indicators.svg'
import { useDispatch } from 'react-redux'
import { updateExternalIndicators } from '../../redux/ducks/chart'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: 120
  }
}))

const DropdownSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const { marketType } = useSelector(state => state.chart)
  const [indicators, setIndicators] = React.useState({
    rsi: false,
    obv: false,
    roc: false,
    macd: false,
    stoch: false
  })

  useEffect(() => {
    setIndicators({
      rsi: false,
      obv: false,
      roc: false,
      macd: false,
      stoch: false
    })
  }, [marketType])

  const classes = useStyles()

  const handleChange = event => {
    setIndicators({ ...indicators, [event.target.name]: event.target.checked })
  }

  const { rsi, obv, roc, macd, stoch } = indicators

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(updateExternalIndicators(indicators))
  }

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <img src={indicatorsIcon} alt='indicators' />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel style={{ marginBottom: 10 }} component='legend'>
              Select Indicators
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={rsi} onChange={handleChange} name='rsi' />
                }
                label='RSI'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={obv} onChange={handleChange} name='obv' />
                }
                label='OBV'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={roc} onChange={handleChange} name='roc' />
                }
                label='ROC'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={macd}
                    onChange={handleChange}
                    name='macd'
                  />
                }
                label='MACD'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={stoch}
                    onChange={handleChange}
                    name='stoch'
                  />
                }
                label='STOCH'
              />
            </FormGroup>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default React.memo(DropdownSelect)
