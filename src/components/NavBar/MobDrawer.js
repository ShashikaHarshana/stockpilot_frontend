import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles({
  list: {
    border: '1px solid red'
  },
  listIcon: {
    marginRight: -20
  }
})

const MobDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(true)
  const classes = useStyles()

  const handleOpenDrawer = () => {}
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>drawer</Button>
      <Drawer onClose={handleCloseDrawer} open={openDrawer} anchor='right'>
        <List className={classes.list}>
          <ListItem button>
            <ListItemIcon className={classes.listIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.listIcon}></ListItemIcon>
            <ListItemText>Stock</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.listIcon}></ListItemIcon>
            <ListItemText>Crypto</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </>
  )
}

export default MobDrawer
