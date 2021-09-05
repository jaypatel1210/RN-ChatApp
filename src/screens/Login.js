import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FBSignIn, GSignIn} from '../action/auth';

// Firebase Google Login imports
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const Login = ({GSignIn, FBSignIn}) => {
  return (
    <>
      <View style={styles.container}>
        <GoogleSigninButton
          style={styles.gBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => GSignIn()}
        />

        <TouchableOpacity onPress={() => FBSignIn()} style={styles.fbBtn}>
          <Text style={styles.fbText}>Sign In With Facebook</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

Login.propTypes = {
  GSignIn: PropTypes.func.isRequired,
  FBSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  GSignIn: () => GSignIn(),
  FBSignIn: () => FBSignIn(),
};

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gBtn: {
    height: 48,
    width: '70%',
  },
  fbBtn: {
    backgroundColor: '#4267B2',
    width: '68%',
    paddingVertical: 13,
    borderRadius: 3,
    elevation: 5,
    marginTop: 15,
  },
  fbText: {
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
  },
});
