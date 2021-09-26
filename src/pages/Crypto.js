import React from 'react'
import DesBox from '../components/graph/DesBox'
import TimeIndicatorBox from '../components/graph/TimeIndicatorBox'
import NavBar from '../components/NavBar'

const Crypto = () => {
  return (
    <div>
      <NavBar />
      <DesBox title={'BTC/USD'} />
      <TimeIndicatorBox />
    </div>
  )
}

export default Crypto
