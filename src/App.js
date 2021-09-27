import React, {useEffect} from 'react';
import Routes from './Routes';
import {Alert} from 'react-native';

import {Provider} from 'react-redux';
import store from './store';

// ONE SIGNAL FOR NOTIFICATION

import OneSignal from 'react-native-onesignal';

const App = () => {
  const os = async => {
    OneSignal.setAppId('');
    OneSignal.setLogLevel(6, 0);

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  };

  useEffect(() => {
    os();
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
