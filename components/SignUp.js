import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  //AsyncStorage,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import MySingleton from './Singleton/MySingleton';
import data from '../assets/anim/data.json';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUp extends React.Component {
  state = {
    isLoadingComplete: true,
    currentUser: [],
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    token: 'a',
    animation: '',
    inProgress: false,
    pitch: 0.8,
    rate: 0.8,
    authenticated: false,
  };
  componentDidMount() {
    this._playAnimation();
  }
  constructor(props) {
    super(props);
    /*  Dialogflow_V2.setConfiguration(
      'client-access-199@testagent-f6b6b.iam.gserviceaccount.com',
      '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1w6VrRzptrdGB\nDlVMjJ4iB/K9PB2JuVS17vDwSoA/YkCPBQf/z0v6KjpI93QymGPTWZeKN6L/X+SW\n45RBi9ke1R4lWFMJDUUMRXdAqVNpteQqyFBn4pO1GBucx4AzDh1v84wHJgY9Uplf\nfLf/tA2dPct+OBmBzVUCG5gEFZK/wgNAcs0plDrt+9s7yNsF9miQwl3pjkuYmR/0\nh9LgX2TpUJ69792znw53KVQVodjoeNZeXyOz2fltLJiK6xX2NI/n8bfCKbAEvf1S\nrDDHaHKE0Utaz0FWwTkdibf8A+F7wgCebCwyKb4Me28pAco9nvD7VYrcvOayeB2b\nQ0ULcmVVAgMBAAECggEAVt/dYuJm60AeN8Q9gbpd5F8PJmIirg5eDhzXnMnG9USF\nHbZmZd5S7o0bUX+wUnRilgQmuWGxLsTK8VFxrUhlrGZpI6lM+rEUdPKItmeX3hkZ\nJleakqSJO497txnlTMGs0TLDFTGX3txpQOnP2c/Zh/OenMO8cT1OKZU9uYoEG1EV\ny3pGv1sgM39GS2fhNm/Y4uFe2vUoMRa1VWYzOJf1NP1fynOQOZ7gIYCqUCgEDyTP\nnV5p3k49hhQt++4LNZIRSRbuA3VzxqWOjG9nuwClSb6qlVSjQuK0Z22qlkVQ8VOW\nSLVkxv2ll05SJ+UO39dcWM0wcZ5MdtKyxHz/yThI+wKBgQDdytv+d9+sSeTtjQAl\nT5XS0dd6FIgdn8n3iw8Kq52MsMJYxYgzTH7nKnGgyeuf0HI/UEA2VKq8LiRKoAGg\nxnuiHmPw7Ol8M3VspUj6/7ZExOGz7yDmqrufGB12gUOBPMwmrVUXkFf81Rm+lWcL\nfYhlOFTabvQ6ZCuKXzsEu6ys6wKBgQDRzFWZW4dKsx2Lx5IU/f2ibZWD5K7eWtN+\ngM8T0oLCtN379YZ1j2uwOB6oj/CGnph+EctTcaVcnnCVm7vdYmIXFlCbUFqBLAsk\nGykbw0V+pykWoDfMk2XH1jEa7MhuvTvOKZESWUhRCpAUKP0kpjxTwJqLNiqIghKE\n4a8f9TemvwKBgQCOAzVHw6OxYoM146GjQkkxevFYlsrtBQJCAYU5FNfFXOykAJ8M\nEb/z7kZhaMj5RHPSvGTRJPdJlNXh/n/sXQqOrJzbiCacQyq9zTtkk9U2RUYre0L6\nz3lhDgTXez8pAi/J2BRzCRZ9qklYsbsQLWnnPeF/F6pDtR339LAKgMy4zwKBgQCQ\nctLhAy70lLycGC2RfItcgXz3UcXA3OJPcFqjeEaFzsgkiZkpajUoIIujXW+rEJlH\n+/J1ooLLcV9s8sv3kpyc7sVTGpEl7PBCzNyR+/HmUSuuI2Qn27ixTd2Df1JFRM9f\nlCkJbCWpfs9SwiIBUN+qfqspfILueDhN+6F7LHhDuwKBgQDPVja4nxs3XBbWkdAq\nRtcqNjd5ebtrwuUHkyVWVAVaJRSLkz0i/MbLn/7/BR+5aAz4Jb5+4rbClQYN6Qnn\nK+6/Uxl9x8LQZnqqd9rAd7pACYYdRSItYQBR7E+9+12UlT8lBL1LlbmuyIh4J1lg\n88H5mgJTXdoHjKmlSNFbtSqKeg==\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_ENGLISH,
      'testagent-f6b6b',
    );*/
  }

  renderButton() {
    if (this.state.isLoadingComplete) {
      return (
        <Button
          title="Sign Up"
          color="#D82735"
          onPress={() => {
            this.setState({ isLoadingComplete: false });
            axios
              .post(/*'http://' + MySingleton.getId() + ':4000*/'https://englot.herokuapp.com/users/register', {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                lesson: 1,
              })
              .then(res => {
                this.props.navigation.navigate('LoginForm');
                //this.props.navigation.navigate("App");
              })
              .catch(err => {
                console.log(err);
                this.setState({ isLoadingComplete: true });
              });
          }}
        />
      );
    } else return <ActivityIndicator size="small" color="#ffffff" />;
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 250,
            height: 250,
            marginBottom: 20,
            marginTop: 20,
            flex: 1,
          }}
          source={data}
          loop={false}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          //behavior = "position"
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.Input}
              placeholder="First Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="firstname"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={firstname => this.setState({ firstname })}
              secureTextEntry={false}
              returnKeyType="next"
              OnSubmitEditing={() => {
                this.secondTextInput.current.focus();
              }}
            />
            <TextInput
              style={styles.Input}
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="lastname"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={lastname => this.setState({ lastname })}
              secureTextEntry={false}
              ref={input => {
                this.secondTextInput = input;
              }}
              returnKeyType="go"
            />
            <TextInput
              style={styles.Input}
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="username"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={username => this.setState({ username })}
              secureTextEntry={false}
              returnKeyType="next"
              OnSubmitEditing={() => {
                this.secondTextInput.current.focus();
              }}
            />
            <TextInput
              style={styles.Input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              returnKeyType="next"
              OnSubmitEditing={() => {
                this.secondTextInput.current.focus();
              }}
            />
            {this.renderButton()}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = data;
    this.setState({ animation: result }, this._playAnimation);
  };
}

const mapStateToProps = state => {
  return { token: state.token };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052A5',
    //padding: 20,
    //justifyContent: "center",
    //alignItems: "center"
  },
  Logo: {
    //width: '30%',
    //height: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  Input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 20,
    width: '80%',
  },
  button: {
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
