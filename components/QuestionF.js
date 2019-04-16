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
import BlankInput from './BlankInput';
let G_index = 0;
export default class Exercise extends React.Component {
  state = {
    type: '',
    question: '',
    content: '',
    lastTypedText: '',
    jsx: [],
    Inputs: [],
    inputsNbr: 0,
    answers: [],
    qcmcontent: ['first choice', 'second choice', 'third choice'],
    choiceBckg: '#FFFFFF',
  };
  componentDidMount() {
    this.setState({
      question: this.props.question,
      content: this.props.content,
    });
    this.prepareExercise(this.props.content, this.props.answer);
  }

  UpdateInputs(index) {
    const myInputs = this.state.Inputs;
    G_index = index;
    myInputs[index] = this.state.lastTypedText;

    this.setState({ Inputs: myInputs, lastTypedText: '' });

    this.props.Inputs = myInputs;
  }
  componentWillUpdate(nextProps, nextState) {
    const myInputs = nextState.Inputs;
    myInputs[G_index] = nextState.lastTypedText;
    this.props.UpdateStateF(myInputs, this.state.answers, this.props.index);
  }
  onChange() {
    this.UpdateInputs(this.index);
  }

  onChangeText(lastTypedText) {
    this.setState({ lastTypedText });
  }
  prepareExercise(content, answer) {
    var myAnswers = [];
    var Myjsx = [];

    while (answer.length > 0) {
      if (answer.indexOf('-') > -1) {
        var c = answer.substring(0, answer.indexOf('-'));
        myAnswers.push(c);
        answer = answer.substring(answer.indexOf('-') + 1, answer.length);
      } else {
        myAnswers.push(answer);
        answer = '';
      }
    }

    this.setState({ answers: myAnswers });

    var i = -1;
    var k = -1;
    var MyInputs = [];
    while (content.length > 0) {
      k++;
      if (content.indexOf('&') > -1) {
        i++;
        var c = content.substring(0, content.indexOf('&'));
        const text = (
          <Text key={k} style="display : inline;">
            {c}
          </Text>
        );
        //   console.log(myAnswers[i]);
        const input = (
          /*  <BlankInput
            index={i}
            key={++k}
            CorrectAnswer={myAnswers[i]}
            UpdateStateF={this.UpdateStateF}
          />*/
          <TextInput
            key={++k}
            index={i}
            Inputs={this.state.Inputs}
            onChangeText={text => this.onChangeText(text)}
            UpdateInputs={index => this.UpdateInputs(index)}
            onChange={this.onChange}
            style="display : inline;"
            style={{ width: '15%' }}
          />
        );

        Myjsx.push(text);
        Myjsx.push(input);
        MyInputs.push('');
        console.log(Myjsx);
        content = content.substring(content.indexOf('&') + 2, content.length);
      } else {
        const text = (
          <Text key={k} style="display : inline;">
            {content}
          </Text>
        );

        Myjsx.push(text);
        content = '';
      }
    }
    this.setState({ jsx: Myjsx });

    this.setState({ Inputs: MyInputs });
  }

  prepareQCM() {
    var Myjsx = [];
    var choicebckg = this.state.choiceBckg;

    this.state.qcmcontent.forEach(function(el) {
      const text = (
        <TouchableHighlight>
          <Text
            ref={component => (this._text = component)}
            style={{ fontSize: 15 }}
            onPress={this._onpress}
          >
            {el}
          </Text>
        </TouchableHighlight>
      );
      Myjsx.push(text);
    });
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
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  FIBcontainerIn: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
