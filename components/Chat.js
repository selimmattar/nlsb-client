/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Voice from 'react-native-voice';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import Tts from 'react-native-tts';
import axios from 'axios';
import RNSiriWaveView from 'react-native-siri-wave-view';
import ActionButton from 'react-native-circular-action-menu';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import renderIf from 'render-if';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage,
} from 'react-native-gifted-chat';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const lessonsCodes = [
  'VnDXB3Fnr',
  '8MPpnBgpB',
  'ZB6x8WaQy',
  '2Vlk+xS0D',
  'vJEv+qVF1',
  'C50+pHCSI',
  'dpTcZGMIP',
  'XAEaBaEbX',
  '1HRT5MVh5',
  'yRNSXkk8H',
  'qMTw+A7Qi',
];
const lessonsNum = [
  '1',
  '2',
  '3',
  '11',
  '12',
  '13',
  '21',
  '22',
  '31',
  '41',
  '42',
];
export default class Chat extends Component {
  constructor(props) {
    super(props);
    Dialogflow_V2.setConfiguration(
      'englot@aproject-d348b.iam.gserviceaccount.com',
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWVw5vc5TQ+10G\nv2Zv26u+2pSA11RqtL6q2sKyqEn37wmFGQkCjF2ufoK2bPHzSD+fy45m9aenOkzq\nEgNSOzuyNZd/1RW1S1Gxt+0i4o/0bDLEHtcMWoFbWhkFRVwOWK/U8oFKcBOp36vh\nIftI3Nr7SAdV9ksU2w+IwcJRAoN0Ox3ppCqQOX+/+YXEjcrOq9kSExWqfPMGnxCc\nSveLvsTLMo3wcZPgQ2tlXO2VB8hDgsonceUtXanGa1YTm91I+K8mtxGW1RWvFQyn\nkoJsVywGHYMZWbna3Xq3JyMAS/0J/92uCIiNRcgG77Q27hcu8ars0cPrjOZtFXZe\nDb259UvZAgMBAAECggEAEtckGvl8G9h0ZwUTfE8mLcvMsnzJunmeL2Es5yDJ7EVL\nhx+FDomyr8xw6xWqGJfkSU1EMkj00rMusmLBgcukhofKzZ1RlB+1RDVNhYKpEbOB\nhSxsPMMW1PDsk8mGaNHabzBY3ZBAFpjOPG96wz3SP41eRfqQnDN7teK6TFapTKZu\nneK/YTP2fQqyM7b0ARwAnDNnqCaF/AYaJGpBTdYIYHkyYf8E4yrhDrzmbE6JoE0U\noZ4FX0s7/mAcNplDVsk6ylzFJriuH2mheHk6Vbrm3PAZzuup/fGXGPGaRryz5UBi\nVEUztnJwNSI2EzG12LNyLLthhgIpvtURbpVgHxiFRQKBgQDUJjxf2ea8FRouDZ6I\nXH2S7uw5kkkOo4AqwxXhN1Axjxr1c5iRnKtiGeYZXszAII3e/2lSzh4u/y64Tf+Q\nIkG+MM/lbzk87/8w394W86Kc9X2oujDO7bpR7RE8Uw/I8iz7OaQ0atpPyHr9/47L\nfW8YtlHvUPEQDcLWlQrlUTX19wKBgQC1ajdoV0ZmQCPoxHUk1R1Lhf3gIRyalywL\n5BrB2yN60BHlYNgrvuD/nOG8w/ZVwU9YWsoLfT7w1OLT/FyPess3Cyy6ZlQJHpkm\njczU+8yihSOt5C3YZHA15TZ/hjX7HZTegb9Qj5KhTu6Ml3H3Hbk3WLTvtbSQHXdV\nlH7ZZFUYrwKBgQCx/C404HRjIXUoZAa4Mpir2EVZe7BNVsDln2xQ2f4uxfgBK205\n5O4oTMAuUsmG+wjrqO7tKL5MAY1p1Q5vFz5+2SbiP3EO/e7kSz1hlh+8fX1iPGtM\ngEgMCc+nA6y/kuZIEzD/RRJJU1JUnL5pXKADZJrTI95K8LChJMPSZlLWOwKBgCIf\na3KVz+kVsWtr4HjgGRWGi30n3UB6pM9LxXinJmJIVsVlVOPNkHaj5JXj6iaxKKJ+\n2TgWA8u6zzt+YU6fky+0S2J4MuBQQBBPZbK99fyvvElN/Q2RvsV0aq7L6MVmCAVe\nNEUL7FGpDheluMr5bUgqyEW6UM82q6aOOtnbFGKDAoGAKb3Oilppb/PtEkIsU1Oq\nJGIcs5POa1gWyL9gxT8O+LypB90eWW78gu42AZyiq7bJodT7/1hWFxEzg2yoS3Y/\ni0DDoaiikgPTT029XORevuIh0YP6pJNt6970UA9tbTO0c8qneQZJ7+a2IaiVs7G5\n6EwzZeoJqgFyGqtlwcQiK5Y=\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_ENGLISH,
      'aproject-d348b',
    );
    Tts.setDefaultLanguage('en-IE');
    this.state = {
      recognized: '',
      started: '',
      results: [],
      responseMessage: [],
      messages: [],
      typedText: '',
      startAnimation: true,
      stopAnimation: false,
      frequency: 0,
      numberOfWaves: 1,
      primaryWaveLineWidth: 20,
    };
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
  componentDidMount() {
    Tts.addEventListener('tts-start', event => {
      this.setState({ frequency: 0, primaryWaveLineWidth: 80 });
    });
    Tts.addEventListener('tts-finish', event => {
      this.setState({ frequency: 0.5, primaryWaveLineWidth: 20 });
    });
  }
  componentWillMount() {
    this.setState({
      messages: [],
    });
  }
  CommunicateDialogFlow(TextToSend) {
    Dialogflow_V2.requestQuery(
      TextToSend,
      result => {
        const intent = JSON.parse(JSON.stringify(result)).queryResult.intent
          .displayName;
        console.log(result);
        if (intent == 'heyUsername') {
          var currentUsername;
          AsyncStorage.getItem('currentUsername')
            .then(response => {
              console.log(response);
              currentUsername = response;
              Dialogflow_V2.requestQuery(
                'username is ' + currentUsername,
                result => {
                  this.setState({
                    responseMessage: JSON.parse(JSON.stringify(result))
                      .queryResult.fulfillmentMessages,
                  });
                  for (var t of this.state.responseMessage) {
                    console.log(t.text.text[0]);
                    Tts.speak(t.text.text[0]);
                    var chatmsg = {
                      _id: this.state.messages.length + 1,
                      text: t.text.text[0],
                      createdAt: new Date(),
                      user: {
                        _id: 2,
                      },
                    };
                    this.setState(previousState => ({
                      messages: GiftedChat.append(
                        previousState.messages,
                        chatmsg,
                      ),
                    }));
                  }
                },
                error => console.log(error),
              );
            })
            .catch(err => {
              console.log('err retrieve ');
              console.log(err);
            });
        } else if (intent == 'dictionary') {
          const word = JSON.parse(JSON.stringify(result)).queryResult
            .fulfillmentMessages[0].text.text[0];
          console.log(word);
          axios
            .get(
              'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word,
              {
                headers: {
                  app_id: 'd42dadb5',
                  app_key: '8b213c8476aae12aafb72adca33556df',
                },
              },
            )
            .then(response => {
              console.log('response');
              console.log(response);
              const { data } = response;
              const definition =
                data.results[0].lexicalEntries[0].entries[0].senses[0]
                  .definitions[0];

              var chatmsg = {
                _id: this.state.messages.length + 1,
                text: definition,
                createdAt: new Date(),
                user: {
                  _id: 2,
                },
              };
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, chatmsg),
              }));
              Tts.speak(definition);
            })
            .catch(function(error) {
              console.log('error');
              console.log(error);
            });
        } else if (intent == 'InitialIntent - yes') {
          var currentUserLesson;
          AsyncStorage.getItem('currentUserLesson')
            .then(response => {
              console.log(response);
              currentUserLesson = response;
              Dialogflow_V2.requestQuery(
                lessonsCodes[lessonsNum.indexOf(currentUserLesson)],
                result => {
                  this.setState({
                    responseMessage: JSON.parse(JSON.stringify(result))
                      .queryResult.fulfillmentMessages,
                  });
                  for (var t of this.state.responseMessage) {
                    console.log(t.text.text[0]);
                    Tts.speak(t.text.text[0]);
                    var chatmsg = {
                      _id: this.state.messages.length + 1,
                      text: t.text.text[0],
                      createdAt: new Date(),
                      user: {
                        _id: 2,
                      },
                    };
                    this.setState(previousState => ({
                      messages: GiftedChat.append(
                        previousState.messages,
                        chatmsg,
                      ),
                    }));
                  }
                },
                error => console.log(error),
              );
            })
            .catch(err => {
              console.log('err retrieve ');
              console.log(err);
            });
        } else {
          this.setState({
            responseMessage: JSON.parse(JSON.stringify(result)).queryResult
              .fulfillmentMessages,
          });
          for (var t of this.state.responseMessage) {
            console.log(t.text.text[0]);
            Tts.speak(t.text.text[0]);
            var chatmsg = {
              _id: this.state.messages.length + 1,
              text: t.text.text[0],
              createdAt: new Date(),
              user: {
                _id: 2,
              },
            };
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, chatmsg),
            }));
          }
        }
      },
      error => console.log(error),
    );
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    this.CommunicateDialogFlow(this.state.typedText);
  }
  onSpeechEndHandler(e) {
    this.setState({ frequency: 0.5, primaryWaveLineWidth: 20 });
  }

  onSpeechStartHandler(e) {
    this.setState({ frequency: 1.5, primaryWaveLineWidth: 70 });
  }
  onSpeechResults(e) {
    console.log(e);
    this.setState({
      results: e.value,
    });
    var chatmsg = {
      _id: this.state.messages.length + 1,
      text: this.state.results[0],
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, chatmsg),
    }));
    this.CommunicateDialogFlow(this.state.results[0]);
  }
  onPress = () => {
    this._startRecognition();
  };
  animateWave() {
    //var frequency = this.state.frequency;
    var primaryWaveLineWidth = this.state.primaryWaveLineWidth;
    var frequency =
      Math.random() * (frequency + 2 - (frequency - 2)) + (frequency - 2);
    primaryWaveLineWidth =
      Math.random() * (primaryWaveLineWidth + 2 - (primaryWaveLineWidth - 2)) +
      (primaryWaveLineWidth - 2);

    if (frequency > 0) this.setState({ frequency });
    console.log('frequency is ${frequency}');
    if (primaryWaveLineWidth > 0) this.setState({ primaryWaveLineWidth });
    if (this.state.startAnimation)
      setTimeout(this.animateWave.bind(this), 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.9, backgroundColor: '#fff' }}>
          <GiftedChat
            messages={this.state.messages}
            text={this.state.typedText}
            onSend={messages => this.onSend(messages)}
            onInputTextChanged={text => this.setState({ typedText: text })}
            user={{
              _id: 1,
            }}
          />
        </View>

        {/*Rest of App come ABOVE the action button component!*/}
        {renderIf(this.state.typedText == '')(
          <View
            style={{
              flex: 0.1,
              backgroundColor: '#fff',
            }}
          >
            <ActionButton autoInactive={false} buttonColor="#00a8ff">
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="New Task"
                onPress={() => console.log('yayyyyyyy')}
              >
                <MaterialsIcon name="chat" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor="#3498db"
                title="Microphone"
                onPress={this._startRecognition.bind(this)}
              >
                <MaterialsIcon name="mic" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>,
        )}
        <View style={{ bottom: 0, marginBottom: -39 }}>
          <RNSiriWaveView
            type={0}
            width={Dimensions.get('window').width}
            height={55}
            startAnimation={this.state.startAnimation}
            stopAnimation={this.state.stopAnimation}
            numberOfWaves={10}
            frequency={1.9}
            waveColor="#BA55D3"
            primaryWaveLineWidth={this.state.primaryWaveLineWidth}
          />
        </View>
      </View>
    );
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
