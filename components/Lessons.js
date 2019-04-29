import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { List, ListItem, SearchBar, Input } from 'react-native-elements';
import LessonItem from './LessonItem';
import axios from 'axios';
import MySingleton from './Singleton/MySingleton';
import { TextInput } from 'react-native-gesture-handler';
import BrickList from 'react-native-masonry-brick-list';
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
  {
    key: 1,
    questions: [],
    title: 'Greetings and farewells',
    color: '#0174DF',
    span: 1,
    disabled: true,
  },
  {
    key: 2,
    questions: [],
    title: 'Joined consonants and vowels',
    color: '#0174DF',
    span: 1,
    disabled: true,
  },
  {
    key: 3,
    questions: [],
    title: 'Personal information',
    color: '#0174DF',
    span: 1,
    disabled: true,
  },
  {
    key: 11,
    questions: [],
    title: 'This,that,these,those...',
    color: '#01A9DB',
    span: 1,
    disabled: true,
  },
  {
    key: 12,
    questions: [],
    title: 'Be verbs',
    color: '#01A9DB',
    span: 1,
    disabled: true,
  },
  {
    key: 13,
    questions: [],
    title: 'Action verbs',
    color: '#01A9DB',
    span: 1,
    disabled: true,
  },
  {
    key: 21,
    questions: [],
    title: 'Adjectives',
    color: '#04B4AE',
    span: 1,
    disabled: true,
  },
  {
    key: 22,
    questions: [],
    title: 'Comparatives and superlatives',
    color: '#04B4AE',
    span: 2,
    disabled: true,
  },
  {
    key: 31,
    questions: [],
    title: 'Nouns',
    color: '#088A68',
    span: 3,
    disabled: true,
  },
  {
    key: 41,
    questions: [],
    title: 'Simple past for regular verbs',
    color: '#088A4B',
    span: 1,
    disabled: true,
  },
  {
    key: 42,
    questions: [],
    title: 'Simple past for irregular verbs',
    color: '#088A4B',
    span: 2,
    disabled: true,
  },
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
      allowedLessons: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentWillUnmount() {
    data.forEach(el => (el.questions = []));
  }
  componentDidMount() {
    axios
      .get('http://10.0.2.2:4000/ExerciseF/')
      .then(res => {
        const lessons = res.data;

        lessons.forEach(element => {
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
    AsyncStorage.getItem('currentLesson')
      .then(response => {
        const currentLesson = parseInt(response);
        data
          .filter(el => {
            return el.key <= currentLesson;
          })
          .forEach(el => {
            el.disabled = false;
          });
        this.setState({
          allowedLessons: data.filter(el => {
            return el.key <= currentLesson;
          }),
        });
      })
      .catch(err => {
        console.log(err);
      });
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

  _onPressItem(id) {
    this.props.navigation.navigate('ExerciceQuestions', {
      id: id,
      exercise: data.find(obj => {
        return obj.key == id;
      }),
    });
    // updater functions are preferred for transactional updates
  }

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
  renderView = prop => {
    return (
      <TouchableOpacity
        onPress={() => this._onPressItem(prop.key)}
        key={prop.key}
        id={prop.key}
        disabled={prop.disabled}
        style={{
          margin: 2,
          borderRadius: 2,
          backgroundColor: prop.color,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{prop.title} </Text>
      </TouchableOpacity>
    );
  };
  WillFocus(payload) {
    if (payload.state.params) {
      if (payload.state.params.Lesson) {
        Lesson = payload.state.params.Lesson;
        data
          .filter(el => {
            return el.key <= Lesson;
          })
          .forEach(el => {
            el.disabled = false;
          });
      }
    }
    this.forceUpdate();
  }
  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={payload => this.WillFocus(payload)}
          onDidFocus={payload => console.log('did focus', payload)}
          onWillBlur={payload => console.log('will blur', payload)}
          onDidBlur={payload => console.log('did blur', payload)}
        />
        <BrickList
          data={data}
          renderItem={prop => this.renderView(prop)}
          columns={3}
        />
      </View>
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
