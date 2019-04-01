import React from "react";
import { StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import QCM from "./QCM";

const data1 = [
  { key: 'A' },
  { key: 'B' },
  { key: 'C' }
];
const data2 = [
  { key: 'D' },
  { key: 'E' },
  { key: 'F' }
];
const data3 = [
  { key: 'G' },
  { key: 'H' },
  { key: 'I' }
];

class ExerciceQCM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { key: 'A' },
        { key: 'B' },
        { key: 'C' }
      ]
    };
  }

  render() {
    return (
      <ScrollView >
      <QCM 
        data = {data1}
        question = 'question1'
      />
      <QCM 
        data = {data2}
        question = 'question2'
      />
      <QCM 
        data = {data3}
        question = 'question13'
      />
      <TouchableOpacity style={[styles.button]} onPress={() => {
            console.log('submit');
          }}>
        <Text>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#ced6e2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    borderRadius:10,
    margin: 1,
    width: Dimensions.get('window').width / 2, // approximate a square,
    height: Dimensions.get('window').width / 8 // approximate a square
  },
  itemText: {
    color: '#000',
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "#add8e6",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
});

export default ExerciceQCM;