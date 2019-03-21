import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
//import Chat from '../components/Chat'
import Stats from '../components/Stats'
import Settings from '../components/Settings'
import Lessons from '../components/Lessons'
import AuthLoading from "../components/AuthLoading"
import LoginForm from '../components/LoginForm';
import HomePage from "../components/HomePage";
import TabNavigator from "../components/TabNavigator"

const App = createMaterialTopTabNavigator(
  {
    //Chat : Chat,
    Lessons : Lessons,
    Stats : Stats,
    Settings : Settings
  },
  {
    tabBarOptions : {
      inactiveTintColor : 'white',
      activeTintColor : 'white',
      activeBackgroundColor : 'white',
      labelStyle: {
        fontSize: 10,
        fontStyle: 'normal'
      },
      style : {
        backgroundColor : 'blue'
      }

    }
  }
)


const Auth = createStackNavigator(
  {
    LoginForm: {
      screen: LoginForm,

      navigationOptions: {
        title: 'Login',
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
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
