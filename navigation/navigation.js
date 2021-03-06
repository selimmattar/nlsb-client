import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  StackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Chat from '../components/Chat'
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import Lessons from '../components/Lessons';
import AuthLoading from '../components/AuthLoading';
import LoginForm from '../components/LoginForm';
import SiriWave from '../components/SiriWave';
import HomePage from '../components/HomePage';
import TabNavigator from '../components/TabNavigator';
import FillInTheBlanks from '../components/FillInTheBlanks';
import QuestionF from '../components/QuestionF';
import ExerciceQuestionsQ from '../components/ExerciceQuestionsQ';
import ExerciceQuestionsF from '../components/ExerciceQuestionsF';
//import ExerciceQCM from '../components/ExerciceQCM';
import Chat from '../components/Chat';
import SignUp from '../components/SignUp';
import GoogleAPI from '../components/GoogleAPI';
import GridLayout from '../components/GridLayout';
import Profile from '../components/Profile';
import Camera from '../components/Camera';

const App = createMaterialTopTabNavigator(
  {
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="wechat" color='white' size={20} />
        ),
      },
    },
    Lessons: {
      screen: createStackNavigator(
        {
          Lessons: Lessons,
          ExerciceQuestions: ExerciceQuestionsF,
        },
        {
          headerMode: 'none',
          navigationOptions: {
            headerVisible: false,
          },
        },
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="book" color='white' size={20} />
        ),
      },
    },

    Camera: {
      screen: Camera,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="camera" color='white' size={20} />
        ),
      },
    },

    Settings: {
      screen: createStackNavigator(
        {
          Settings: Profile,
          Stats: Stats,
        },
        {
          headerMode: 'none',
          navigationOptions: {
            headerVisible: false,
          },
        },
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color='white' size={20} />
        ),
      },
    },


    /*Settings: {
      screen: Profile,
      //screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={20} />
        ),
      },
    },*/
  },

  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: '#586589',
      activeTintColor: '#F8F8F8',
      activeBackgroundColor: 'white',
      labelStyle: {
        fontSize: 10,
        fontStyle: 'normal',
      },
      style: {
        backgroundColor: '#044434',
      },
    },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
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
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: App,
      Auth: Auth,
      ExerciceFillInTheBlanks: ExerciceFillInTheBlanks,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
