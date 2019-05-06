import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, ScrollView, Animated, Easing } from 'react-native';
import {
  LineChart,
  BarChart,
  /*PieChart,*/
  ProgressChart
  //ContributionGraph
} from 'react-native-chart-kit';
import axios from 'axios';
import { Dimensions } from 'react-native';
import MySingleton from './Singleton/MySingleton';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Dimensions.get('window').width;

const barchartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

const tabLabels =  ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'];

const graphStyle = {
  marginVertical: 8,
}

const chartConfig = {
  backgroundGradientFrom: /*'#171F33',*/ '#171F33',
  backgroundGradientTo: '#171F33',
  backgroundColor: 'white',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 1 // optional, default 3
};

class Stats extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lineChartData : {
        isFromZero: true,
        labels: [],
        datasets: [{
          data: [],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
        }]
      },
      grades: {},
      gradesTab: [0],
      gradesLabels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'],
      slicedLables: ['Level'],
      averageScore: 0,
      userScore:0,
      progressChartData: [0],
    };
  }

  componentDidMount() {
    this.setState({
      gradesTab: [0],
      slicedLables: ['Level'],
    });
    AsyncStorage.getItem('currentId').then(response => {
      axios
      .post(/*'http://' + MySingleton.getId() + ':4000*/'https://englot.herokuapp.com/Grade/getByUser', {
        userId: response,
      })
      .then(res => {
        const grades = res.data;
        this.setState({ grades });
        const tab = [];
        var score = 0;
        grades.forEach(element => {
            tab.push(Math.round(element.grade));
            console.log("elt" + element.grade)
            score = score + Math.round(element.grade);
        });
        const userMoyRound = Math.round(score / tab.length)
        const userMoy = userMoyRound / 100;
        console.log('user score', userMoy);
        const labls = this.state.gradesLabels;
        console.log('taaaaaaaaaab' + tab);
        const slicedlbls = labls.slice(0, tab.length);
        console.log('laaaaaaaabels' + slicedlbls);

        this.setState({
          gradesTab: tab,
          userScore: userMoy,
          slicedLables : slicedlbls
        });

      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoadingComplete: true });
      });})

      axios
      .get(/*'http://' + MySingleton.getId() + ':4000*/'https://englot.herokuapp.com/Grade/')
      .then(res => {
        const allGrades = res.data;
        const gradesTab = [];
        var score = 0;
        allGrades.forEach(element => {
          gradesTab.push(Math.round(element.grade));
          score = score + Math.round(element.grade);
        });
        const scoreMoyRound = Math.round(score / gradesTab.length)
        const scoreMoy = scoreMoyRound / 100 ;
        this.setState({
          averageScore: scoreMoy,
        });
        console.log('average score', scoreMoy);
      })
      .catch(err => {
        console.log(err.message);
      });

      const data = [this.state.userScore, this.state.averageScore];
      this.setState({
        progressChartData: data,
      })
      console.log('data',this.state.progressChartData);
  }

  prepareLineChartData() {
    const labls = this.state.gradesLabels;
    const tab = this.state.gradesTab;
    console.log('taaaaaaaaaab' + tab);
    const slicedlbls = labls.slice(0, tab.length);
    console.log('laaaaaaaabels' + slicedlbls);
    this.setState({slicedLables : slicedlbls})
    //const gradds = this.state.gradesTab;

    const datasets = [{
      data : tab,
      color : (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }];

    const lineChartData = {
      labels : slicedlbls,
      datasets : datasets, 
    };

    this.setState({lineChartData : lineChartData})
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.ScrollContainer}>
            <ProgressChart
        data={[this.state.averageScore, this.state.userScore]}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        />
       

        <View style={styles.seperator}></View>

    
        {/*<LineChart
        data= {{
          labels: this.state.slicedLables ,
          datasets: [{
            data: this.state.gradesTab,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
          }]
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />*/}

<BarChart
  fromZero={this.state.isFromZero}
  style={graphStyle}
  data={{
    labels: this.state.slicedLables,
    datasets: [{
      data: this.state.gradesTab
    }]
  }}
  width={screenWidth}
  height={220}
  yAxisLabel={''}
  chartConfig={chartConfig}
/>

      </ScrollView></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171F33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScrollContainer: {
    flex: 1,
  },
  seperator: {
    marginEnd: 20,
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


