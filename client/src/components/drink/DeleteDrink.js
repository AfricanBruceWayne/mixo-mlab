import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import MyButton from '../../util/MyButton';

// MUI Stuff
import { Button, Dialog, DialogTitle, DialogActions, withStyles } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteDrink } from '../../actions/drinkActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class DeleteDrink extends Component {

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteDrink = () => {
    this.props.deleteDrink(this.props.drinkId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Drink"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this drink ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteDrink} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteDrink.propTypes = {
  deleteDrink: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  drinkId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteDrink }
)(withStyles(styles)(DeleteDrink));