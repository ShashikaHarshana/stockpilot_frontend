import { AppBar, Button, Grid, Tabs, Toolbar, Tab } from '@material-ui/core'
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../../svgs/home/stockPilot.svg'
import SearchBox from './SearchBox'
import { makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: 'none',
    marginTop: '22px',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    }
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  linkContainer: {
    transform: 'translateX(calc(150px*0.8))',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  singUpTab: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  tabBtn: {
    marginLeft: 'calc(40px*0.8)',
    transition: 'all 0.5s ease',
    color: '#707070',

    padding: '5px 5px',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#222'
    }
  },
  logBtn: {
    color: '#707070',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#222'
    },
    transition: 'all 0.5s ease',
    marginRight: 'calc(30px*0.8)'
  },
  signupBtn: {
    borderRadius: '40px',
    padding: '5px 25px'
  },
  img: {
    height: 'calc(37px*0.8)',
    width: 'calc(178px*0.8)',
    [theme.breakpoints.down('sm')]: {
      height: '25px',
      width: '120px'
    }
  },
  search: {
    transform: 'translateX(65px)',
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(0)',
      width: '70%'
    }
  },
  searchIcons: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
    // display: props => (props.open ? 'none' : 'flex'),
  },
  searchIcon: {
    display: props => (props.open ? 'none' : 'flex')
  }
}))

const NavBar = () => {
  const [open, setOpen] = useState(false)

  const classes = useStyles({ open })

  return (
    <div>
      <AppBar position='static' elevation={0} className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolBar}>
          <Grid item component={Link} to='/'>
            <img src={logo} className={classes.img} alt='Stockpilot' />
          </Grid>
          <Grid item className={classes.linkContainer}>
            <Button
              variant='text'
              disableRipple
              label='Home'
              component={Link}
              to='/'
              className={classes.tabBtn}
            >
              Home
            </Button>
            <Button
              variant='text'
              label='Stock'
              component={Link}
              to='/'
              className={classes.tabBtn}
            >
              Stock
            </Button>
            <Button
              variant='text'
              label='Cripto'
              component={Link}
              to='/graph'
              className={classes.tabBtn}
            >
              crypto
            </Button>
          </Grid>
          <Grid item className={classes.search}>
            <SearchBox open={open} setOpen={setOpen} />
          </Grid>
          <div style={{ display: 'flex' }} className={classes.searchIcons}>
            <SearchIcon
              style={{ marginRight: '10px', color: '#A6A4A4' }}
              onClick={() => setOpen(true)}
              className={classes.searchIcon}
            />
            <MenuIcon className={classes.searchIcon} />
          </div>
          <Grid item className={classes.singUpTab}>
            <Button
              component={Link}
              className={classes.logBtn}
              to='/sign_in'
              variant='text'
            >
              Log In
            </Button>
            <Button
              className={classes.signupBtn}
              component={Link}
              to='/sign_up'
              variant='contained'
              color='secondary'
            >
              Sign Up
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
