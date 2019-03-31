import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default class FillInTheBlanks extends React.Component {


  /*BackHandler.addEventListener('hardwareBackPress', function() {
    // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    // Typically you would use the navigator here to go to the last state.
  
    /*if (!this.onMainScreen()) {
      this.goBack();
      return true;
    }
    return false;
    this.props.navigation.navigate('App');
    return true;
  });*/

  render() {
    return (
      <View style={styles.container}>
      <Text>FillInTheBlanks</Text>
      <TouchableOpacity style={[styles.button]} onPress={() => {
            this.props.navigation.navigate('App');
          }}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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