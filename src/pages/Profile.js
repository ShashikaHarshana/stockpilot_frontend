import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
// import VerticalTabs from '../components/TabPanel'
// import ImageAvatars from '../components/ImageAvatars'
import CenteredGrid from '../components/ProfileComponents/CenteredGrid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Profile = () => {
  const handleClick = () => {}
  const classes = useStyles()
  return (
    <>
      <NavBar />
      <CenteredGrid />
    </>
  )
}

export default Profile
