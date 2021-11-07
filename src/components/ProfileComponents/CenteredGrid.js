import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageAvatars from './ImageAvatars'
import VerticalTabs from './TabPanel'
import image from '../../svgs/profileSettings.png'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '4rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  imageContainer: {
    // position: 'absolute',
    margin: '0 auto',
    marginTop: '4rem',
    marginLeft: '14rem',
    height: 'calc(350px*0.8)',
    width: 'calc(350px*0.8)'
    // border: '1px solid red'
  },
  image: {
    height: '100%',
    width: '100%'
  }
}))

export default function CenteredGrid () {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root} spacing={4}>
        <Grid item xs={3} style={{ marginTop: '-3rem' }}>
          <ImageAvatars />
        </Grid>
        <Grid item xs={9}>
          <VerticalTabs />
        </Grid>
      </Grid>
      <div className={classes.imageContainer}>
        <img src={image} className={classes.image} />
      </div>
    </>
  )
}
