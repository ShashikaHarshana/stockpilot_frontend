import React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import signUpImg from '../svgs/signUp/signUpImg.svg'
import Controls from '../components/controls/Controls'
import { Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useForm } from '../components/hooks/useForm.js'
import logo from '../svgs/signUp/logo.svg'
import bottom from '../svgs/signUp/bottomLeft.svg'
import top from '../svgs/signUp/topRight.svg'
import { useDispatch } from 'react-redux'
import { userRegister } from '../redux/ducks/auth'
import { Alert } from '@material-ui/lab'
import Fade from 'react-reveal/Fade'

const initialFValues = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: '0 auto',

    minHeight: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',

      justifyContent: 'center'
    }
  },
  divContainer: {
    maxHeight: '100vh',
    maxWidth: '100vw'
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
    minHeight: 'calc(600px*0.8)',
    width: 'calc(550px*0.8)',
    padding: 'calc(50px*0.8) calc(40px*0.8)',
    paddingBottom: '0',
    borderRadius: 15,

    [theme.breakpoints.down('sm')]: {
      width: '70vw',
      height: 'fit-content',
      padding: 15,
      marginLeft: -15,
      zIndex: 10
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
  linksContainer: {
    margin: '0 auto',
    marginTop: '0.6rem',
    marginBottom: '1rem'
  },

  btn: {
    height: 'calc(50*0.8)',
    marginTop: '20px',
    borderRadius: '30px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 3
    }
  },
  bottom: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px'
    }
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

  logoCard: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 20,
      marginTop: '1rem',
      marginLeft: '-2rem'
    }
  },
  logoContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const isRegistered = useSelector(state => state.auth.isRegistered)
  const isLoading = useSelector(state => state.auth.isLoading)

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('firstName' in fieldValues) {
      temp.firstName = fieldValues.firstName ? '' : '*This field is required'
    }
    if ('lastName' in fieldValues) {
      temp.lastName = fieldValues.lastName ? '' : '*This field is required'
    }
    if ('email' in fieldValues) {
      temp.email = /.+@.+..+/.test(fieldValues.email)
        ? ''
        : '*Email is not Valid'
    }
    if ('password' in fieldValues) {
      temp.password = /(?=[a-z])[a-zA-Z0-9!?]{8,}/.test(fieldValues.password)
        ? ''
        : '*Password must be at least 8 characters with numbers and letters'
    }

    setErrors({ ...temp })

    if (fieldValues === values) {
      return Object.values(temp).every(item => item === '')
    }
  }

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = useForm(initialFValues, true, validate)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      dispatch(userRegister(values))
    }
  }

  const message = useSelector(state => state.auth.message)

  const showAlert = () => {
    console.log(message)
    if (message != null) {
      if (message === 'Successfully Registered') {
        return <Alert severity='success'> {message} </Alert>
      } else {
        return <Alert severity='error'> {message} </Alert>
      }
    }
  }
  console.log(isRegistered)
  if (isRegistered) {
    return <Redirect to='/sign_in' />
  } else {
    return (
      <div className={classes.divContainer}>
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
                  </Grid> */}
                {/* <Grid
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
                  <Grid style={{ marginTop: '1rem' }}>
                    <Controls.Input
                      fullWidth
                      label='First Name'
                      name='firstName'
                      value={values.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                    />
                  </Grid>
                  <Grid style={{ marginTop: '1rem' }}>
                    <Controls.Input
                      fullWidth
                      label='Last Name'
                      name='lastName'
                      value={values.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                    />
                  </Grid>
                  <Grid style={{ marginTop: '1rem' }}>
                    <Controls.Input
                      fullWidth
                      label='Email'
                      name='email'
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                  </Grid>
                  <Grid style={{ marginTop: '1rem' }}>
                    <Controls.Input
                      fullWidth
                      placeholder='Password should be min.8 characters and numbers '
                      label='Password'
                      name='password'
                      type='password'
                      value={values.password}
                      onChange={handleInputChange}
                      error={errors.password}
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
                      <Typography>Sign Up</Typography>
                    )}
                  </Button>
                </form>
                <Typography className={classes.bottom}>
                  Already have an account?
                  <Button
                    component={Link}
                    to='/sign_in'
                    variant='text'
                    className={classes.primary}
                  >
                    Log in
                  </Button>
                </Typography>
                {showAlert()}
              </Paper>
            </Fade>
          </article>
        </Grid>
      </div>
    )
  }
}

export default SignUp
