import React, {useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {allUsers} from '../action/users';
import PropTypes from 'prop-types';
import ChatList from '../components/ChatList';

const Home = ({allUsers, userDetails, userState, navigation}) => {
  const gotoChat = user => {
    /*  if (uid > userDetails.uid) uid = uid + userDetails.uid;
    else uid = userDetails.uid + uid; */

    navigation.navigate('Chat', {
      rUID: user.uid,
      rImg: user.img,
      name: user.name,
    });
  };

  useEffect(() => {
    if (userDetails) {
      allUsers(userDetails.uid);
    }
  }, [userDetails]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {userState.users ? (
          userState.users.map(
            user =>
              user.uid != userDetails.uid && (
                <TouchableOpacity
                  onPress={() => gotoChat(user)}
                  activeOpacity={0.5}
                  key={user.uid}>
                  <ChatList user={user} key={user.uid} />
                </TouchableOpacity>
              ),
          )
        ) : (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetails: state.auth.user,
  userState: state.users,
});

const mapDispatchToProps = {
  allUsers: uid => allUsers(uid),
};

Home.propTypes = {
  allUsers: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
  userDetails: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    marginVertical: 11,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
});
