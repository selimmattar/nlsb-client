import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing} from 'react-native';
import Question from './Question';
import RadioGroup from 'react-native-radio-buttons-group';

import Modal from 'react-native-modalbox';
//import Slider from 'react-native-slider';

var {width, height} = Dimensions.get('window');

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
const data3 = {
  question: 'question3',
  choices: [
    { key: 'A', label: 'A', value:'A' },
    { key: 'B', label: 'B', value:'B' },
    { key: 'C', label: 'C', value:'C' },
  ],
  answer: 'B',
  i:3
};

export default class Vertical extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      rslt:0,
      scoreTab : [ 0, 0],
      showResult: false,
      disabled: false,
      fadeValue: new Animated.Value(1),
      appearValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      yValue: new Animated.Value(0),
    };
  }

  // update state
  //onPress = data => this.setState({ data });

  onClose() {
    console.log('Modal just closed');
    this.props.navigation.navigate('Lessons');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  fadeAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 0,
      duration:2000,
    }).start();
  }
  springAnimation = () => {
    Animated.spring(this.state.springValue, {
      toValue: 0.6,
      friction: 0.5,
    }).start();
  }
  appearAnimation = () => {
    Animated.timing(this.state.appearValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.back(),
    }).start();
  }
  moveAnimation = () => {
    Animated.timing(this.state.appearValue, {
      toValue: height - 200,
      duration: 2000,
    }).start();
  }
  calculateResult = () => {
    //if (!this.state.loading) return null;
    //this.fadeAnimation();
    this.appearAnimation();
    this.springAnimation();
    
  var somme=0;
    this.state.scoreTab.forEach(element => {
      somme+=element;
    });
    this.setState({
      rslt : somme,
      disabled : true,
       })
      this.refs.modal4.open();

      //this.props.navigation.navigate('Lessons', {text: });
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

  renderResult1() {
    if (this.state.rslt>=1) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[styles.imageView, 
                 {transform: [{ scale: this.state.springValue}],
                              alignSelf: 'flex-start'}]}>
      </Animated.Image>
      );    
  }}

  renderResult2() {
    if (this.state.rslt>=2) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[styles.imageView, 
                 {transform: [{ scale: this.state.springValue}],
                              alignSelf: 'center'}]}>
      </Animated.Image>
      );   
  }}

  renderResult3() {
    if (this.state.rslt>=3) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[styles.imageView, 
                 {transform: [{ scale: this.state.springValue}],
                              alignSelf: 'flex-end'}]}>
      </Animated.Image>
      );    
    }    
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
      <Animated.View style={[styles.animationView, {opacity: this.state.fadeValue}]} > 
        <Question
          data = {data1}
          updateState={this.updateState}
        />
        <Question
          data = {data2}
          updateState={this.updateState}
        />
        <Question
          data = {data3}
          updateState={this.updateState}
        />
        <View style={styles.buttonSection}>
          <TouchableOpacity style={[styles.button]} disabled={this.state.disabled} onPress={() => this.calculateResult() } >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
        
      

      <Modal style={[styles.modal, styles.modal4]}  position={"bottom"} ref={"modal4"} onClosed={this.onClose.bind(this)}>
          {/*<Text style={styles.text}>Modal on bottom with backdrop</Text>*/}
          <Animated.View style={[styles.animationViewRes, {opacity: this.state.appearValue}, {left: this.state.yValue}]} >
      {this.renderResult1()}
      {this.renderResult2()}
      {this.renderResult3()}
        {/*<Text> score : {this.state.rslt} </Text>*/}
      </Animated.View>
          {/*<Slider style={{width: 200}} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})} />
        */}</Modal>

        
      
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cnt: {
    flex: 1,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "#add8e6",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  wrapper: {
    flexDirection: 'row',
    paddingTop: 50,
    flex: 1
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 300
  },

  buttonSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    textAlign: 'center',
    color: '#718093',
    fontSize: 16,
    //fontWeight: 'bold'
    //paddingStart: 5,
  },
  animationView: {
    flex: 1,
  },
  animationViewRes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  }
});