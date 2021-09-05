import React, {useState, useEffect} from 'react';
import {Text, Button} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FBSignIn, GSignIn} from '../action/auth';

// Firebase Google Login imports
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const Login = ({GSignIn, FBSignIn}) => {
  const openGSignIn = async () => {
    GSignIn();
  };

  const openFBSignIn = async () => {
    FBSignIn();
  };

  return (
    <>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => openGSignIn()}
      />

      <Button title="Facebook Sign-In" onPress={() => openFBSignIn()} />
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
