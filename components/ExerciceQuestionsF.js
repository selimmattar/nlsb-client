import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import QuestionF from './QuestionF';
import QuestionQ from './QuestionQ';
import RadioGroup from 'react-native-radio-buttons-group';
import Modal from 'react-native-modalbox';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MySingleton from './Singleton/MySingleton';
//import Slider from 'react-native-slider';

var { width, height } = Dimensions.get('window');

export default class Vertical extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      rslt: 0,
      scoreTab: [0, 0],
      showResult: false,
      disabled: false,
      fadeValue: new Animated.Value(1),
      appearValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      yValue: new Animated.Value(0),
      myJsx: [],
      grades: [],
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
      duration: 2000,
    }).start();
  };
  springAnimation = () => {
    Animated.spring(this.state.springValue, {
      toValue: 0.6,
      friction: 0.5,
    }).start();
  };
  appearAnimation = () => {
    Animated.timing(this.state.appearValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.back(),
    }).start();
  };
  moveAnimation = () => {
    Animated.timing(this.state.appearValue, {
      toValue: height - 200,
      duration: 2000,
    }).start();
  };
  calculateResult = async () => {
    //if (!this.state.loading) return null;
    //this.fadeAnimation();
    this.appearAnimation();
    this.springAnimation();
    const grades = this.state.grades;
    const finalGrade = grades.reduce((sum, x) => sum + x) / grades.length;
    const exercise = this.props.navigation.state.params.exercise;

    let currentUserId = '';
    let currentUserLesson = '';
    AsyncStorage.multiGet(['currentId', 'currentLesson'])
      .then(response => {
        console.log('response is ' + response);
        currentUserId = response[0][1];
        currentUserLesson = response[1][1];
        let i = -1;
        exercise.questions.forEach(question => {
          i++;
          console.log('current user lesson is ' + currentUserLesson);
          Axios.post('http://' + MySingleton.getId() + ':4000/Grade/add', {
            userId: currentUserId,
            questionId: question.id,
            grade: this.state.grades[i],
            lesson: currentUserLesson,
          })
            .then(res => console.log('res is ' + res))
            .catch(err => {
              console.log(err);
            });
        });
        this.props.navigation.navigate('Lessons');
      })
      .catch(err => {
        console.log('err retrieve ');
      });

    /*   var somme = 0;
    this.state.scoreTab.forEach(element => {
      somme += element;
    });
    this.setState({
      rslt: somme,
      disabled: true,
    });
    this.refs.modal4.open();*/

    //this.props.navigation.navigate('Lessons', {text: });
  };

  componentDidMount() {
    const jsxArr = [];
    const gradesArr = [];
    const exercise = this.props.navigation.state.params.exercise;
    console.log(exercise);
    var i = -1;
    exercise.questions.forEach(question => {
      i++;
      gradesArr.push(0);
      if (question.type == 'F') {
        const questionJsx = (
          <QuestionF
            key={i}
            content={question.content}
            question={question.question}
            answer={question.correctAns}
            UpdateStateF={this.UpdateStateF.bind(this)}
            index={i}
          />
        );
        jsxArr.push(questionJsx);
      } else if (question.type == 'Q') {
        const data = {
          question: question.question,
          choices: [
            { key: 'A', label: question.firstSugg, value: 'A' },
            { key: 'B', label: question.secondSugg, value: 'B' },
            { key: 'C', label: question.thirdSugg, value: 'C' },
          ],
          answer: question.correctAns,
          i: 2,
        };
        const questionJsx = (
          <QuestionQ
            key={i}
            data={data}
            question={question.question}
            updateState={this.updateState}
            index={i}
          />
        );
        jsxArr.push(questionJsx);
      }
    });
    this.setState({ myJsx: jsxArr, grades: gradesArr });
  }
  UpdateStateF(inputs, answers, index) {
    var counter = 0;
    for (i = 0; i < inputs.length; i++) {
      if (inputs[i] == answers[i]) counter++;
    }

    const gradesArr = this.state.grades;
    gradesArr[index] = (counter / inputs.length) * 100;
    this.setState({ grades: gradesArr });
    console.log(this.state.grades);
  }
  updateState = (selectedAnswer, correctAnswer, i, index) => {
    /*this.setState({
        score: this.state.score + childScore,
    });*/
    let arr = this.state.scoreTab;
    console.log('score from child ' + selectedAnswer);
    const gradesArr = this.state.grades;
    if (selectedAnswer === correctAnswer) {
      gradesArr[index] = 100;
      arr[i] = 1;
      this.setState({
        scoreTab: arr,
      });
    } else {
      gradesArr[index] = 0;
      let arr = this.state.scoreTab;
      arr[i] = 0;
      this.setState({
        scoreTab: arr,
      });
    }
    this.setState({ grades: gradesArr });
    console.log(gradesArr);
  };

  renderResult1() {
    if (this.state.rslt >= 1) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[
            styles.imageView,
            {
              transform: [{ scale: this.state.springValue }],
              alignSelf: 'flex-start',
            },
          ]}
        />
      );
    }
  }

  renderResult2() {
    if (this.state.rslt >= 2) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[
            styles.imageView,
            {
              transform: [{ scale: this.state.springValue }],
              alignSelf: 'center',
            },
          ]}
        />
      );
    }
  }

  renderResult3() {
    if (this.state.rslt >= 3) {
      return (
        <Animated.Image
          source={require('../assets/images/star.png')}
          style={[
            styles.imageView,
            {
              transform: [{ scale: this.state.springValue }],
              alignSelf: 'flex-end',
            },
          ]}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Animated.View
            style={[styles.animationView, { opacity: this.state.fadeValue }]}
          >
            {this.state.myJsx}
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={[styles.button]}
                disabled={this.state.disabled}
                onPress={() => this.calculateResult()}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Modal
            style={[styles.modal, styles.modal4]}
            position={'bottom'}
            ref={'modal4'}
            onClosed={this.onClose.bind(this)}
          >
            {/*<Text style={styles.text}>Modal on bottom with backdrop</Text>*/}
            <Animated.View
              style={[
                styles.animationViewRes,
                { opacity: this.state.appearValue },
                { left: this.state.yValue },
              ]}
            >
              {this.renderResult1()}
              {this.renderResult2()}
              {this.renderResult3()}
              {/*<Text> score : {this.state.rslt} </Text>*/}
            </Animated.View>
            {/*<Slider style={{width: 200}} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})} />
             */}
          </Modal>
        </ScrollView>
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
  cnt: {
    flex: 1,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  wrapper: {
    flexDirection: 'row',
    paddingTop: 50,
    flex: 1,
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 300,
  },

  buttonSection: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
