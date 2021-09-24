import * as React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper
} from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import zIndex from '@material-ui/core/styles/zIndex'
import img from '../svgs/home/card2.svg'

import { makeStyles } from '@material-ui/core'
const subTitle =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue nunc, tempor at congue a, efficitur at sapien. Sed efficitur molestie ex, nec sagittis ipsum.'

const useStyles = makeStyles(theme => ({
  card: {
    width: 480,
    height: 560,
    marginRight: 'calc(1rem*0.8)',
    zIndex: '1',
    borderRadius: '10px',
    paddingLeft: 'calc(48px*0.8)',
    paddingRight: 'calc(20px*0.8)',
    marginLeft: 'calc(75px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: 280,
      height: 338,
      marginLeft: 10,
      marginTop: 20
    }
  },
  cardMedia: {
    width: 'calc(405px*0.8)',
    height: 'calc(355px*0.8)',
    marginTop: 'calc(44px*0.8)',
    marginBottom: 'calc(31px*0.8)',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 217,
      height: 190,
      marginBottom: 0
    }
  },
  img: {
    objectFit: 'cover',
    width: 'calc(405px*0.8)',
    height: 'calc(355px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: 217,
      height: 190,
      marginBottom: 0
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

const ImageCard = ({ mobile }) => {
  const classes = useStyles()
  return (
    <Paper elevation={13} className={classes.card}>
      <div className={classes.cardMedia}>
        <img class className={classes.img} src={img} alt='' />
      </div>
      <div>
        <Typography
          gutterBottom
          variant={`${mobile ? 'h5' : 'h4'}`}
          component='div'
        >
          Stock Market
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {mobile ? ' ' : subTitle}
        </Typography>
        <Button
          className={classes.btn}
          size='large'
          variant='text'
          color='secondary'
        >
          {`Analyze Stock`}
          <span style={{ marginTop: 'calc(0.75rem*0.8)' }}>
            <ArrowRightAltIcon fontSize='small' />
          </span>
        </Button>
      </div>
    </Paper>
  )
}

export default ImageCard
