import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import profileImage from '../../svgs/profilePhoto.png'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(25),
      height: theme.spacing(25)
    }
  },
  button: {
    width: '8rem',
    height: '2rem',
    marginTop: 0
  },
  input: {
    width: '8rem',
    height: '2rem',
    marginTop: 0,
    visibility: 'hidden'
  }
}))

export default function ImageAvatars () {
  const classes = useStyles()
  const inputRef = useRef(null)

  return (
    <div className={classes.root}>
      <Avatar alt='Remy Sharp' src={profileImage} />
      <Button
        variant='outlined'
        color='secondary'
        className={classes.button}
        onClick={() => inputRef.current.click()}
      >
        upload image
      </Button>
      <input className={classes.input} ref={inputRef} type='file' />
    </div>
  )
}
