import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import MyButton from '../../util/MyButton';

// MUI Stuff
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux stuff
import { connect } from 'react-redux';
import { addDrink, clearErrors } from '../../redux/actions/drinkActions';

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

class PostDrink extends Component {
  
  state = {
    open: false,
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDrink({ body: this.state.body });
  };

  render() {

    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Drink!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Add a new drink</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Drink!!"
                multiline
                rows="3"
                placeholder="Drink at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDrink.propTypes = {
  addDrink: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { addDrink, clearErrors }
)(withStyles(styles)(PostDrink));