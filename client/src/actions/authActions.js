import axios from 'axios';

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        ).catch((err) => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            });
        });
};

// Register User
export const registerUser = ({ newUserData, history }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ newUserData });
  
    axios
      .post('/api/users/register', body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data
        });
      });
  };
  
// Login User
export const loginUser = ({ userData, history}) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
// Request body
const body = JSON.stringify({ userData });
  
    axios
      .post('/api/auth/login', body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data
        });
      });
  };
  
// Logout User
export const logoutUser = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};
  
// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
};