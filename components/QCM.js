import React from "react";
import { StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";

class QCMItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
  }

  check = () => {
    if(this.state.isChecked){
      this.setState({isChecked:false})
    } else {
      this.setState({isChecked:true})
    }
  }

  render() {

    return (
        <View style={styles.item} >
          <CheckBox
            checked= {this.state.isChecked}
            onPress={() => this.check()}
          />
          <Text > {this.props.id} </Text>
        </View>
    );
  }
}



class QCM extends React.Component {
  constructor(props) {
    super(props);

    /*this.state = {
      data: [
        { key: 'A' },
        { key: 'B' },
        { key: 'C' }
      ]
    };*/
  }

  render() {
    return (
      <View  style={styles.container}>
      <Text>{this.props.question}</Text>
        <FlatList
          data = {this.props.data}
          style={styles.container}
          renderItem={({ item }) => (
            <QCMItem
              id={item.key}
            />
          )}
          keyExtractor={item => item.key}
        />
       </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default QCM;