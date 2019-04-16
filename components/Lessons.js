import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { List, ListItem, SearchBar, Input } from 'react-native-elements';
import LessonItem from './LessonItem';
import axios from 'axios';
import MySingleton from './Singleton/MySingleton';
import { TextInput } from 'react-native-gesture-handler';
const data = [
  { key: 1, questions: [], title: 'Greetings and farewells' },
  { key: 2, questions: [], title: 'Joined consonants and vowels' },
  { key: 3, questions: [], title: 'Personal information' },
  { key: 11, questions: [], title: 'This,that,these,those...' },
  { key: 12, questions: [], title: 'Be verbs' },
  { key: 13, questions: [], title: 'Action verbs' },
  { key: 21, questions: [], title: 'Adjectives' },
  { key: 22, questions: [], title: 'Comparatives and superlatives' },
  { key: 31, questions: [], title: 'Nouns' },
  { key: 41, questions: [], title: 'Simple past for regular verbs' },
  { key: 42, questions: [], title: 'Simple past for irregular verbs' },
  //{ key: 'L' },
  //{ key: 'M' },
  //{ key: 'N' },
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

/*class Item extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';

    /*if (props.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }*/

/*return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.item} >
    <Text style={{color: textColor}} /*style={styles.itemText} > {this.props.id} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}*/

export default class Lessons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: (new Map(): Map<string, boolean>),
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    axios
      .get('http://10.0.2.2:4000/ExerciseF/')
      .then(res => {
        const lessons = res.data;
        lessons.forEach(element => {
          console.log(element);
          data
            .find(obj => {
              return obj.key == element.lesson;
            })
            .questions.push({ ...element, type: 'F' });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get('http://10.0.2.2:4000/ExerciseQ/')
      .then(res => {
        const lessons = res.data;
        lessons.forEach(element => {
          console.log(element);
          data
            .find(obj => {
              return obj.key == element.lesson;
            })
            .questions.push({ ...element, type: 'Q' });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log(data);
  }
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        //this.makeRemoteRequest();
        console.log('refreshing');
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        console.log('loading more');
        //this.makeRemoteRequest();
      },
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _onPressItem = (id: string, item, index) => {
    this.props.navigation.navigate('ExerciceQuestions', {
      id: id,
      exercise: data.find(obj => {
        return obj.key == id;
      }),
    });
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    /*
    <TouchableHighlight
      onPress={() => this._onPress(item)}
      //onShowUnderlay={separators.highlight}
      //onHideUnderlay={separators.unhighlight}
    >
      <View style={{ backgroundColor: 'white' }}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>;
    return (
      <View
        style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );*/

    return (
      <LessonItem
        id={item.key}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        key={item.key}
        title={item.title}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        //ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }
}
class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'transparent',
    backgroundColor: '#fbc531',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width: Dimensions.get('window').width / numColumns - 5, // approximate a square
    height: Dimensions.get('window').width / numColumns - 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
