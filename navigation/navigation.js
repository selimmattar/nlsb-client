import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
//import Chat from '../components/Chat'
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import Lessons from '../components/Lessons';
import AuthLoading from '../components/AuthLoading';
import LoginForm from '../components/LoginForm';
import SignUp from '../components/SignUp';
import SiriWave from '../components/SiriWave'
import HomePage from "../components/HomePage";
import TabNavigator from "../components/TabNavigator";
import FillInTheBlanks from "../components/FillInTheBlanks";
import Exercise from "../components/Exercise";
import ExerciceQCM from "../components/ExerciceQCM";

const App = createMaterialTopTabNavigator(
  {
    //Chat : Chat,
    Lessons: Lessons,
    SiriWave: SiriWave,
    Stats: ExerciceQCM,
    Settings: Settings,
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'white',
      activeTintColor: 'white',
      activeBackgroundColor: 'white',
      labelStyle: {
        fontSize: 10,
        fontStyle: 'normal',
      },
      style: {
        backgroundColor: 'blue',
      },
    },
  },
);

const Auth = createStackNavigator(
  {
    LoginForm: {
      screen: LoginForm,

      navigationOptions: {
        title: 'LoginForm',
      },
    },
    SignUp: {
      screen: SignUp,

      navigationOptions: {
        title: 'SignUp',
      },
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const ExerciceFillInTheBlanks = createStackNavigator(
  {
    FillInTheBlanks: {
      screen: FillInTheBlanks,

      navigationOptions: {
        title: 'FillInTheBlanks',
      },
    } ,

  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: App,
    Auth: Auth,
    ExerciceFillInTheBlanks: ExerciceFillInTheBlanks
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
