import { combineReducers } from 'redux';
import drinkReducer from './drinkReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
    drink:  drinkReducer,
    error:  errorReducer,
    auth:   authReducer,
    user:   userReducer
});