import React from 'react'
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import SelectMarket from '../chartDropdown/SelectMarket'

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

const DesBox = ({ type }) => {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const { marketType } = useSelector(state => state.chart)

  const handleClick = () => {
    if (!isLoggedIn) {
      return history.push('/sign_up')
    } else {
      //add to watch list
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
              <Typography className={classes.textLower}>$3316.16</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h High</Typography>
              <Typography className={classes.textLower}>0.331616</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>24h Low </Typography>
              <Typography className={classes.textLower}>-0.331616</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.textUpper}>Volume</Typography>
              <Typography className={classes.textLower}>-0.331616</Typography>
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
