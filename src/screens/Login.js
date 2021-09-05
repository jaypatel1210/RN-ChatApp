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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => GSignIn()}
        />

        <TouchableOpacity
          onPress={() => FBSignIn()}
          style={{
            backgroundColor: '#4267B2',
            paddingHorizontal: 20,
            paddingVertical: 13,
            borderRadius: 3,
            elevation: 5,
            marginTop: 15,
          }}>
          <Text style={{color: '#fff', fontWeight: '800'}}>
            Sign In With Facebook
          </Text>
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

const styles = StyleSheet.create({});
