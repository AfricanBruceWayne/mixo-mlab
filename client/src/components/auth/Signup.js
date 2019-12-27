import React, { Component } from 'react';

import { BrowserRouter as Router, Route, useHistory , Switch } from 'react-router-dom';
import {
  Avatar, Button, Container, CssBaseline, TextField, CircularProgress,
  Typography, Link, Grid, Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import Home from '../../pages/Home';
import Login from './Login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©'} 
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

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() 
  {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated)
    {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) 
  {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
  
    const newUserData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.SignupUser(newUserData, this.props.history);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  render() {

    const { errors } = this.state;

    return (
      <Router>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                helperText={errors.username}
                value={this.state.username}
                error={errors.username ? true : false}
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                helperText={errors.email}
                value={this.state.email}
                error={errors.email ? true : false}
                onChange={this.handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="off"
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          { errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            disabled={ loading }
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? "Registering..." : "Sign Up"}
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
    </Switch>
  
    </Router>
  
    );
  }
}
  


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withStyles(styles))(Signup);