import {IS_AUTHENTICATED, IS_CREATED, SET_USER} from '../action/action.types';

const initialState = {
  user: null,
  isAuthenticated: false,
  created: true,
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

    case IS_CREATED:
      return {
        ...state,
        created: action.payload,
      };

    default:
      return state;
  }
};
