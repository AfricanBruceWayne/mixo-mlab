import axios from 'axios';
import { 
    GET_DRINKS,
    ADD_DRINK,
    DELETE_DRINK,
    DRINKS_LOADING
 } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getDrinks = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/drinks')
        .then(res =>
        dispatch({
            type: GET_DRINKS,
            payload: res.data
        })
        )
        .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addDrink = drink => (dispatch, getState) => {
    axios
        .post('/api/drinks', drink, tokenConfig(getState))
        .then(res =>
            dispatch({
            type: ADD_DRINK,
            payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteDrink = id => (dispatch, getState) => {
    axios
        .delete(`/api/drinks/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
            type: DELETE_DRINK,
            payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
  
export const setDrinksLoading = () => {
    return {
        type: DRINKS_LOADING
    };
};