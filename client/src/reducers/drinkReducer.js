import {
    GET_DRINKS,
    GET_DRINK,
    ADD_DRINK,
    UPDATE_DRINK,
    DELETE_DRINK,
    DRINKS_LOADING,
    LIKE_DRINK,
    UNLIKE_DRINK,
    SUBMIT_COMMENT
} from '../actions/types';

const initialState = {
    drinks: [],
    drink: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case DRINKS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_DRINKS:
        return {
          ...state,
          drinks: action.payload,
          loading: false
        };
      case GET_DRINK:
        return {
          ...state,
          drink: action.payload
        }
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
      case UPDATE_DRINK:
        return {
          ...state,
          drinks: state.drinks.filter(drink => drink._id !== action.payload)
        };
     
      case LIKE_DRINK:
      case UNLIKE_DRINK:
        let index = state.drinks.findIndex(
          (drink) => drink.drinkId === action.payload.drinkId
        );
        state.drinks[index] = action.payload;
        if (state.drink.drinkId === action.payload.drinkId) {
          state.drink = action.payload;
        } 
        return {
          ...state
        };
      case SUBMIT_COMMENT: 
        return {
          ...state,
          drink: {
            ...state.drink,
            comments: [action.payload, ...state.drink.comments]
          }
        };
      default:
        return state;
    }
  }