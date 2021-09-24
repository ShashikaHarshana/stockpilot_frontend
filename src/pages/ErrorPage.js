import { Button } from '@material-ui/core'

import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <h2>404 error...</h2>
      <Button component={Link} to='/'>
        back to home
      </Button>
    </div>
  )
}

export default ErrorPage
