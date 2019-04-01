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
      frequency: 1,
      numberOfWaves: 1,
      primaryWaveLineWidth: 60,
    };

    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    Dialogflow_V2.requestQuery(
      this.state.typedText,
      result => {
        console.log(result);
        if (
          JSON.parse(JSON.stringify(result)).queryResult.intent.displayName ==
          'dictionary'
        ) {
          const word = JSON.parse(JSON.stringify(result)).queryResult
            .fulfillmentMessages[0].text.text[0];

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
              var definition =
                response.data.results[0].lexicalEntries[0].entries[0].senses[0]
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
    Dialogflow_V2.requestQuery(
      this.state.results[0],
      result => {
        console.log(result);
        this.setState({
          responseMessage: JSON.parse(JSON.stringify(result)).queryResult
            .fulfillmentMessages,
        });
        console.log(this.state.responseMessage);
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
      },
      error => console.log(error),
    );
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
      /*  <View style={styles.container}>
        <Button
          style={styles.transcript}
          onPress={
            this.onPress
          }
          title="Start"
        />
        <GiftedChat
          messages={this.state.messages}
          text={this.state.typedText}
          onSend={messages => this.onSend(messages)}
          onInputTextChanged={text => this.setState({ typedText: text })}
          user={{
            _id: 1,
          }}
        />
      </View>*/
      <View style={styles.container}>
        <View style={{ position: 'absolute', bottom: 0, marginBottom: -49 }}>
          <RNSiriWaveView
            type={0}
            width={Dimensions.get('window').width}
            height={100}
            startAnimation={this.state.startAnimation}
            stopAnimation={this.state.stopAnimation}
            numberOfWaves={10}
            frequency={0.5}
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
});
