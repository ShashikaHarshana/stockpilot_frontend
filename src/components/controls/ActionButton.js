import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '0',
    margin: theme.spacing(0.5)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.darkLight
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main
    }
  }
}))

export default function ActionButton (props) {
  const { color, children, onClick } = props
  const classes = useStyles()

  return (
    <Button
      data-testid='actionButton'
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
