import React from 'react';
import classes from './Backdrop.css';

const backDrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backDrop;
