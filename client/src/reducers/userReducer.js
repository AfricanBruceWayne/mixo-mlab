import { 
    USER_LOADED,
    USER_LOADING,
    LIKE_DRINK,
    UNLIKE_DRINK
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    favourites: [],
    credentials: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
        case LIKE_DRINK:
            return {
                ...state,
                favourites: [
                    ...state.favourites,
                    {
                        userHandle: state.credentials.handle,
                        drinkId: action.payload.drinkId
                    }
                ]     
            };
        case UNLIKE_DRINK:
            return {
                ...state,
                favourites: state.favourites.filter(
                    (like) => like.drinkId !== action.payload.drinkId
                )
            };
        default:
            return state;
    }
}