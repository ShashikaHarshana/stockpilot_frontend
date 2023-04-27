import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


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


export default function PaperGrid() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Grid container  align="center" spacing={3}>
          <Grid item xs={3}>
            <h1> name</h1>
          </Grid>
          <Grid item xs={3}>
            <h1> name</h1>
          </Grid>
          
        </Grid>
      </div>
    );
  }