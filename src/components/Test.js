import React, { useState } from 'react'

import {
  Backdrop,
  Button,
  CircularProgress,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  h1: {
    fontSize: props => (props.open ? '10rem' : '1rem')
  }
})

const Test = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles({ open })

  return (
    <div>
      <h1 className={classes.h1}>test....</h1>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        open backdrop
      </Button>
      <Backdrop
        open={open}
        onClick={() => {
          setOpen(false)
        }}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  )
}

export default Test
