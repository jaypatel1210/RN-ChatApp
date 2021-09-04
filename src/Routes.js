import React from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// All Screens
import Home from './screens/Home';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
