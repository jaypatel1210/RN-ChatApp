import {combineReducers} from 'redux';
import auth from './auth';
import users from './users';
import chat from './chat';

export default combineReducers({
  auth,
  users,
  chat,
});
