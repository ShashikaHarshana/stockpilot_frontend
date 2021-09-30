import React, { useEffect } from 'react'
import topRightImg from '../svgs/home/topRight.svg'
import topImg from '../svgs/home/topImg.svg'
import { Button, Grid, Typography } from '@material-ui/core'
import ImageCard0 from '../components/ImageCard0'
import ImageCard1 from '../components/ImageCard1'
import cardsLeft from '../svgs/home/cardsLeft.svg'
import cardsRight from '../svgs/home/cardsRight.svg'
import middleImg from '../svgs/home/middleImg.svg'
import botmLeft from '../svgs/home/botmLeft.svg'
import elipse from '../svgs/home/elipse.svg'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import Bounce from 'react-reveal/Bounce'
import Flip from 'react-reveal/Flip'
import Roll from 'react-reveal/Roll'
import Tada from 'react-reveal/Tada'
import Pulse from 'react-reveal/Pulse'
import Rotate from 'react-reveal/Rotate'
import Slide from 'react-reveal/Slide'
import Jump from 'react-reveal/Jump'
import HeadShake from 'react-reveal/HeadShake'
import LightSpeed from 'react-reveal/LightSpeed'
import RubberBand from 'react-reveal/RubberBand'

const useStyles = makeStyles(theme => ({
  topcornerImg: {
    position: 'absolute',
    top: '-10px',
    left: '-30px',
    height: 'calc(130*0.8)px',
    width: 'calc(200px*0.8)',
    [theme.breakpoints.down('sm')]: {
      height: '22px',
      width: '38px',
      left: '-5px',
      top: '-3px'
    }
  },
  cardsLeft: {
    position: 'absolute',
    top: 'calc(51.5rem*0.8)',
    left: '1.5rem',
    height: 'calc(400*0.8)px',
    width: 'calc(523px*0.8)',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  cardsRight: {
    position: 'absolute',
    top: '50rem',
    left: '46.5rem',
    height: 'calc(820px*0.8)',
    width: 'calc(962px*0.8)',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  elipseLeft: {
    position: 'absolute',
    top: '38rem',
    left: '-1.25rem',
    height: 'calc(113px*0.8)',
    width: 'calc(89px*0.8)'
  },
  section1: {
    minHeight: '86vh',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: '3rem'
    }
  },
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: '1rem'
    }
  },

  topImg: {
    height: 'calc(350px*0.8)',
    width: 'calc(510px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: '290px',
      height: '200px',
      position: 'absolute',
      top: '25rem',
      left: '2.5rem'
    }
  },
  signupBtn: {
    borderRadius: '30px',
    width: 'calc(190px*0.8)',
    height: 'calc(60px*0.8)',
    fontSize: '1rem',
    marginTop: 'calc(40px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: '200px',
      height: '30px',
      marginTop: '1.5rem',
      fontSize: '0.8rem'
    }
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  primary: {
    color: theme.palette.primary.main
  },
  middleImg: {
    height: 'calc(747px*0.8)',
    width: 'calc(766px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: 260,
      height: 254
    }
  },
  bottom: {
    position: 'absolute',
    left: '50rem',
    top: '153rem',
    [theme.breakpoints.down('sm')]: {
      left: '5rem',
      top: '150rem'
    }
  },
  bottomLeft: {
    position: 'absolute',
    top: '120rem',
    left: '-1rem',
    height: 'calc(1200.73px*0.8)',
    width: 'calc(875.51px*0.8)',
    [theme.breakpoints.down('sm')]: {
      height: 388,
      width: 290,
      top: '115rem'
    }
  },
  title: { fontWeight: 300, [theme.breakpoints.down('sm')]: { width: '80%' } },
  subTitle: {
    fontWeight: 400,
    marginTop: 'calc(34px*0.8)',
    width: '82%',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
  },
  signupBtnB: {
    width: 'calc(190px*0.8)',
    marginTop: 'calc(40px*0.8)',
    p: '10px 25px',
    borderRadius: '30px'
  },
  footer: {
    position: 'absolute',
    bottom: '1rem',
    border: '1px solid red'
  },
  typo: {
    fontWeight: 300
  }
}))

const Home = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)

  return (
    <main>
      <Fade top>
        <NavBar />
        <img
          src={topRightImg}
          alt='leftCornerImg'
          className={classes.topcornerImg}
        />
      </Fade>

      <Fade bottom>
        <img src={cardsLeft} className={classes.cardsLeft} alt='' style={{}} />
        <img src={elipse} className={classes.elipseLeft} alt='' />
      </Fade>
      <Fade right fraction={0.5}>
        <img src={cardsRight} alt='' className={classes.cardsRight} />
      </Fade>
      <Fade fraction={0.6} left duration={2000}>
        <img src={botmLeft} className={classes.bottomLeft} alt='' />
      </Fade>
      <section className={classes.section1}>
        <article className={classes.articleTypo}>
          <Typography
            variant={`${mobile ? 'h4' : 'h2'}`}
            className={classes.title}
          >
            <Zoom right big cascade delay={500} duration={2000}>
              Smart Investing Platform
            </Zoom>
          </Typography>
          <Typography variant='subtitle1' className={classes.subTitle}>
            <Fade top cascade delay={3000}>
              The one stop website for all your stock and crypto analysis needs
              without any commission or deposits.
            </Fade>
          </Typography>
          <Fade left delay={4000}>
            <Jump delay={4500}>
              <Button
                className={classes.signupBtn}
                component={Link}
                to={`${isLoggedIn ? '/analyze/stock' : '/sign_up'}`}
                variant='contained'
                color='secondary'
              >
                Get Started
              </Button>
            </Jump>
          </Fade>
        </article>
        <article className={classes.article}>
          <Fade right delay={4000}>
            <Pulse delay={5000} duration={2000}>
              <img src={topImg} className={classes.topImg} alt='img' />
            </Pulse>
          </Fade>
        </article>
      </section>
      <section className={classes.section}>
        <ImageCard0 mobile={mobile} />
        <ImageCard1 mobile={mobile} />
      </section>
      <section className={classes.section}>
        <article>
          <Zoom cascade top duration={1500}>
            <Typography variant={`${mobile ? 'h5' : 'h4'}`}>
              Manage your own{' '}
              <span className={classes.secondary}>Watchlist </span> of favourite{' '}
              <span className={classes.primary}>Crypto </span>
              and <span className={classes.primary}>Stock</span>{' '}
            </Typography>{' '}
          </Zoom>
          <Typography
            variant='subtitle1'
            style={{ width: '80%', lineHeight: '20px', marginTop: '10px' }}
          >
            <Fade bottom cascade delay={1000} fraction={0.7}>
              The one stop website for all your stock and crypto analysis needs
              without any commission or deposits.
            </Fade>
          </Typography>
        </article>
        <article>
          <Fade fraction={0.7} right delay={2000} duration={2000}>
            <HeadShake fraction={0.7} delay={4000}>
              <img
                src={middleImg}
                className={classes.middleImg}
                alt='middleImg'
              />
            </HeadShake>
          </Fade>
        </article>
      </section>
      <section>
        <LightSpeed right fraction={0.5} delay={1500} duration={2000}>
          <article className={classes.bottom}>
            <Typography variant={`${mobile ? 'h5' : 'h4'}`}>
              Get Notified <span className={classes.secondary}>24/7 </span>{' '}
            </Typography>{' '}
            <Typography variant='subtitle2' style={{ width: '70%' }}>
              The one stop website for all your stock and crypto analysis needs
              without any commission or deposits.
            </Typography>
            <Jump delay={1500}>
              <Button
                className={classes.signupBtnB}
                component={Link}
                to={`${isLoggedIn ? '/analyze/crypto' : '/sign_up'}`}
                variant='contained'
                color='secondary'
              >
                get started
              </Button>
            </Jump>
          </article>
        </LightSpeed>
      </section>

      <Grid
        style={{
          transform: 'translateY(650px)',
          width: '100%',
          // width: '1200px',
          margin: '0 auto'
        }}
      >
        <Fade bottom>
          <Footer />
        </Fade>
      </Grid>
    </main>
  )
}
export default Home
