import {
    GET_DRINKS,
    ADD_DRINK,
    DELETE_DRINK,
    DRINKS_LOADING
} from '../actions/types';

const initialState = {
    drinks: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_DRINKS:
        return {
          ...state,
          drinks: action.payload,
          loading: false
        };
      case DELETE_DRINK:
        return {
          ...state,
          drinks: state.drinks.filter(drink => drink._id !== action.payload)
        };
      case ADD_DRINK:
        return {
          ...state,
          drinks: [action.payload, ...state.drinks]
        };
      case DRINKS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }