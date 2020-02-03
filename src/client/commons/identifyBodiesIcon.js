import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

const useStyles = makeStyles(theme => ({
  root: {
    border:0,
  },
}));

export default function IdentifyBodies(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton color="secondary" onClick= {props.onClick()}>
        <TrackChangesIcon/>
      </IconButton>
    </div>
  );
}
