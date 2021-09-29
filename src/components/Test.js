import React, { useState } from 'react'

import {
  Backdrop,
  Button,
  CircularProgress,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({})

const Test = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  return (
    <div>
      <h1>test....</h1>
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
