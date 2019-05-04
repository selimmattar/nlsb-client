import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import {
  LineChart,
  /*BarChart,
  PieChart,*/
  ProgressChart
  //ContributionGraph
} from 'react-native-chart-kit'

import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;

const data = [0.4, 0.6, 0.8];

const data2 = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43, 7, 8, 90, 100],
    color: (opacity = 1) => `rgba(23, 31, 51, ${opacity})` // optional
    //strokeWidth: 2 // optional
  }]
}

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(23, 31, 51, ${opacity})`,
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

        <LineChart
        data={data2}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
