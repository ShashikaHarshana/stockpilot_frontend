import React from 'react'
import topRightImg from '../svgs/home/topRight.svg'
import topImg from '../svgs/home/topImg.svg'
import { Button, Grid, Typography } from '@material-ui/core'
import ImageCard from '../components/ImageCard/ImageCard'
import cardsLeft from '../svgs/home/cardsLeft.svg'
import cardsRight from '../svgs/home/cardsRight.svg'
import middleImg from '../svgs/home/middleImg.svg'
import img1 from '../svgs/home/card1.svg'
import img2 from '../svgs/home/card2.svg'
import botmLeft from '../svgs/home/botmLeft.svg'
import elipse from '../svgs/home/elipse.svg'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import Pulse from 'react-reveal/Pulse'

//classes for css
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
      minHeight: ' 80vh'
    }
  },
  imgHover: {
    transition: 'all 0.3s ease-out',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },

  topImg: {
    height: 'calc(350px*0.8)',
    width: 'calc(510px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: '290px',
      height: '200px',
      position: 'absolute',
      top: '23rem',
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
    right: 0,
    top: 200,
    marginRight: '2rem',
    position: 'absolute',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      top: '20rem',
      left: '0',
      width: '100%'
    }
  },
  bottomLeft: {
    position: 'absolute',
    top: '-15rem',
    left: '-15rem',
    height: 'calc(1200.73px*0.8)',
    width: 'calc(875.51px*0.8)',
    [theme.breakpoints.down('sm')]: {
      height: 388,
      width: 290,
      left: '-2rem',
      top: '-6rem'
    }
  },
  title: {
    fontSize: '3rem',
    // fontFamily: 'arial
    fontWeight: 400,
    letterSpacing: '1.75px',
    [theme.breakpoints.down('sm')]: { width: '80%', fontSize: '2.38rem' }
  },
  subTitle: {
    lineHeight: '1.2rem',
    letterSpacing: '1px',
    color: '',
    fontWeight: 500,
    marginTop: 'calc(25px*0.8)',
    width: '82%',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem', width: '93%' }
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
  },
  imgCard: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      border: '1px solid red'
    }
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
      <section className={classes.section1} id='topSection'>
        <article className={classes.articleTypo}>
          <Typography variant={`${mobile} ? h5 :h4`} className={classes.title}>
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
            <Button
              className={classes.signupBtn}
              component={Link}
              to={`${isLoggedIn ? '/analyze/crypto' : '/sign_up'}`}
              variant='contained'
              color='secondary'
            >
              Get Started
            </Button>
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
      <Fade left fraction={1}>
        <section className={classes.section}>
          <ImageCard
            mobile={mobile}
            img={img1}
            width={492}
            height={324}
            mWidth={250}
            mHeight={164}
            marginTop={74}
            type={'Crypto'}
          />
          <ImageCard
            className={classes.imgCard}
            mobile={mobile}
            img={img2}
            width={405}
            height={355}
            mWidth={217}
            mHeight={190}
            marginTop={44}
            type={'Stock'}
          />
        </section>
      </Fade>
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
              The one stop website for all your stock and crypto analysis
              needs...
            </Fade>
          </Typography>
        </article>
        <article className={classes.imgHover}>
          <Fade fraction={0.7} right delay={2000} duration={2000}>
            <img
              src={middleImg}
              className={classes.middleImg}
              alt='middleImg'
            />
          </Fade>
        </article>
      </section>
      <section className={classes.section} style={{ position: 'relative' }}>
        <article>
          <img src={botmLeft} className={classes.bottomLeft} alt='' />
        </article>
        <Fade fraction={0.7} right delay={1000} duration={2000}>
          <article className={classes.bottom}>
            <Typography variant={`${mobile ? 'h5' : 'h4'}`}>
              Get Notified <span className={classes.secondary}>24/7 </span>{' '}
            </Typography>{' '}
            <Typography
              variant='subtitle1'
              style={{ marginTop: 'calc(25px*0.8)' }}
            >
              The one stop website for all your stock and crypto analysis needs
              without any commission or deposits.
            </Typography>
            <Button
              className={classes.signupBtnB}
              component={Link}
              to={`${isLoggedIn ? '/analyze/crypto' : '/sign_up'}`}
              variant='contained'
              color='secondary'
            >
              get started
            </Button>
          </article>
        </Fade>
      </section>

      <Grid
        style={{
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
