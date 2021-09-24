import React, { useEffect } from 'react'
import topRightImg from '../svgs/home/topRight.svg'
import topImg from '../svgs/home/topImg.svg'
import { Button, Typography } from '@material-ui/core'
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

const useStyles = makeStyles(theme => ({
  topcornerImg: {
    position: 'absolute',
    top: '-10px',
    left: '-30px',
    height: 'calc(153*0.8)px',
    width: 'calc(263px*0.8)',
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
    // background: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: '3rem'
    }
  },
  section: {
    minHeight: '80vh',
    // background: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: '1rem'
    }
  },

  topImg: {
    height: 'calc(362px*0.8)',
    width: 'calc(524px*0.8)',
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
    left: '55rem',
    top: '140rem',
    [theme.breakpoints.down('sm')]: {
      left: '5rem',
      top: '140rem'
    }
  },
  bottomLeft: {
    position: 'absolute',
    position: 'absolute',
    top: '100rem',
    left: '-0.5rem',
    height: 'calc(1274.73px*0.8)',
    width: 'calc(915.51px*0.8)',
    [theme.breakpoints.down('sm')]: {
      height: 388,
      width: 290,
      top: '115rem'
    }
  },
  subTitle: {
    marginTop: 'calc(34px*0.8)',
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
  },
  signupBtnB: {
    width: 'calc(190px*0.8)',
    marginTop: 'calc(40px*0.8)',
    p: '10px 25px',
    borderRadius: '30px'
  }
}))

const Home = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <main>
      <NavBar />

      <img
        src={topRightImg}
        alt='leftCornerImg'
        className={classes.topcornerImg}
      />
      <img src={cardsLeft} className={classes.cardsLeft} alt='' style={{}} />
      <img src={elipse} className={classes.elipseLeft} alt='' />
      <img src={cardsRight} alt='' className={classes.cardsRight} />
      <img src={botmLeft} className={classes.bottomLeft} alt='' />

      <section className={classes.section1}>
        <article className={classes.articleTypo}>
          <Typography
            variant={`${mobile ? 'h4' : 'h3'}`}
            style={{ fontWeight: '300' }}
          >
            Smart Investing Platform
          </Typography>
          <Typography variant='subtitle1' className={classes.subTitle}>
            The one stop website for all your stock and crypto analysis needs
            without any commission or deposits.
          </Typography>

          <Button
            className={classes.signupBtn}
            component={Link}
            to='/sign_up'
            variant='contained'
            color='secondary'
          >
            Sign Up
          </Button>
        </article>
        <article className={classes.article}>
          <img src={topImg} className={classes.topImg} alt='img' />
        </article>
      </section>
      <section className={classes.section}>
        <ImageCard0 mobile={mobile} />
        <ImageCard1 mobile={mobile} />
      </section>
      <section className={classes.section}>
        <article>
          <Typography variant={`${mobile ? 'h5' : 'h4'}`}>
            Manage your own{' '}
            <span className={classes.secondary}>Watchlist </span> of favourite{' '}
            <span className={classes.primary}>Crypto </span>
            and <span className={classes.primary}>Stock</span>{' '}
          </Typography>{' '}
          <Typography
            variant='subtitle1'
            style={{ width: '80%', lineHeight: '20px', marginTop: '10px' }}
          >
            The one stop website for all your stock and crypto analysis needs
            without any commission or deposits.
          </Typography>
        </article>
        <article>
          <img src={middleImg} className={classes.middleImg} alt='middleImg' />
        </article>
      </section>
      <section>
        <article className={classes.bottom}>
          <Typography variant={`${mobile ? 'h5' : 'h4'}`}>
            Get Notified <span className={classes.secondary}>24/7 </span>{' '}
          </Typography>{' '}
          <Typography variant='subtitle2' style={{ width: '70%' }}>
            The one stop website for all your stock and crypto analysis needs
            without any commission or deposits.
          </Typography>
          <Button
            className={classes.signupBtnB}
            component={Link}
            to='/sign_up'
            variant='contained'
            color='secondary'
          >
            get started
          </Button>
        </article>
      </section>
    </main>
  )
}
export default Home
