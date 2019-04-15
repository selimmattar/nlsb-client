import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class BlankInput extends React.Component {
  state = {
    TypedAnswer: '',
    CorrectAnswer: '',
  };
  componentDidMount() {
    this.setState({ CorrectAnswer: this.props.CorrectAnswer });
  }
  InputChanged(text) {
    this.setState({ TypedAnswer: text });
    this.props.UpdateStateF(this.state.TypedAnswer, this.state.CorrectAnswer);
  }

  render() {
    return (
      <TextInput
        onChangeText={text => this.InputChanged(text)}
        style="display : inline;"
        style={{ width: '15%' }}
      />
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});
