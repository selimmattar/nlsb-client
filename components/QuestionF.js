import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

export default class Exercise extends React.Component {
  state = {
    type: '',
    question: '',
    content: '',
    jsx: [],
    choiceBckg: '#FFFFFF',
  };
  componentDidMount() {
    this.setState({
      question: this.props.question,
      content: this.props.content,
    });
    this.prepareExercise(this.props.content);
  }
  prepareExercise(content) {
    var Myjsx = [];
    while (content.length > 0) {
      if (content.indexOf('&') > -1) {
        var c = content.substring(0, content.indexOf('&'));
        const text = <Text style="display : inline;">{c}</Text>;
        const input = (
          <TextInput style="display : inline;" style={{ width: '15%' }} />
        );
        Myjsx.push(text);
        Myjsx.push(input);
        content = content.substring(content.indexOf('&') + 2, content.length);
      } else {
        const text = <Text style="display : inline;">{content}</Text>;

        Myjsx.push(text);
        content = '';
      }
    }
    this.setState({ jsx: Myjsx });
  }

  renderExercise() {
    return (
      <View style={styles.FIBcontainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {this.state.question}
        </Text>
        {this.state.jsx}
      </View>
    );
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderExercise()}</View>;
  }
}

const styles = StyleSheet.create({
  FIBcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  QCMcontainer: {
    flex: 0.5,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    flexWrap: 'wrap',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  choiceSelected: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
  },
  NchoiceSelected: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
});
