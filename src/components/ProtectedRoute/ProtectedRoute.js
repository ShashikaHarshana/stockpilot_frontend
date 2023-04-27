import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component data-testid="component"/>
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
