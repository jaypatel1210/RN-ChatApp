import firestore from '@react-native-firebase/firestore';
import {GET_ALL_MSGS, SEND_MSG} from './action.types';

export const getAllMsgs = msgThreadId => async dispatch => {
  console.log(`/messages/${msgThreadId}/chat/`);
  firestore()
    .collection(`/messages/${msgThreadId}/chat/`)
    .orderBy('created', 'desc')
    .onSnapshot(
      res => {
        const data = res.docs.map(doc => doc.data());
        console.log(data);
        dispatch({
          type: GET_ALL_MSGS,
          payload: data,
        });
      },
      err => {
        console.log(`ERR => ${err}`);
      },
    );
};

export const sendMsg = (msgThreadId, data) => async dispatch => {
  firestore()
    .collection(`messages`)
    .doc(`${msgThreadId}`)
    .collection('chat')
    .add(data)
    .catch(err => console.log(`MSG SEND ERR => ${err}`));
};
