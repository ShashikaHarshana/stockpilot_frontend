import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ImageAvatars from './ImageAvatars';
import VerticalTabs from './TabPanel';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container  align="center" spacing={3}>
        <Grid item xs={2}>
          <div style={{marginTop: '-10px'}}>
            <ImageAvatars />
          </div>
        </Grid>
        <Grid item xs={10}>
          <VerticalTabs />
        </Grid>
        
      </Grid>
    </div>
  );
}


