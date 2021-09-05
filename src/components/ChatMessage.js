import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ChatMessage = ({msg, rDetails, sImg}) => {
  let side = false,
    img = sImg;

  if (msg.senderUID == rDetails.rUID) {
    side = true;
    img = rDetails.rImg;
  }

  return (
    <>
      <View
        style={[
          styles.container,
          side ? styles.rightContainer : styles.leftContainer,
        ]}>
        <View style={styles.imgWrapper}>
          <Image source={{uri: img}} style={styles.img} />
        </View>
        <View
          style={[
            styles.msgWrapper,
            side ? styles.leftBgColor : styles.rightBgColor,
          ]}>
          <Text style={[!side && styles.leftText]}>{msg.msg}</Text>
        </View>
      </View>
    </>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 10,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row-reverse',
  },
  leftText: {
    color: '#fff',
  },
  imgWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  msgWrapper: {
    maxWidth: '75%',
    borderRadius: 10,
    padding: 5,
  },
  leftBgColor: {
    backgroundColor: '#e4e4e4',
    marginLeft: 5,
  },
  rightBgColor: {
    backgroundColor: '#1268BB',
    marginRight: 5,
  },
});
