import React, {useState, useEffect} from 'react';
import {Text, Button} from 'react-native';

// Firebase Google Login imports
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

// Firebase FB Login Imports
import {LoginManager, AccessToken} from 'react-native-fbsdk';

GoogleSignin.configure({
  webClientId:
    '728048192001-8b9qtc99l9c0v3ctquco2qmhiiiaftmv.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const googleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        // successfully login
        // console.log(user);
        navigation.navigate('Home');
      });
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled) {
      return 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      return 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        navigation.navigate('Home');
      });
  }

  return (
    <>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => googleSignIn()}
        disabled={initializing}
      />
      <Text>{JSON.stringify(user)}</Text>

      <Button
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress()}
      />
    </>
  );
};

export default Login;
