import axios from 'axios';
import { 
    SET_USER, LOADING_USER,
    SET_ERRORS, CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    MARK_NOTIFICATIONS_READ
} from '../types';
import { getUserData } from './drinkActions';

// Check token & load user
export const getUserData = () => (dispatch) => {
    // User loading
    dispatch({ type: LOADING_USER });
    axios
        .get('/api/auth/user')
        .then((res) => {
          dispatch({
            type: SET_USER,
            payload: res.data
          });
        })
        .catch((err) => console.log(err));
};

// Register User
export const registerUser = (newUserData, history) => (dispatch) => {
  
    dispatch({ type: LOADING_UI });
    axios
      .post('/api/users/register', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
};
  
// Login User
export const loginUser = ( userData, history) => (dispatch) => {
    
  dispatch({ type: LOADING_UI }); 
    axios
      .post('/api/auth/login', userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
// Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
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

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/api/auth/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/api/auth/user/edit', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/api/auth/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};