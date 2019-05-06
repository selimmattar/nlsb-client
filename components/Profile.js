import React, { Component } from 'react';
import { Button } from './common/Button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  LineChart,
  BarChart,
  /*PieChart,*/
  ProgressChart
  //ContributionGraph
} from 'react-native-chart-kit';
import axios from 'axios';
import Container from './Container';
import AsyncStorage from '@react-native-community/async-storage';
import MySingleton from './Singleton/MySingleton';

const graphStyle = {
  marginVertical: 8,
}
const screenWidth = Dimensions.get('window').width;
const chartConfig1 = {
  backgroundGradientFrom: /*'#171F33',*/ '#fff',
  backgroundGradientTo: '#fff',
  backgroundColor: '#fff',
  color: (opacity = 1) => `rgba(1, 169, 219, ${opacity})`,
  strokeWidth: 1 // optional, default 3
};
const chartConfig2 = {
  backgroundGradientFrom: /*'#171F33',*/ '#fff',
  backgroundGradientTo: '#fff',
  backgroundColor: '#fff',
  color: (opacity = 1) => `rgba(4, 68, 52, ${opacity})`,
  strokeWidth: 1 // optional, default 3
};

const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];
const userLevels = [
  'DEADPOOL',
  'CAPTAIN AMERICA',
  'IRON MAN',
  'GHOST RIDER',
  'THANOS',
];
const { height } = Dimensions.get('window');

const configs = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};
export default class Profile extends Component {
  state = {
    screenHeight: height,
    current: 0,
    firstName: '',
    lastName: '',
    userLevel: '',
    image: 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png',
    imageFb: '',
    username: '',
    password: '',
    isFbLogged: false,
    avatarImage: 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png',

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
    averageScore: 0.0,
    userScore: 0.0,
    progressChartData: [0.0, 0.0],
    userProgress: 0,

  };


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

        if (tab.length == 0) {
          this.setState({
            userScore: 0.0,
            gradesTab: [0],
            slicedLables : ['Level'],
          });
        } else {
          this.setState({
            userScore: userMoy,
            gradesTab: tab,
            slicedLables : slicedlbls
          })
        }

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

      AsyncStorage.getItem('fb_id').then(
        response => {
          this.setState({
            imageFb : 'https://graph.facebook.com/'+response+'/picture?width=9999&height=9999',
            isFbLogged: true,
          })
        }
      );
      console.log("isFbLogged", this.state.isFbLogged);
      const imgUrl = this.state.imageFb;

      if (this.state.isFbLogged) {
        this.setState({
          avatarImage : imgUrl,
        })
      } else {
        this.setState({
          avatarImage : 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png',
        })
      }
  }

  componentWillMount() {
    AsyncStorage.multiGet([
      'currentFirstname',
      'currentLastname',
      'currentLesson',
    ])
      .then(response => {
        console.log(response[0][1]); // Value1

        console.log(response[1][1]); // Value2
        console.log(Math.floor(parseInt(response[2][1]) / 10)); // Value2
        this.setState({
          firstName: response[0][1],
          lastName: response[1][1],
          userLevel: userLevels[Math.floor(parseInt(response[2][1]) / 10)],
        });
      })
      .catch(err => {
        console.log('err retrieve ');
        this.props.navigation.navigate('Auth');
      });
    
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <View style={styles.container}>
        <Container>
          <View style={styles.header} >
            <Text style={[styles.info, styles.content]}>
                {this.state.userLevel}
            </Text>
          </View>

          <Image
            style={styles.avatar}
            source={{
              uri: this.state.avatarImage,
            }}
          />

          <View style={styles.body}>

            <View style={styles.bodyContent}>

              <Text style={[styles.name, styles.content]}>
                {this.state.firstName + ' ' + this.state.lastName}
              </Text>

              <View style={styles.chartContainer}>
              <Text style={styles.description}>
                Your score vs. the average score
              </Text>
              <ProgressChart
              data={[this.state.averageScore, this.state.userScore]}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig1}
              />
              </View>

              <View style={styles.chartContainer}>
              <Text style={styles.description}>
                Levels' scores
              </Text>
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
              chartConfig={chartConfig2}
              />
              </View>

              {/*{this.renderButtonStats()}*/}

              <Text style={[styles.description, styles.content]}>
                Change your credentials
              </Text>


              <TextInput
              style={styles.Input}
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="username"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={username => this.setState({ username })}
              secureTextEntry={false}
              returnKeyType="next"
              OnSubmitEditing={() => {
                this.secondTextInput.current.focus();
              }}
            />
            <TextInput
              style={styles.Input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              label="password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              returnKeyType="next"
              OnSubmitEditing={() => {
                this.secondTextInput.current.focus();
              }}
            />
              {this.renderButtonUpdate()}

              {this.renderButton()}
            </View>
          </View>
        </Container>
      </View>
    );
  }
  onPageChange(position) {
    this.setState({ current: position });
  }
  renderButton() {
    //if (this.state.isLoadingComplete) {
      return (

        <TouchableOpacity style={styles.logoutButton}
        
          onPress={e => {
            AsyncStorage.clear();
            this.props.navigation.navigate("Auth");
          }}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

      );
    //}
    //return <Spinner size="small" />;
  }

  renderButtonStats() {
    //if (this.state.isLoadingComplete) {
      return (
        <TouchableOpacity
                style={[styles.buttonContainer, styles.content]}
                onPress={e => {
                  //AsyncStorage.clear();
                  this.props.navigation.navigate("Stats");
                }}
              >
                <Text style={styles.buttonText}>Statistics</Text>
              </TouchableOpacity>
      );
    //}
    //return <Spinner size="small" />;
  }

  renderButtonUpdate() {
    //if (this.state.isLoadingComplete) {
      return (
        <TouchableOpacity
                style={[styles.buttonContainer, styles.content]}
                onPress={e => {
                  //this.setState({ isLoadingComplete: false });
                  console.log('effff');
                  AsyncStorage.getItem('currentId').then(response => {
                    axios
                    .post(/*'http://' + MySingleton.getId() + ':4000*/'https://englot.herokuapp.com/users/updateUser', {
                      id: response,
                      username: this.state.username,
                      password: this.state.password,
                    })
                    .then(res => {
                      this.props.navigation.navigate("Settings");
                    })
                    .catch(err => {
                      console.log(err);
                      this.setState({ isLoadingComplete: true });
                    });})
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
      );
    //}
    //return <Spinner size="small" />;
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#01A9DB',
    height: 150,
  },

  chartContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    //marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
  },

  buttonText: {
    color: 'white',
    justifyContent: 'center',
  },

  description: {
    fontSize: 14,
    color: '#696969',
    textAlign: 'center',
  },

  buttonContainer: {
    //marginTop: 10,
    height: 45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#01A9DB',
  },
  logoutButton: {
    marginTop: 30,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#D82735',
  },
  scrollview: {
    flexGrow: 1,
  },
  Input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 30,
  },
});
