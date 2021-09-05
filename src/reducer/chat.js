import {GET_ALL_MSGS} from '../action/action.types';

const initialState = {
  msgs: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MSGS:
      return {
        ...state,
        msgs: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
