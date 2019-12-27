import React, { useState } from 'react';

import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom';

import {
  Avatar, Button, Container, CssBaseline, TextField, CircularProgress,
  Typography, Link, Grid, Box 
} from '@material-ui/core' ;
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from '../../util/styles';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { returnErrors } from '../../actions/errorActions';

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



export default function SignIn() {
  
  const classes = useStyles();

  SignIn.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const errors = useState({});

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) { 
      return returnErrors('Failed to login user: ' + msg, 401, null);
    }
    setLoading(true);
    const loginData = {
      userEmail,
      userPassword
    };
    dispatch(loginUser(loginData, history));
  }

  function isFormValid() {
    return (
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
          Log in
        </Typography>
        <Typography component="h6" variant="h6">
        </Typography>
        <form className={classes.form} noValidate
          onSubmit = {handleSubmit}>
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
            value = { userEmail }
            error={errors.userEmail ? true : false}
            onChange = {(e) => setUserEmail(e.target.value)}
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
            value = { userPassword }
            error={errors.password ? true : false}
            onChange = {(e) => setUserPassword(e.target.value)}
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

