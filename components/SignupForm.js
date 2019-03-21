import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import firebase from 'firebase';
import { Input } from './common/input';
import { Button } from './common/Button';
import { Spinner } from './common/Spinner';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
class LoginForm extends React.Component {
  state = {
    isLoadingComplete: true,
    currentUser: [],
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    token: '',
  };
  renderButton() {
    if (this.state.isLoadingComplete) {
      return (
        <Button
          OnPress={() => {
            this.setState({ isLoadingComplete: false });
            this.setState({ token: 'token is set' });
            console.log('registered !');
            // this.props.login(this.state.token);
            axios
              .post('http://192.168.137.1:4000/users/register', {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
              })
              .then(res => {
                const { token, ...currentUser } = res.data;
                this.setState({ currentUser });
                this.setState({ token });
              })
              .catch(err => {
                console.log(err);
                this.setState({ isLoadingComplete: true });
              });
            /* firebase
              .auth()
              .signInWithusernameAndPassword(this.state.username, this.state.password)
              .then(() => {
                this.setState({ isLoadingComplete: true });
                console.log('Hoooraaay :D !');
              })
              .catch(error => {
                console.log(error);
                this.setState({ isLoadingComplete: true });
              });*/
          }}
        >
          sign Up
        </Button>
      );
    }
    return <Spinner size="small" />;
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/SplashBack.png')}
        style={styles.imgBackground}
      >
        <Image
          source={require('../assets/images/unnamed.png')}
          style={styles.Logo}
        />
        <Input
          placeholder="Enter your username..."
          label="username"
          onChangeText={username => this.setState({ username })}
        />
        <Input
          placeholder="Enter your password..."
          label="Password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
        <Input
          placeholder="Confirm your password..."
          label="ConfirmPassword"
          onChangeText={confirmpassword => this.setState({ confirmpassword })}
          secureTextEntry={true}
        />
        <Input
          placeholder="Enter your firstname..."
          label="Firstname"
          onChangeText={firstname => this.setState({ firstname })}
        />
        <Input
          placeholder="Enter your lastname..."
          label="Lastname"
          onChangeText={lastname => this.setState({ lastname })}
        />
        {this.renderButton()}
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return { token: state.token };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Logo: {
    width: '70%',
    height: '70%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});

export default connect(
  mapStateToProps,
  actions,
)(LoginForm);
