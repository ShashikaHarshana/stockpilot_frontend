import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Bitcoin from '../../svgs/drawer/bitcoin.svg'
import stock from '../../svgs/drawer/stock.svg'
import home from '../../svgs/drawer/home.svg'
import logout from '../../svgs/drawer/logout.svg'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import profilePic from '../../svgs/profilePic.png'
import { Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/ducks/auth'

const useStyles = makeStyles({
  root: {
    width: '100vw'
  },
  list: {
    width: '50vw'
  },
  listIcon: {
    marginRight: -10
  },
  bitcoin: {
    height: 20,
    width: 20
  }
})

const MobDrawer = ({ openDrawer, setOpenDrawer }) => {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleClick = () => {
    dispatch(logOut())
    history.push('/sign_in')
  }

  return (
    <>
      <Drawer
        onClose={handleCloseDrawer}
        open={openDrawer}
        anchor='right'
        className={classes.root}
      >
        <List className={classes.list}>
          {isLoggedIn ? (
            <>
              <ListItem component={Link} to='/sign_in'>
                <Avatar
                  src={profilePic}
                  style={{ margin: '0 auto', height: '70px', width: '70px' }}
                  component={Link}
                  to='/profile'
                ></Avatar>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem component={Link} to='/sign_in'>
                <Button style={{ margin: '0 auto' }}>Log in</Button>
              </ListItem>

              <ListItem component={Link} to='/sign_up'>
                <Button variant='contained' color='secondary' fullWidth>
                  sign Up
                </Button>
              </ListItem>
            </>
          )}
          <ListItem button component={Link} to='/'>
            <ListItemIcon className={classes.listIcon}>
              <img src={home} className={classes.bitcoin} />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/analyze/${'stock'}`}>
            <ListItemIcon className={classes.listIcon}>
              <img src={stock} className={classes.bitcoin} />
            </ListItemIcon>
            <ListItemText>Stock</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/analyze/${'crypto'}`}>
            <ListItemIcon className={classes.listIcon}>
              <img className={classes.bitcoin} src={Bitcoin} />
            </ListItemIcon>
            <ListItemText>Crypto</ListItemText>
          </ListItem>
          {isLoggedIn && (
            <>
              <ListItem button onClick={handleClick} component={Link} to='/'>
                <ListItemIcon className={classes.listIcon}>
                  <img className={classes.bitcoin} src={logout} />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </ListItem>
            </>
          )}
          <Divider />
        </List>
      </Drawer>
    </>
  )
}

export default MobDrawer

// <ListItem button component={Link} to='/profile'>
//   <ListItemIcon className={classes.listIcon}>
//     <img className={classes.bitcoin} src={profile} />
//   </ListItemIcon>
//   <ListItemText>Profile</ListItemText>
// </ListItem>
