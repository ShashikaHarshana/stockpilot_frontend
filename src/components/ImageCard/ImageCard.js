import * as React from 'react'
import { Button, Typography, Paper } from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const subTitle =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue nunc, tempor at congue a, efficitur at sapien. Sed efficitur molestie ex, nec sagittis ipsum.'

const useStyles = makeStyles(theme => ({
  card: {
    width: 480,
    height: 525,
    marginRight: 'calc(4rem*0.8)',
    zIndex: '1',
    borderRadius: '10px',
    paddingLeft: 'calc(48px*0.8)',
    paddingRight: 'calc(20px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: 'fit-content',
      margin: '0 auto',
      marginBottom: '2rem',
      paddingLeft: 'calc(25px*0.8)',
      paddingBottom: '1rem'
    }
  },
  cardMedia: {
    width: props => `calc(${props.width}px*0.8)`,
    height: props => `calc(${props.height}px*0.8)`,
    marginTop: props => `calc(${props.marginTop}px*0.8)`,
    marginBottom: 'calc(31px*0.8)',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      transform: 'scale(1.1)'
    },
    [theme.breakpoints.down('sm')]: {
      width: props => `calc(${props.mWidth}px*0.8)`,
      height: props => `calc(${props.mHeight}px*0.8)`,
      margin: '0 auto'
      // marginTop: '35px'
    }
  },
  img: {
    objectFit: 'cover',
    width: props => `calc(${props.width}px*0.8)`,
    height: props => `calc(${props.height}px*0.8)`,
    [theme.breakpoints.down('sm')]: {
      width: props => `calc(${props.mWidth}px*0.8)`,
      height: props => `calc(${props.mHeight}px*0.8)`
    }
  },
  btn: {
    fontSize: 'calc(1.35rem*0.8)',
    marginLeft: '-10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem'
    }
  }
}))

const ImageCard = ({
  mobile,
  checked,
  img,
  height,
  width,
  mWidth,
  mHeight,
  marginTop,
  type
}) => {
  const { isLoggedIn } = useSelector(state => state.auth)

  const classes = useStyles({ height, width, mWidth, mHeight, marginTop })

  return (
    <Paper elevation={13} className={classes.card}>
      <div className={classes.cardMedia}>
        <img className={classes.img} src={img} alt='' />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Typography
          gutterBottom
          variant={`${mobile ? 'h5' : 'h4'}`}
          // component='div'
        >
          <span>{type}</span>{' '}
          <span>{type === 'Crypto' ? 'Currency' : 'Market'}</span>
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {subTitle}
        </Typography>
        <Button
          size='large'
          className={classes.btn}
          variant='text'
          color='secondary'
          component={Link}
          to={`${
            isLoggedIn
              ? type === 'Crypto'
                ? '/analyze/crypto'
                : '/analyze/stock'
              : '/sign_up'
          }`}
        >
          {`Analyze ${type}`}
          <span style={{ marginTop: 'calc(0.75rem*0.8)' }}>
            <ArrowRightAltIcon fontSize='small' />
          </span>
        </Button>
      </div>
    </Paper>
  )
}

export default ImageCard
