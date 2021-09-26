import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link, useParams } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 250
  },
  title: {
    marginBottom: '1rem'
  }
})

export default function DesCard ({ title }) {
  const price = 1000
  //   const title = 'BBTC'
  const classes = useStyles()

  return (
    <Card elevation={4} className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant='h4'>
          {title}
        </Typography>
        <Typography className={classes.typo} variant='subtitle1' component='p'>
          price : <span style={{ color: '#00544f' }}>${price}</span>
        </Typography>
        <Typography variant='subtitle1' component='p'>
          high : <span style={{ color: '#00544f' }}>0.556</span>
        </Typography>
        <Typography variant='subtitle1' component='p'>
          low : <span style={{ color: '#00544f' }}>0.45416</span>
        </Typography>

        <Typography variant='subtitle1' component='p'>
          Change : <span style={{ color: '#00544f' }}>0.222</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/crypto/${title}`} color='secondary'>
          Analyze
        </Button>
      </CardActions>
    </Card>
  )
}
