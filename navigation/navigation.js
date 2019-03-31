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
<<<<<<< HEAD
import SiriWave from '../components/SiriWave';
import HomePage from '../components/HomePage';
import TabNavigator from '../components/TabNavigator';
import Exercise from '../components/Exercise';
=======
import SiriWave from '../components/SiriWave'
import HomePage from "../components/HomePage";
import TabNavigator from "../components/TabNavigator"
import FillInTheBlanks from "../components/FillInTheBlanks"

>>>>>>> c5bfc20df940650ea7f59aa2fdbaefdee293b3a3
const App = createMaterialTopTabNavigator(
  {
    //Chat : Chat,
    Lessons: Lessons,
    SiriWave: SiriWave,
    Stats: Exercise,
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
        title: 'Login',
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

<<<<<<< HEAD
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: App,
      Auth: Auth,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
=======
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
>>>>>>> c5bfc20df940650ea7f59aa2fdbaefdee293b3a3
