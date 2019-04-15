import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';

export default class Vertical extends Component {
  state = {
    score: 0,
  };

  // update state
  onPress = data => {
    //console.log(data);
    let selectedButton = data.find(e => e.selected == true);
    //console.log(selectedButton);

    console.log('blabla');
    this.props.updateState(
      selectedButton.value,
      this.props.data.answer,
      this.props.data.i,
    );

    /*if (selectedButton.value === this.props.data.answer) {
      this.setState({
        score : 1,
      },
      () => {
        this.props.updateState(selectedButton.value, this.props.data.answer, this.props.data.i);
      },)
    } else {
      this.setState({
        score : 0,
      },
      () => {
        this.props.updateState(this.state.score);
      },
      )
    }
    //console.log(this.state.score);
    //this.props.updateState(this.state.score);*/
  };

  render() {
    /*this.props.data.choices.map((e) => {e.selected = false});*/
    let selectedButton = this.props.data.choices.find(e => e.selected == true);
    this.props.data.choices.map(e => {
      e.color = '#00a8ff';
    });
    selectedButton = selectedButton; /*selectedButton.value : this.props.data.choices[0].label;*/
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{this.props.data.question}</Text>
        <RadioGroup
          radioButtons={this.props.data.choices}
          style={styles.radioButtons}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: '#dcdde1',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 10,
  },
  question: {
    textAlign: 'center',
    color: '#718093',
    fontSize: 16,
    //fontWeight: 'bold'
    //paddingStart: 5,
  },
});
