import React, { useState } from 'react';

import { BrowserRouter as Router, Route, useHistory , Switch } from 'react-router-dom';
import {
  Avatar, Button, Container, CssBaseline, TextField, CircularProgress,
  Typography, Link, Grid, Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useDispatch } from 'react-redux';

import useStyles from '../../util/styles';

import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import { returnErrors } from '../../actions/errorActions';

import Home from '../Home';
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

export default function SignUp() {

  const classes = useStyles();

  const dispatch = useDispatch();

  const [userUsername, setUserUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const errors = useState({});

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      return returnErrors('Failed to create user: ' + msg, 401, null);
    }
    setLoading(true);
    const newUser = {
      userUsername,
      userEmail,
      userPassword
    };

    dispatch(registerUser(newUser, history));
  }

  function isFormValid() {
    return (
      userUsername == null || userUsername.length < 3 ||
      userEmail == null || !userEmail.includes('@') ||
      userPassword == null || userPassword.length < 6
    );
  }



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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                value={userUsername}
                error={errors.username ? true : false}
                autoFocus
                onChange={(e) => setUserUsername(e.target.value)}
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
                value={userEmail}
                error={errors.email ? true : false}
                onChange={(e) => setUserEmail(e.target.value)}
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
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
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

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};