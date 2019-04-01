import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';

class Stats extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Stats</Text>
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
});

export default Stats;
