import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";


export default class LessonItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';

    /*if (props.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }*/

    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.item} >
          <Text style={{color: textColor}} /*style={styles.itemText} */> {this.props.id} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const numColumns = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width: Dimensions.get('window').width / numColumns, // approximate a square
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});