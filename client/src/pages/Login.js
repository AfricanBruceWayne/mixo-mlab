import React, { Component } from 'react';

import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';

// MUI Stuff
import {
  Avatar, Button, Container, CssBaseline, TextField, CircularProgress,
  Typography, Link, Grid, Box, withStyles 
} from '@material-ui/core' ;

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Mixo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  ...theme
});

class SignIn extends Component {
  
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData, this.props.history);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  render() {
    
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}> 
        <Grid item sm />
        <Grid item sm>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Typography component="h6" variant="h6">
              </Typography>
              <form className={classes.form} noValidate
                onSubmit = {this.handleSubmit}>
                <TextField
                  type = "email"
                  variant = "outlined"
                  margin = "normal"
                  required
                  fullWidth
                  id = "email"
                  label = "Email Address"
                  name = "email"
                  autoComplete = "email"
                  autoFocus
                  helperText={errors.email}
                  value = { this.state.name }
                  error={errors.email ? true : false}
                  onChange = {this.handleChange}
                />
                <TextField
                  variant = "outlined"
                  margin = "normal"
                  fullWidth
                  name = "password"
                  label = "Password"
                  type = "password"
                  id = "password"
                  helperText={errors.password}
                  value = { this.state.name }
                  error={errors.password ? true : false}
                  onChange = { this.handleChange }
                />
                  { errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                  )}
                <Button
                  type ="submit"
                  disabled = { loading }
                  block = { true }
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {loading ? "Logging in.." : "Sign In"}
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
                <br />
                <Grid container>
                  <Grid item xs>
                    <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignIn));