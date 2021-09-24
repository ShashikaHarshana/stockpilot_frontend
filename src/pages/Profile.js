import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const handleClick = () => {}

  const { mobile } = useSelector(state => state.page)

  return (
    <div>
      <h2>This is profile</h2>
      {mobile && <h3>mobile</h3>}
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

export default Profile
