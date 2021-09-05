import {createStore, applyMiddleware} from 'redux';
import mainReducer from './reducer';

import thunk from 'redux-thunk';
const middleWare = [thunk];
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
