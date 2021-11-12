import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import logo from '../../svgs/signUp/logo.svg'
import { Link } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MailIcon from '@material-ui/icons/Mail'

const useStyles = makeStyles(theme => ({
  gridItem: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'start'
    }
  },
  gridItemLinks: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      // alignItems: 'start'
      flexDirection: 'row'
    }
  },

  logo: {
    width: 200,
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      height: 40
    }
  },
  link: {
    textDecoration: 'none',
    color: '#767687',
    marginTop: 10,
    '&:hover': {
      color: '#222'
    },
    transition: 'all linear 0.25s',
    [theme.breakpoints.down('sm')]: {
      marginRight: 10
    }
  },
  icon: {
    marginRight: 25
  },
  iconButton: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#222'
    },
    width: 40,
    height: 40
  },
  mail: {
    marginTop: 15
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <div style={{ marginTop: '1rem' }}>
      <Box
        borderTop={1}
        py={{ sm: 5, xs: 2 }}
        px={{ sm: 10, xs: 2 }}
        bgcolor='#fff'
        color='#020115'
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Grid component={Link} to='/'>
              <img src={logo} alt='logo' className={classes.logo} />
            </Grid>
            <Typography>
              The website for all Your Crypto and Stock Analysis needs
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12} className={classes.gridItem}>
            <Typography>Helpful Links</Typography>
            <div className={classes.gridItemLinks}>
              <Link to='/' className={classes.link}>
                Home
              </Link>
              <Link to='/crypto' className={classes.link}>
                Crypto
              </Link>
              <Link to='/stock' className={classes.link}>
                Stock
              </Link>
            </div>
          </Grid>
          <Grid item sm={4} xs={12} className={classes.gridItem}>
            <Typography>Contact Us</Typography>
            <div style={{ marginTop: 10 }}>
              <FacebookIcon className={classes.icon} />
              <TwitterIcon className={classes.icon} />
              <LinkedInIcon className={classes.icon} />
            </div>
            <Grid container className={classes.mail}>
              <LocationOnIcon style={{ marginRight: 20 }} />
              <Typography>32/1, Temple Road, Colombo 7</Typography>
            </Grid>

            <Grid container style={{ marginTop: 15 }}>
              <MailIcon style={{ marginRight: 20 }} />
              <Typography>info.stockpilot@gmail.com</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Footer
