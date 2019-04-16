import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

export default class LessonItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
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
        <View style={styles.item}>
          <Text style={styles.itemText} /*style={styles.itemText} */>
            {' '}
            {this.props.title}{' '}
          </Text>
          {/*<View style={styles.imagesContainer} >
            <Image
              source={require('../assets/images/star.png')}
              style={styles.imageView}>
            </Image>
            <Image
              source={require('../assets/images/star.png')}
              style={styles.imageView}>
            </Image>
            <Image
              source={require('../assets/images/star.png')}
              style={styles.imageView}>
            </Image>
    </View>*/}
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
    borderRadius: 40,
    backgroundColor: '#44bd32',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 2,
    margin: 1,
    width: Dimensions.get('window').width / numColumns, // approximate a square
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  imagesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  imageView: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
});
