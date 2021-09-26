import React from 'react'
import { useParams } from 'react-router'
import DesBox from '../components/graph/DesBox'
import TimeIndicatorBox from '../components/graph/TimeIndicatorBox'
import NavBar from '../components/NavBar'

const SingleMarket = () => {
  const { title } = useParams()

  return (
    <div>
      <NavBar />
      <DesBox title={title} />
      <TimeIndicatorBox />
    </div>
  )
}

export default SingleMarket
