import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.img} />
        <ActivityIndicator size="large" style={styles.spinner} />
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
  },
  spinner: {
    marginTop: '8%',
  },
});
