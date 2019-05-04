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
} from 'react-native';
import Container from './Container';
import AsyncStorage from '@react-native-community/async-storage';
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
  };
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
          <View style={styles.header} />

          <Image
            style={styles.avatar}
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            }}
          />

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={[styles.name, styles.content]}>
                {this.state.firstName + ' ' + this.state.lastName}
              </Text>
              <Text style={[styles.info, styles.content]}>
                {this.state.userLevel}
              </Text>
              <Text style={[styles.description, styles.content]}>
                Welcome to your profile
              </Text>
              {this.renderButtonStats()}
              <TouchableOpacity
                style={[styles.buttonContainer, styles.content]}
              >
                <Text>Opcion 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.content]}
              >
                <Text>Opcion 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.content]}
              >
                <Text>Opcion 1</Text>
              </TouchableOpacity>
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
                <Text>Statistics</Text>
              </TouchableOpacity>
      );
    //}
    //return <Spinner size="small" />;
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
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
    marginTop: 130,
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
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
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
});
