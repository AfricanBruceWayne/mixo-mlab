import axios from 'axios';
import { 
    GET_DRINKS, ADD_DRINK, UPDATE_DRINK, DELETE_DRINK,
    DRINKS_LOADING, LOADING_DATA,
    LIKE_DRINK, UNLIKE_DRINK,
    SUBMIT_COMMENT,
    GET_ERRORS, CLEAR_ERRORS
 } from './types';
import { tokenConfig } from './authActions';
import { returnErrors, clearErrors } from './errorActions';

// Get All Drinks
export const getDrinks = () => (dispatch) => {
    dispatch(setDrinksLoading());
    axios
        .get('/api/cocktails')
        .then((res) => {
            dispatch({
                type: GET_DRINKS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
};

// Get A Drink
export const getDrink = (drinkId) => (dispatch) => {
    dispatch(setDrinksLoading());
    axios
        .get(`/api/cocktail/${drinkId}`)
        .then((res) => {
            dispatch({
                type: GET_DRINKS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
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
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Update A Drink
export const updateDrink = (drinkId)  = (dispatch, getState) => {
    axios
        .put(`/api/cocktails/${drinkId}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_DRINK,
                payload: id
            })
        })
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Delete A Drink
export const deleteDrink = id => (dispatch, getState) => {
    axios
        .delete(`/api/cocktails/${id}`, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: DELETE_DRINK,
                payload: id
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Favourite A Drink
export const likeDrink = (drinkId) => (dispatch) => {
axios
    .get(`/api/cocktail/${drinkId}/favourite`)
    .then((res) => {
    dispatch({
        type: LIKE_DRINK,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};

// Unfavourite A Drink
export const unlikeDrink = (drinkId) => (dispatch) => {
axios
    .get(`/api/cocktail/${cocktailId}/unfavourite`)
    .then((res) => {
    dispatch({
        type: UNLIKE_DRINK,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};

  // Submit a comment
  export const submitComment = (drinkId, commentData) => (dispatch) => {
    axios
      .post(`/api/cocktail/${drinkId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
  
export const setDrinksLoading = () => {
    return {
        type: DRINKS_LOADING
    };
};