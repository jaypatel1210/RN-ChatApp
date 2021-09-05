import firestore from '@react-native-firebase/firestore';
import {ALL_USERS, ERROR_USERS} from './action.types';

export const allUsers = uid => async dispatch => {
  firestore()
    .collection('users')
    .orderBy('created', 'desc')
    .onSnapshot(
      res => {
        const data = res.docs.map(doc => doc.data());
        dispatch({
          type: ALL_USERS,
          payload: data,
        });
      },
      err => {
        dispatch({
          type: ERROR_USERS,
        });
      },
    );
};
