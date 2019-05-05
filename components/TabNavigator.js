import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Chat from './Chat';
import Stats from './Stats';
import Settings from './Settings';
import Lessons from './Lessons';
import Exercise from './QuestionF';
const TabNavigator = createMaterialTopTabNavigator(
  {
    Chat: Chat,
    Lessons: Lessons,
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
        backgroundColor: '#468189',
      },
    },
  },
);

export default TabNavigator;
