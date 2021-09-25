import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Chart from '../components/Chart'
import NavBar from '../components/NavBar'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import DesBox from '../components/graph/DesBox'
import TimeIndicatorBox from '../components/graph/TimeIndicatorBox'

const useStyles = makeStyles({})

const Graph = () => {
  return (
    <div>
      <NavBar />
      <DesBox />
      <TimeIndicatorBox />
      {/* <Chart /> */}
    </div>
  )
}

export default Graph
