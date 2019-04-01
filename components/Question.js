import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
    
      console.log('blabla')
      this.props.updateState(selectedButton.value, this.props.data.answer, this.props.data.i);
    

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
  }

  render() {
    /*this.props.data.choices.map((e) => {e.selected = false});*/
    let selectedButton = this.props.data.choices.find(e => e.selected == true);
    //this.props.data.choices.map((e) => {e.disabled = this.props.disabled});
      selectedButton = selectedButton /*selectedButton.value : this.props.data.choices[0].label;*/
    return (
      <View style={styles.container}>
        <Text>
          {this.props.data.question}
        </Text>
        <RadioGroup radioButtons={this.props.data.choices} onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});