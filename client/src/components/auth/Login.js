import React, { Component } from 'react';

import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom';

import {
  Avatar, Button, Container, CssBaseline, TextField, CircularProgress,
  Typography, Link, Grid, Box, withStyles 
} from '@material-ui/core' ;
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import SignUp from './Signup';

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

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  useStyles();

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };


  handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      userEmail,
      userPassword
    };
    this.props.loginUser(loginData, this.props.history);
  }
  
  render() {
    return (
      <Router>
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
  
      <Switch>
          <Route path="/register" component={ SignUp } />
      </Switch>
  
      </Router>
    );
  }  
}

const mapStateToProps = {
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
}

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(withStyles(styles))(SignIn);