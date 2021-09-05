import React, {useEffect} from 'react';

// Navigation
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// All Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Chat from './screens/Chat';

// redux stuff
import {useDispatch, connect} from 'react-redux';
import {IS_AUTHENTICATED, IS_CREATED, SET_USER} from './action/action.types';
import {signOut} from './action/auth';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const Routes = ({authState, signOut}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      if (authState.created) {
        const data = {
          uid: user.uid,
          name: user.displayName,
          img: user.photoURL,
          email: user.email,
          providerId: user.providerData[0].providerId,
          created: new Date(),
        };
        firestore()
          .collection('users')
          .doc(data.uid)
          .set(data, {merge: true})
          .then(() =>
            dispatch({
              type: IS_CREATED,
              payload: false,
            }),
          )
          .catch(e => console.log(e));
      }

      dispatch({
        type: SET_USER,
        payload: user,
      });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1268BB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'Chat',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => signOut()}>
                      <Text style={{color: '#fff', fontSize: 15}}>Signout</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={({route}) => ({title: route.params.name})}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{title: 'Sign In'}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
