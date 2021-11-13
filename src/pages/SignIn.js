import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import signUpImg from '../svgs/signUp/signUpImg.svg'
import Controls from '../components/controls/Controls'

import { Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core'
import bottom from '../svgs/signUp/bottomLeft.svg'
import top from '../svgs/signUp/topRight.svg'
import facebook from '../svgs/signUp/facebook.svg'
import google from '../svgs/signUp/google.svg'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from '../redux/ducks/auth'
import logo from '../svgs/signUp/logo.svg'
import { Alert } from '@material-ui/lab'
import Fade from 'react-reveal/Fade'

const initialFValues = {
  email: '',
  password: ''
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: '0 auto',

    minHeight: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  img: {
    height: 'calc(442px*0.8)',
    width: 'calc(480px*0.8)',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  primary: {
    color: theme.palette.primary.main
  },
  paper: {
    minHeight: 'calc(500px*0.8)',
    width: 'calc(550px*0.8)',
    borderRadius: 15,
    padding: 'calc(50px*0.8) calc(40px*0.8)',
    paddingBottom: '0',
    [theme.breakpoints.down('sm')]: {
      padding: 15,
      marginLeft: -15,
      height: '63vh',
      width: '70vw'
    }
  },
  linksContainer: {
    margin: '0 auto',
    marginTop: '0.6rem',
    marginBottom: '1rem'
  },

  btn: {
    height: 'calc(50*0.8)',
    marginLeft: '1.5rem',
    marginTop: '2rem',
    borderRadius: '30px',
    marginBottom: '20px',
    maxWidth: '90%'
  },
  bottomImg: {
    position: 'absolute',
    left: '-1rem',
    bottom: '-3rem',
    marginBottom: 0,
    width: 210,
    height: 190,
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 93,
      bottom: '-1rem'
    }
  },
  topImg: {
    position: 'absolute',
    right: '-2rem',
    top: '-2rem',
    marginBottom: 0,
    width: 'calc(250px*0.8)',
    height: 'calc(220px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 93
    }
  },
  google: {
    width: '35px',
    height: '35px'
  },
  facebook: {
    width: '35px',
    height: '35px'
  },
  logo: {
    position: 'absolute',
    top: '2rem',
    height: '2rem',
    width: '15rem'
  },
  logoContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoCard: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 20,
      marginTop: '1rem',
      marginLeft: '-2rem'
    }
  },
  paperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem',
      marginLeft: '1rem'
    }
  },
  inputControl: {
    marginTop: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem'
    }
  }
}))

// const url = '#'

const SignIn = () => {
  const [creds, setCreds] = useState(initialFValues)
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const message = useSelector(state => state.auth.loginMessage)
  const isLoading = useSelector(state => state.auth.isLoading)

  const handleChange = e => {
    const { name, value } = e.target
    setCreds({ ...creds, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submitted')
    dispatch(authUser(creds))
    // console.log(creds)
  }

  const showAlert = () => {
    console.log(message)
    if (message != null) {
      if (
        message === 'Login Successful!' ||
        message === 'Successfully Registered'
      ) {
        return <Alert severity='success'> {message} </Alert>
      } else {
        return <Alert severity='error'> {message} </Alert>
      }
    }
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
  } else {
    return (
      <div
        style={{ maxHeight: '100vh', maxWidth: '100vw', overflow: 'hidden' }}
      >
        <Fade top>
          <img src={top} alt='top' className={classes.topImg} />
        </Fade>
        <Grid className={classes.logoContainer} item component={Link} to='/'>
          <Fade top>
            <img src={logo} alt='top' className={classes.logo} />
          </Fade>
        </Grid>
        <Fade bottom>
          <img src={bottom} className={classes.bottomImg} alt='bottom' />
        </Fade>
        <Grid container className={classes.container}>
          <article>
            <Fade left delay={1500}>
              <img src={signUpImg} className={classes.img} alt='' />
            </Fade>
          </article>
          <article className={classes.paperContainer}>
            <Fade right delay={1500}>
              <Paper className={classes.paper} elevation={8}>
                <Grid>
                  <Typography
                    variant={`${mobile ? 'h5' : 'h4'}`}
                    style={{
                      margin: '0 auto',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    Welcome to{' '}
                    {!mobile && (
                      <span
                        className={classes.primary}
                        style={{
                          marginLeft: '1rem'
                        }}
                      >
                        STOCKPILOT
                      </span>
                    )}
                  </Typography>
                  {mobile && (
                    <Grid component={Link} to='/'>
                      <img
                        src={logo}
                        component={Link}
                        to='/'
                        alt='top'
                        className={classes.logoCard}
                      />
                    </Grid>
                  )}
                </Grid>
                {/* <Grid container className={classes.linksContainer}>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <IconButton disableRipple>
                      <img className={classes.google} src={google} alt='' />

                      <Typography style={{ marginLeft: '1rem', color: '#222' }}>
                        Sign in with Google
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <IconButton disableRipple>
                      <img className={classes.facebook} src={facebook} alt='' />

                      <Typography style={{ marginLeft: '1rem', color: '#222' }}>
                        Sign in with facebook
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid> */}
                <form onSubmit={handleSubmit}>
                  <Grid className={classes.inputControl}>
                    <Controls.Input
                      fullWidth
                      label='Email'
                      name='email'
                      value={creds.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid style={{ marginTop: '2rem' }}>
                    <Controls.Input
                      fullWidth
                      label='Password'
                      name='password'
                      type='password'
                      value={creds.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Button
                    className={classes.btn}
                    variant='contained'
                    color='secondary'
                    type='submit'
                    fullWidth
                  >
                    {isLoading ? (
                      <CircularProgress color='inherit' size='1.6rem' />
                    ) : (
                      <Typography>Login</Typography>
                    )}
                  </Button>
                </form>
                <Typography>
                  Don't have an account?{' '}
                  <Button
                    component={Link}
                    to='/sign_up'
                    variant='text'
                    className={classes.primary}
                  >
                    Sign Up
                  </Button>
                </Typography>
                {/*<Typography>*/}
                  {/*<Button*/}
                  {/*  component={Link}*/}
                  {/*  to='/'*/}
                  {/*  variant='text'*/}
                  {/*  className={classes.primary}*/}
                  {/*>*/}
                  {/*  Forgot Password?*/}
                  {/*</Button>*/}
                {/*</Typography>*/}
                {showAlert()}
              </Paper>
            </Fade>
          </article>
        </Grid>
      </div>
    )
  }
}

export default SignIn
