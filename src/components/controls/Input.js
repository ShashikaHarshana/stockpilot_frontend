import React from 'react'
import { alpha, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      boxShadow: `3px 3px 5px ${alpha('#000000', 0.16)}`
    }
  }
})

export default function Input (props) {
  const classes = useStyles()
  const { name, label, value, onChange, error = null, ...other } = props
  return (
    <TextField
      className={classes.root}
      autoComplete='false'
      variant='outlined'
      size='small'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
