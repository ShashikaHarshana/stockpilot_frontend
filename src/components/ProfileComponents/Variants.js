import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // border: '1px solid red',
    marginBottom: '1rem',
    padding: '0.75rem 1rem',
    width: '30rem',
    height: '1.5rem',
    borderRadius: 10,
    paddingLeft: '2rem'
  }
}))

function Variants ({ type, content }) {
  const classes = useStyles()
  return (
    <div>
      <Paper elevation={4} className={classes.paper}>
        <Grid
          container
          spacing={3}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid item sm={3}>
            <Typography>{type}</Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography>{content}</Typography>
          </Grid>
          <Grid item sm={3}>
            {/* <Button variant='text' color='secondary'>
              edit
            </Button> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Variants
