import React from 'react'
import { Button as MuiButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '30px',
    margin: '1rem 0',
    height: '50px'
  },
  label: { textTransform: 'capitalize', color: 'primary', fontSize: '1rem' }
}))

export default function Button (props) {
  const { variant, text, size, color, onClick, ...other } = props
  const classes = useStyles()
  return (
    <MuiButton
      classes={{ root: classes.root, label: classes.label }}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      sx={{ borderRadius: '30px' }}
      {...other}
    >
      {text}
    </MuiButton>
  )
}
