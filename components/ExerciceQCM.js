import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import { List, ListItem, SearchBar, CheckBox } from 'react-native-elements';
import QCM from './ExerciceQuestions';
import FIB from './QuestionF';
class ExerciceQCM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#ced6e2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    borderRadius: 10,
    margin: 1,
    width: Dimensions.get('window').width / 2, // approximate a square,
    height: Dimensions.get('window').width / 8, // approximate a square
  },
  itemText: {
    color: '#000',
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ExerciceQCM;
