import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Variants from './Variants'
import ReactPlayer from 'react-player'
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'

// import Notification from './Notification'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 150
  },
  tabs: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  tab: {
    alignContent: 'left'
  },
  cnt: {
    marginLeft: theme.spacing(5),
    marginTop: '-3rem'
  },
  cntt: {
    marginLeft: theme.spacing(5),
    height: theme.spacing(30),
    width: theme.spacing(50)
  },
  custom: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'left',
    marginBottom: 15
  }
}))

export default function VerticalTabs () {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState(true)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const toggleChecked = () => {
    setChecked(prev => !prev)
  }
  const { token } = useSelector(state => state.auth)
  console.log(token)

  const decoded = jwt_decode(token)
  console.log(decoded)

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab className={classes.tab} label='General' {...a11yProps(0)} />
        <Tab label='Notifications' {...a11yProps(1)} />
        <Tab label='Learn' {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className={classes.cnt}>
          <Typography className={classes.custom}>General</Typography>
          <Variants
            type={'Name'}
            content={`${decoded.user_data.first_name} ${decoded.user_data.last_name}`}
          />
          <Variants type={'Email'} content={decoded.user_data.email} />
          {/* <Variants type={'Address'} /> */}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.cnt}>
          <Typography className={classes.custom}>Notifications</Typography>
          <FormGroup>
            <FormControlLabel
              label='Enable Notifications'
              labelPlacement='start'
              control={<Switch checked={checked} onChange={toggleChecked} />}
            />
          </FormGroup>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.cnt}>
          <Typography className={classes.custom}>Learn</Typography>
          <Typography
            // className={classes.custom}
            style={{
              fontSize: 20,
              textAlign: 'left',
              marginBottom: 30
            }}
          >
            Learn Crypto Currencies !!!
          </Typography>
          <ReactPlayer
            width='100%'
            height='100%'
            marginBottom='10px'
            url='https://www.youtube.com/watch?v=PUTtgPEnDSI'
          />
        </div>
      </TabPanel>
    </div>
  )
}
