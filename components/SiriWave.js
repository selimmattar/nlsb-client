import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import RNSiriWaveView from 'react-native-siri-wave-view'
import { Button } from './common/Button';

export default class SiriWave extends Component {
  constructor (props) {
    super(props)

    this.state = {
      startAnimation: true,
      stopAnimation: false,
      frequency : 0 , 
      numberOfWaves : 1 
    }
  }

  render() {
    return <View style={styles.container}>
        <RNSiriWaveView type={0} width={200} height={200} startAnimation={true} stopAnimation={this.state.stopAnimation}
        numberOfWaves={this.state.numberOfWaves} frequency = {this.state.frequency} 
        />
        <TouchableOpacity style={[styles.button]} onPress={() => {
            this.setState({
              startAnimation: true,
              stopAnimation: false
            });
          }}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => {
            this.setState({
              startAnimation: false,
              stopAnimation: true
            });
          }}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column"
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "#add8e6",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});