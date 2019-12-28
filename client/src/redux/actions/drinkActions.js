import axios from 'axios';
import { 
    GET_DRINKS, GET_DRINK, ADD_DRINK, UPDATE_DRINK, DELETE_DRINK,
    LOADING_DATA, LOADING_UI, STOP_LOADING_UI,
    LIKE_DRINK, UNLIKE_DRINK,
    SUBMIT_COMMENT,
    SET_ERRORS, CLEAR_ERRORS
 } from '../types';

import { tokenConfig } from './userActions';

// Get All Drinks
export const getDrinks = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/api/cocktails')
        .then((res) => {
            dispatch({
                type: GET_DRINKS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_DRINKS,
                payload: []
            });
        });
};

// Get A Drink
export const getDrink = (drinkId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/api/cocktail/${drinkId}`)
        .then((res) => {
            dispatch({
                type: GET_DRINK,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};

// Add New Drink
export const addDrink = (newDrink) => (dispatch, getState) => {
    axios
        .post('/api/cocktails', newDrink, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_DRINK,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Update A Drink
export const updateDrink = (drinkId)  = (dispatch, getState) => {
    axios
        .put(`/api/cocktails/${drinkId}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_DRINK,
                payload: drinkId
            })
        })
        .catch((err) => console.log(err));
};

// Delete A Drink
export const deleteDrink = (drinkId) => (dispatch, getState) => {
    axios
        .delete(`/api/cocktails/${drinkId}`, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: DELETE_DRINK,
                payload: drinkId
            });
        })
        .catch((err) => console.log(err));
};

// Favourite A Drink
export const likeDrink = (drinkId) => (dispatch, getState) => {
axios
    .get(`/api/cocktail/${drinkId}/favourite`, tokenConfig(getState))
    .then((res) => {
    dispatch({
        type: LIKE_DRINK,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};

// Unfavourite A Drink
export const unlikeDrink = (drinkId) => (dispatch, getState) => {
axios
    .get(`/api/cocktail/${drinkId}/unfavourite`, tokenConfig(getState))
    .then((res) => {
    dispatch({
        type: UNLIKE_DRINK,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};

  // Submit a comment
export const submitComment = (drinkId, commentData) => (dispatch, getState) => {
    axios
        .post(`/api/cocktail/${drinkId}/comment`, commentData, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};
  
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: GET_DRINKS,
          payload: res.data.drinks
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DRINKS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };