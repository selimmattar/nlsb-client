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
} from 'react-native';
import axios from 'axios';
import MySingleton from './Singleton/MySingleton';
import data from '../assets/anim/data.json';
import blink from '../assets/anim/blink.json';
import loading0 from '../assets/anim/loading0.json';
import loading1 from '../assets/anim/loading1.json';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import FBLoginButton from './FbLoginComps/FBLoginButton'
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
//var FBLoginButton = require('./FBLoginComps/FBLoginButton');
const EXAMPLES = [
  { language: 'en', text: 'Hello world!' },
  { language: 'es', text: 'Hola mundo' },
  { language: 'en', text: 'Charlie Cheever chased a chortling choosy child' },
  { language: 'en', text: 'Adam Perry ate a pear in pairs in Paris' },
];

export default class LoginForm extends React.Component {
  state = {
    isLoadingComplete: true,
    currentUser: [],
    username: '',
    password: '',
    token: '',
    animation: data,
    animationCount: 0,
    loop: false,
    selectedExample: EXAMPLES[2],
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
  renderFB() {
    return (
      <View>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ', result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const { accessToken } = data;
                this.initUser(accessToken);
              });
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    );
  }
  renderButton() {
    if (this.state.isLoadingComplete) {
      return (
        <Button
          title="Log In"
          color="#D82735"
          onPress={() => {
            this.setState({
              animation: loading0,
              loop: false,
            });
            this.animation.play();
            this.setState({
              isLoadingComplete: false,
            });
            this.setState({ token: 'token is set' });
            console.log('Hellooo !');
            //console.log(this.state.token);
            //this.props.login(this.state.token);

            axios
              .post(
                'http://' + MySingleton.getId() + ':4000/users/authenticate',
                {
                  username: this.state.username,
                  password: this.state.password,
                },
              )
              .then(res => {
                const { token, ...currentUser } = res.data;
                this.setState({ currentUser });
                this.setState({ token });
                console.log('token is' + token);
                this.setState({ authenticated: true });

                AsyncStorage.setItem('currentId', this.state.currentUser._id);
                AsyncStorage.setItem(
                  'currentUsername',
                  this.state.currentUser.username,
                );
                AsyncStorage.setItem(
                  'currentFirstname',
                  this.state.currentUser.firstName,
                );
                AsyncStorage.setItem(
                  'currentLastname',
                  this.state.currentUser.lastName,
                );
                AsyncStorage.setItem(
                  'currentLesson',
                  this.state.currentUser.lesson + '',
                );
                AsyncStorage.getItem('currentLesson').then(response =>
                  console.log(response),
                );
                //this.setState({ isLoadingComplete: true });
                console.log('connected');
                this.props.navigation.navigate('App');
                //this.props.navigation.navigate("App");
              })
              .catch(err => {
                console.log('wrong data');
                console.log(err);
                this.setState({ isLoadingComplete: true });
              });
          }}
        />
      );
    } else {
      return <ActivityIndicator size="small" color="#ffffff" />;
    }
  }
  animationFinish() {
    this.setState({ animationCount: this.state.animationCount + 1 });
    if (this.state.animationCount == 1) {
      this.setState({ animation: blink, loop: true });
      this.animation.play();
    } else if (
      this.state.animationCount >= 3 &&
      this.state.animationCount <= 6
    ) {
      this.setState({
        animation: loading1,
        loop: false,
        animationCount: this.state.animationCount + 1,
      });
      this.animation.play();
    } else if (this.state.animationCount == 7) {
      if (this.state.isLoadingComplete) {
        if (this.state.currentUser.length == 0) {
          this.setState({ animation: blink, loop: true, animationCount: 2 });
          this.animation.play();
        } else {
        }
      } else {
        this.setState({
          animation: loading1,
          loop: false,
          animationCount: 3,
        });
        this.animation.play();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          onAnimationFinish={this.animationFinish.bind(this)}
          style={{
            width: 400,
            height: 400,
            marginBottom: 20,
            marginTop: 20,
            flex: 1,
          }}
          source={this.state.animation}
          loop={this.state.loop}
        />
        <KeyboardAvoidingView
          style={styles.formContainer}
          //behavior = "position"
        >
          <TextInput
            style={styles.Input}
            placeholder="Enter your username..."
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
            placeholder="Enter your password..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            label="Password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            ref={input => {
              this.secondTextInput = input;
            }}
            returnKeyType="go"
          />
          {this.renderButton()}
          {this.renderFB()}
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            Don't have an account ? Create One
          </Text>
        </KeyboardAvoidingView>
      </View>
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
  initUser(token) {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=id,email,name,first_name,last_name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        //this.props.navigation.navigate('App');
        //alert(json.email+json.first_name+json.last_name);
        AsyncStorage.setItem('fb_id', json.id);
        AsyncStorage.setItem('currentFirstname', json.first_name);
        AsyncStorage.setItem('currentLastname', json.last_name);
        this.checkAccountExisting(json.email, json.first_name, json.last_name);
        /*user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)   */
      })
      .catch(() => {
        //alert("mochkel fel co");
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  }

  checkAccountExisting(email, firstName, lastName) {
    //alert(email);
    axios
      .post('http://' + MySingleton.getId() + ':4000/users/getByEmail', {
        username: email,
      })
      .then(res => {
        //alert("exisiting connecting");
        this.props.navigation.navigate('App');
      })
      .catch(err => {
        //alert("ma l9ahouch");
        this._addFbUser(email, firstName, lastName);
      });
  }
  _addFbUser(email, firstname, lastname) {
    axios
      .post('http://' + MySingleton.getId() + ':4000/users/register', {
        username: email,
        password: 'fb',
        firstName: firstname,
        lastName: lastname,
        lesson: '1',
      })
      .then(res => {
        this.props.navigation.navigate('App');
        //alert("ajouta");
      })
      .catch(err => {
        alert('ma ajoutech');
      });
  }
}

const mapStateToProps = state => {
  return { token: state.token };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052A5',
    //padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    //width: '30%',
    //height: '30%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  Input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
  },
});
