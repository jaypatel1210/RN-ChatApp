import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const ChatList = ({user, navigation}) => {
  return (
    <View style={style.container}>
      <View>
        <Image source={{uri: user.img}} style={style.img} />
      </View>
      <View style={style.titleWrapper}>
        <Text style={style.name}>{user.name}</Text>
        <Text style={style.chat}>Tap to Chat</Text>
      </View>
    </View>
  );
};

export default ChatList;

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    paddingBottom: 8,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  titleWrapper: {
    marginLeft: 20,
    marginTop: 5,
  },
  name: {
    fontWeight: '600',
  },
  chat: {fontSize: 10, color: '#808080'},
});
