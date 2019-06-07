import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Aux>
    <Backdrop clicked={props.modalClosed} show={props.show} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>
);

// Checking if the show property of the state changed to re-render the modal

function areEqual(prevProps, nextProps) {
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
  // if true, do not render
}

export default React.memo(modal, areEqual);
