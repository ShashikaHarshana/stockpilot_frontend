import React, { useState } from 'react'
import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery
} from '@material-ui/core'
import { useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../../svgs/signUp/logo.svg'
import { makeStyles } from '@material-ui/core'
import profilePic from '../../svgs/profilePhoto.png'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/styles'
import MobDrawer from './MobDrawer'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/ducks/auth'
import Popup from '../controls/Popup'
// import notifications from './../../utils/data'

import NotificationModal from '../Notifications/NotificationModal'

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
    // border: '1px solid red',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#222'
    },
    transition: 'all 0.5s ease',
    // marginRight: 'calc(30px*0.8)'
    marginRight: 0
  },
  signupBtn: {
    borderRadius: '40px',
    padding: '5px 25px',
    marginLeft: '10px'
  },
  img: {
    height: 'calc(37px*0.8)',
    width: 'calc(250px*0.8)',
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
    display: props => (props.open ? 'none' : null),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }

    // display: props => (props.open ? 'none' : 'flex'),
  },
  searchIcon: {
    // display: props => (props.open ? 'none' : 'flex')
  },
  signUpTab: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles({ open, mobile })
  // console.log(mobile)
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  const [openPopup, setOpenPopup] = useState(false)
  // const { notifications } = useSelector(state => state.notifications)

  const history = useHistory()

  // const handleDelete = time => {
  //   let tempNotifications = newNotifications.filter(item => item[0] !== time)
  //   setNewNotifications(tempNotifications)
  // }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    handleClose()
    dispatch(logOut())
    history.push('/')
  }

  const { brands } = useSelector(state => state.watchlist)

  return (
    <div>
      <MobDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
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
              data-testid='home'
            >
              Home
            </Button>
            <Button
              variant='text'
              label='Stock'
              component={Link}
              to={`/analyze/stock`}
              className={classes.tabBtn}
              data-testid='stock'
            >
              Stock
            </Button>
            <Button
              variant='text'
              label='Cripto'
              component={Link}
              to={`/analyze/crypto`}
              className={classes.tabBtn}
              data-testid='crypto'
            >
              crypto
            </Button>
          </Grid>

          {/* <Grid item className={classes.search}>
            <SearchBox open={open} setOpen={setOpen} />
          </Grid> */}
          <div className={classes.searchIcons}>
            <div style={{ display: 'flex' }}>
              {/* <SearchIcon
                style={{ marginRight: '10px', color: '#A6A4A4' }}
                onClick={() => setOpen(true)}
                className={classes.searchIcon}
              /> */}

              <MenuIcon
                onClick={() => setOpenDrawer(true)}
                className={classes.searchIcon}
              />
            </div>
          </div>

          <Grid item className={classes.signUpTab}>
            {isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to='/watchList'
                  variant='text'
                  className={classes.logBtn}
                  data-testid='watchlist'
                >
                  Watch List
                </Button>
                {/*<IconButton*/}
                {/*  onClick={() => setOpenPopup(true)}*/}
                {/*  style={{ marginRight: '10px' }}*/}
                {/*  data-testid="notifs"*/}
                {/*>*/}
                {/*  <Badge*/}
                {/*    badgeContent={notifications ? notifications.length : 0}*/}
                {/*    color='secondary'*/}
                {/*  >*/}
                {/*    <MailIcon />*/}
                {/*  </Badge>*/}
                {/*</IconButton>*/}
                <div>
                  <Avatar
                    alt='profile pic'
                    src={profilePic}
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                    data-testid="profilePic"
                  >
                    Open Menu
                  </Avatar>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    data-testid="openMenu"
                  >
                    <MenuItem
                      component={Link}
                      to='/profile'
                      onClick={handleClose}
                      data-testid='profile'
                    >
                      My account
                    </MenuItem>
                    <MenuItem data-testid='logout' onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  className={classes.logBtn}
                  to='/sign_in'
                  variant='text'
                  data-testid='signin'
                >
                  Log In
                </Button>
                <Button
                  className={classes.signupBtn}
                  component={Link}
                  to='/sign_up'
                  variant='contained'
                  color='secondary'
                  data-testid='signup'
                >
                  Sign Up
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {/*<Popup*/}
      {/*  title='Notifications'*/}
      {/*  openPopup={openPopup}*/}
      {/*  setOpenPopup={setOpenPopup}*/}
      {/*>*/}
      {/*  <NotificationModal />*/}
      {/*</Popup>*/}
    </div>
  )
}

export default NavBar
