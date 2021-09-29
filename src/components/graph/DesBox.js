import React from 'react'
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  useMediaQuery,
  useTheme
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

const DesBox = ({ type }) => {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const { marketType } = useSelector(state => state.chart)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

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
                <Typography className={classes.textLower}>$3316.16</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textUpper}>24h High</Typography>
                <Typography className={classes.textLower}>0.331</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textUpper}>24h Low </Typography>
                <Typography className={classes.textLower}>0.3316</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textUpper}>Volume</Typography>
                <Typography className={classes.textLower}>0.3316</Typography>
              </Grid>
            </Grid>

            <Grid className={classes.btnContainer} item md={2} sm={12}>
              {marketType === 'crypto' ? (
                <Button
                  onClick={handleClick}
                  className={classes.addBtn}
                  variant='contained'
                  // color='primary'
                >
                  {mobile ? 'add' : 'add to watch list'}
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
