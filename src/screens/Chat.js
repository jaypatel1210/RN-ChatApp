import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import {getAllMsgs, sendMsg} from '../action/chat';

import ChatMessage from '../components/ChatMessage';

const Chat = ({route, userDetails, msgDetails, getAllMsgs, sendMsg}) => {
  const [msg, setMsg] = useState('');
  const [height, setHeight] = useState(0);
  const scrollViewRef = useRef();

  const {rUID} = route.params;

  const threadID =
    userDetails.uid > rUID ? userDetails.uid + rUID : rUID + userDetails.uid;

  const sendNewMsg = () => {
    if (msg.trim()) {
      const data = {
        msg,
        senderUID: userDetails.uid,
        receiverUID: rUID,
        created: new Date(),
      };
      sendMsg(threadID, data);
      setMsg('');
      setHeight(0);
    }
  };

  useEffect(() => {
    getAllMsgs(threadID);
  }, []);

  return (
    <>
      <ScrollView
        style={{marginHorizontal: 10}}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {msgDetails.loading ? (
          <>
            <ActivityIndicator size="large" />
          </>
        ) : msgDetails.msgs.length > 0 ? (
          msgDetails.msgs.map((msg, index) => (
            <ChatMessage
              msg={msg}
              rDetails={route.params}
              sImg={userDetails.photoURL}
              key={index}
            />
          ))
        ) : (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#e2e0e0',
              paddingVertical: 10,
            }}>
            <Text>No Message Found</Text>
          </View>
        )}

        <View style={{height: 80}}></View>
      </ScrollView>

      <View style={style.inputWrapper}>
        <View style={style.inputView}>
          <TextInput
            placeholder="Type a message"
            multiline={true}
            value={msg}
            onChangeText={txt => setMsg(txt)}
            onContentSizeChange={e =>
              setHeight(e.nativeEvent.contentSize.height)
            }
            style={[style.input, {height: Math.max(35, height)}]}
          />
        </View>
        <TouchableOpacity
          onPress={() => sendNewMsg()}
          style={style.sendBtn}
          activeOpacity={0.5}>
          <Text style={style.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  userDetails: state.auth.user,
  msgDetails: state.chat,
});

const mapDispatchToProps = {
  getAllMsgs: threadId => getAllMsgs(threadId),
  sendMsg: (threadId, data) => sendMsg(threadId, data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

const style = StyleSheet.create({
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingTop: 5,
  },
  inputView: {
    width: '82%',
  },
  input: {
    marginHorizontal: 15,
    borderWidth: 2,
    paddingLeft: 15,
    paddingTop: 10,
    borderRadius: 25,
    borderColor: '#1268BB',
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  sendBtn: {
    justifyContent: 'center',
    backgroundColor: '#1268BB',
    width: '15%',
    borderRadius: 15,
    height: 40,
    bottom: 15,
    position: 'absolute',
    right: 10,
  },
  sendBtnText: {
    textAlign: 'center',
    color: '#fff',
  },
});
