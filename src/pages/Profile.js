import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'

const Profile = () => {
  const handleClick = () => {}
  const { token } = useSelector(state => state.auth)

  return (
    <div>
      <NavBar />
      <h2>This is profile</h2>
      <h2>{token}</h2>
    </div>
  )
}

export default Profile
