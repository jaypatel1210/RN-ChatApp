import {
  IS_AUTHENTICATED,
  IS_CREATED,
  IS_LOADING,
  SET_USER,
} from '../action/action.types';

const initialState = {
  user: null,
  isAuthenticated: null,
  created: true,
  isLoading: true,
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
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
