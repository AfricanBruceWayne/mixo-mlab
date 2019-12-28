import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_DRINK,
    UNLIKE_DRINK,
    MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
            ...state,
            authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_DRINK:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        drinkId: action.payload.drinkId
                    }
                ]     
            };
        case UNLIKE_DRINK:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.drinkId !== action.payload.drinkId
                )
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not) => (not.read = true));    
            return {
                ...state
            };
        default:
            return state;
    }
}