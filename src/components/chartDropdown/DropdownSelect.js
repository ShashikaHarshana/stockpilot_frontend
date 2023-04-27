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
import candleStick from '../../svgs/chart/candleStick.svg'
import { useDispatch } from 'react-redux'
import { updateInternalIndicators } from '../../redux/ducks/chart'
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
  const [indicators, setIndicators] = React.useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false
  })

  const { marketType } = useSelector(state => state.chart)

  const classes = useStyles()

  const handleChange = event => {
    setIndicators({ ...indicators, [event.target.name]: event.target.checked })
  }

  const { ma, sma, ema, wma, bbands } = indicators

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(updateInternalIndicators(indicators))
  }

  useEffect(() => {
    setIndicators({
      ma: false,
      sma: false,
      ema: false,
      wma: false,
      bbands: false
    })
  }, [marketType])

  return (
    <div data-testid='internalSelect'>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <img src={candleStick} alt='candleStick' />
        {/* <IconButton
          
          style={{ marginRight: '1rem' }}
        >
          
        </IconButton> */}
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
                  <Checkbox checked={ma} onChange={handleChange} name='ma' />
                }
                label='MA'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={sma} onChange={handleChange} name='sma' />
                }
                label='SMA'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={ema} onChange={handleChange} name='ema' />
                }
                label='EMA'
              />

              <FormControlLabel
                control={
                  <Checkbox checked={wma} onChange={handleChange} name='wma' />
                }
                label='WMA'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={bbands}
                    onChange={handleChange}
                    name='bbands'
                  />
                }
                label='BBANDS'
              />
            </FormGroup>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DropdownSelect
