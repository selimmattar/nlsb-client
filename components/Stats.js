import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import {
  /*LineChart,
  BarChart,
  PieChart,*/
  ProgressChart
  //ContributionGraph
} from 'react-native-chart-kit'

import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;

const data = [0.4, 0.6, 0.8];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

class Stats extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        />
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
