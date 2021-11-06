import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(60),
      height: theme.spacing(5),
    },
  },
}));

export default function Variants() {
  const classes = useStyles();
  const {name} = 29

  return (
    <div className={classes.root}>
      <Paper elevation={2}>
        
      </Paper>

    </div>
  );
}
