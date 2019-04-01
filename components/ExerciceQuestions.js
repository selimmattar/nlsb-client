import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Question from './Question';
import RadioGroup from 'react-native-radio-buttons-group';

const data1 = {
  question: 'question1',
  choices: [
    { key: 'A', label: 'A', value:'A' },
    { key: 'B', label: 'B', value:'B' },
    { key: 'C', label: 'C', value:'C' },
  ],
  answer: 'A',
  i:1
};
const data2 = {
  question: 'question2',
  choices: [
    { key: 'A', label: 'A', value:'A' },
    { key: 'B', label: 'B', value:'B' },
    { key: 'C', label: 'C', value:'C' },
  ],
  answer: 'C',
  i:2
};

export default class Vertical extends Component {
  state = {
    rslt:0,
    scoreTab : [ 0, 0],
    showResult: false,
    disabled: false,
  };

  // update state
  //onPress = data => this.setState({ data });

  renderResult = () => {
    //if (!this.state.loading) return null;
  var somme=0;
    this.state.scoreTab.forEach(element => {
      somme+=element;
     
    });
    this.setState({
      rslt : somme,
      disabled : true,
       })
  };

  updateState = (selectedAnswer, correctAnswer, i) => {
    /*this.setState({
        score: this.state.score + childScore,
    });*/
    console.log('score from child ' + selectedAnswer);
    if (selectedAnswer === correctAnswer) {
    let arr=this.state.scoreTab
    arr[i]=1;
      this.setState({
       scoreTab : arr
     })
    } else {
      let arr=this.state.scoreTab
    arr[i]=0;
      this.setState({
       scoreTab : arr
     })
    }
    
  }

  render() {
    return (
      <ScrollView >
      <Question
        data = {data1}
        updateState={this.updateState}
        //disabled = {this.state.disabled}
      />
      <Question
        data = {data2}
        updateState={this.updateState}
        //disabled = {this.state.disabled}
    />
      <TouchableOpacity style={[styles.button]} onPress={() => this.renderResult() } >
        <Text>Submit</Text>
      </TouchableOpacity>
       <Text> score : {this.state.rslt} </Text> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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