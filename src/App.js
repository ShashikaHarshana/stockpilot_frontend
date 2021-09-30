import './App.css'
import Home from './pages/Home'
import { CssBaseline } from '@material-ui/core'

import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import ErrorPage from './pages/ErrorPage'
import theme from './utils/theme'

import { Button, Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'

import MobDrawer from './components/NavBar/MobDrawer'
import WatchList from './pages/WatchList'
import SingleMarket from './components/SingleMaret'
import Footer from './components/Footer'
import CryptoChart from './components/CryptoChart'
import DropdownSelect from './components/chartDropdown/DropdownSelect'
import DropDownSelectExt from './components/chartDropdown/DropDownSelectExt'
import SelectMarket from './components/chartDropdown/SelectMarket'
import Test from './components/Test'
import Loading1 from './components/Loading/Loading1'
import {useDispatch, useSelector} from "react-redux";
import {initializeDataRequest} from "./redux/ducks/chart";
import {useEffect} from "react";
import FullPageLoader from "./components/Loading/FullPageLoader";


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
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.chart.isLoading)
  useEffect(() => {
    dispatch(initializeDataRequest())
  }, [])

    return (
        <Router>
          <ThemeProvider theme={theme}>
            <Container className={classes.container}>
              <Switch>
                <Route exact path='/'>
                  <Home/>
                </Route>
                <Route exact path='/sign_up'>
                  <SignUp/>
                </Route>
                <Route exact path='/sign_in'>
                  <SignIn/>
                </Route>
                <Route exact path='/profile'>
                  <Profile/>
                </Route>
                <Route exact path='/watchList'>
                  <WatchList/>
                </Route>
                <Route exact path='/analyze/:type'>
                  {isLoading ? <FullPageLoader /> : <SingleMarket/> }
                </Route>
                <Route exact path='*'>
                  <ErrorPage/>
                </Route>
              </Switch>
            </Container>
          </ThemeProvider>
        </Router>
    )
}

export default App
