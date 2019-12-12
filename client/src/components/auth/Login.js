import React, { useState } from 'react';

import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom';

import {
  Avatar, Button, Container, CssBaseline, TextField, 
  Typography, makeStyles, Link, Grid, Box 
} from '@material-ui/core' ;
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import PropTypes from 'prop-types';

import { Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors, returnErrors } from '../../actions/errorActions';

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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) { 
      returnErrors(msg);
      return; 
    }

    // dispatch(login(userEmail, userPassword));
    // clearErrors();
    const loginUser = {
      userEmail,
      userPassword
    };
    console.log(loginUser);
    history.push("/");
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
            value = { userEmail }
            onChange = {(e) => setUserEmail(e.target.value)}
          />
          <TextField
            variant = "outlined"
            margin = "normal"
            required
            fullWidth
            name = "password"
            value = { userPassword }
            label = "Password"
            type = "password"
            id = "password"
            autoComplete = "current-password"
            onChange = {(e) => setUserPassword(e.target.value)}
          />
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
          </Button>
          <Grid container justify="center">
            <Grid item>
              {/* Error Message */}
            </Grid>
          </Grid>
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

