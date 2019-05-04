import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import {
  LineChart,
  /*BarChart,
  PieChart,*/
  ProgressChart
  //ContributionGraph
} from 'react-native-chart-kit';
import axios from 'axios';
import { Dimensions } from 'react-native';
import MySingleton from './Singleton/MySingleton';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Dimensions.get('window').width;

//const height = Dimensions.get('window');

const data = [0.4, 0.6, 0.8];
const tab = [];
const tabLabels =  ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'];

//const tab = []

/*const data2 = {
  labels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'],
  datasets: [{
    data: this.state.gradesTab,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` // optional
    //strokeWidth: 1 // optional
  }]
}*/



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
        labels: [],
        datasets: [{
          data: [],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
        }]
      },
      //screenHeight: height,
      grades: {},
      gradesTab: [0],
      gradesLabels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'],
      slicedLables: ['Level']
    };
  }

  

  componentDidMount() {
    AsyncStorage.getItem('currentId').then(response => {
      axios
      .post('http://' + MySingleton.getId() + ':4000/Grade/getByUser', {
        userId: response,
      })
      .then(res => {
        const grades = res.data;
        this.setState({ grades });

        grades.forEach(element => {
          /*data
            .find(obj => {
              return obj.key == element.lesson;
            })*/
            tab.push(Math.round(element.grade));
            console.log("elt" + element.grade)
        });

        this.setState({gradesTab: tab});

        const labls = this.state.gradesLabels;
        console.log('taaaaaaaaaab' + tab);
        const slicedlbls = labls.slice(0, tab.length);
        console.log('laaaaaaaabels' + slicedlbls);
        this.setState({slicedLables : slicedlbls})

        //this.prepareLineChartData();

        /*var labls = this.state.gradesLabels
        labls.slice(tab.length, 11 - tab.length);*/

        /*const lineChartData = {
          labels : ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11'],
          datasets : [{
            data : [1, 1, 2, 5, 42, 2, 2, 5,8 , 10, 5],
            color : (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }]
        }*/

        //this.setState({ gradesTab: tab });
        
        //this.setState({ lineChartData : lineChartData });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoadingComplete: true });
      });})
    
            //console.log("looooooooooog" + this.state.grades);
                
    /*axios
      .get('http://' + MySingleton.getId() + ':4000//getById/')
      .then(res => {
        const lessons = res.data;
  
        lessons.forEach(element => {
          data
            .find(obj => {
              return obj.key == element.lesson;
            })
            .questions.push({ ...element, type: 'F' });
        });
      })
      .catch(err => {
        console.log(err.message);
      });*/
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
    //console.log("dataaaaaaaa" + lineChartData.labels + lineChartData.datasets[0].data + lineChartData.datasets[0].color);
  }

  render() {
    //const scrollEnabled = this.state.screenHeight > height;
    return (
      
      <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        />

        <View style={styles.seperator}></View>

    
        <LineChart
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
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171F33',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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


