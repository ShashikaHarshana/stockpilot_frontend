import './App.css'
import Home from './pages/Home'
import { CssBaseline } from '@material-ui/core'

import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Graph from './pages/Graph'
import ErrorPage from './pages/ErrorPage'
import theme from './utils/theme'
import NavBar from './components/NavBar'
import { Button, Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 'calc(1394px*0.8)',
    [theme.breakpoints.down('sm')]: {
      width: '95vw'
    }
  }
}))

function App () {
  const classes = useStyles()
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container className={classes.container}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/sign_up'>
              <SignUp />
            </Route>
            <Route exact path='/sign_in'>
              <SignIn />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>

            <Route exact path='/graph'>
              <Graph />
            </Route>
            <Route exact path='*'>
              <ErrorPage />
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
      {/* // 
    
    //     
    //     <Switch>
    //       <Route exact path='/'>
    //         <Home />
    //       </Route>
    //       <Route exact path='/profile'>
    //         <Profile />
    //       </Route>

    //       

    //       <Route exact path='/Sign_up'>
    //         <SignUp />
    //       </Route>

    //       <Route exact path='/graph'>
    //         <Graph />
    //       </Route>

    //       <Route exact path='*'>
    //         <ErrorPage />
    //       </Route>
    //     </Switch> */}
    </Router>
  )
}

export default App
