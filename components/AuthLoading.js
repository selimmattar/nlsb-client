import React from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  //AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';
import MySingleton from './Singleton/MySingleton';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoading extends React.Component {
  state = {
    connectedUsername: null,
    connectedPassword: null,
  };
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    AsyncStorage.multiGet(['currentId', 'currentPassword'])
      .then(response => {
        console.log(response[0][0]); // Key1
        console.log(response[0][1]); // Value1
        console.log(response[1][0]); // Key2
        console.log(response[1][1]); // Value2
        if (response[0][1] != null /*&& response[1][1]!= null*/) {
          console.log('not null');
          console.log(response[0][1]);
          axios
            .post('http://' + MySingleton.getId() + ':4000/users/getByIds', {
              _id: response[0][1],
            })
            .then(res => {
              //const { token, ...currentUser } = res.data;
              /*this.setState({ currentUser });
                this.setState({ token });
                console.log('token is' + token);
                this.setState({ isLoadingComplete: true });
                this.setState({ authenticated: true });
                */
              console.log('auth complete ');
              this.props.navigation.navigate('App');
              //this.props.navigation.navigate("App");
            })
            .catch(err => {
              console.log('wrong data');
              console.log(err);
              AsyncStorage.clear();
              this.props.navigation.navigate('Auth');
              //this.setState({ isLoadingComplete: true });
            });
        } else {
          console.log("can't retrieve");
          AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        }
      })
      .catch(err => {
        console.log('err retrieve ');
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
                <Image style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode:'contain'
  },
});
export default AuthLoading;
