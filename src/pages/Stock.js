import React from 'react'
import DesBox from '../components/graph/DesBox'
import TimeIndicatorBox from '../components/graph/TimeIndicatorBox'
import NavBar from '../components/NavBar'

const Stock = () => {
  return (
    <div>
      <NavBar />
      <DesBox title={'APPl'} />
      <TimeIndicatorBox />
    </div>
  )
}

export default Stock
