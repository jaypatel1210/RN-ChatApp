import auth from '@react-native-firebase/auth';

// Firebase Google Login imports
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Firebase FB Login Imports
import {LoginManager, AccessToken} from 'react-native-fbsdk';

GoogleSignin.configure({
  webClientId:
    '728048192001-8b9qtc99l9c0v3ctquco2qmhiiiaftmv.apps.googleusercontent.com',
});

export const GSignIn = () => async dispatch => {
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  auth()
    .signInWithCredential(googleCredential)
    .then(() => {
      // Success SignIn
    })
    .catch(err => {
      // Signin Error
      console.log(err);
    });
};

export const FBSignIn = () => async dispatch => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  auth()
    .signInWithCredential(facebookCredential)
    .then(() => {
      // Success SignIn
    })
    .catch(err => {
      // Signin Error
      console.log(err);
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .catch(err => console.log(`SIGNOUT Err => ${err}`));
};
