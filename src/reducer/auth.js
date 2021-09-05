import {IS_AUTHENTICATED, SET_USER} from '../action/action.types';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};
