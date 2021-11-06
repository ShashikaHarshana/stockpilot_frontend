import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import DesCard from '../components/graph/DesCard'
import NavBar from '../components/NavBar'
import { makeStyles } from '@material-ui/core'

const data = [{ title: 'btc' }, { title: 'aapl' }]

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem'
    }
  },
  title: {
    marginTop: '1rem',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 25
    }
  }
}))

const Crypto = () => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Typography variant='h4' className={classes.title}>
        Available Stock
      </Typography>
      <Grid className={classes.container} container spacing={5}>
        {data.map((item, index) => (
          <Grid item md={3} xs={12} key={index}>
            <DesCard title={item.title} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Crypto
