import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import loading0 from '../assets/anim/loading0.json';
import loading1 from '../assets/anim/loading1.json';

import {
  TouchableHighlight,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class GoogleAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      uploading: false,
      googleResponse: '',
      avatarSource: null,
      fromUriToBase64: null,
      googleApiResult: null,
      stillNoResponse: false,
      animation: '',
    };
  }

  openLibrary() {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          image: response.data,
        });
      }
    });
  }
  openCamera() {
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //console.log("data:", response.data);
        //console.log("uri:", response.uri);
        //console.log("source: ", source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          image: response.data,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.openLibrary()}
          title="Library!"
        />
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.submitToGoogle()}
          title="Analyze!"
        />

        <AwesomeButtonRick
          title="Open Me!"
          onPress={() => this.openCamera()}
          style={styles.rickBtn}
          raiseLevel={10}
          width={50}
        >
          <Icon type="ionicon" name="ios-camera" size={40} color="#4F8EF7" />
        </AwesomeButtonRick>
        <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
          {this.state.googleResponse}
        </Text>
        <Image
          source={this.state.avatarSource}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }

  async submitToGoogle() {
    this.setState({ stillNoResponse: true });
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'LANDMARK_DETECTION', maxResults: 5 },
              { type: 'FACE_DETECTION', maxResults: 5 },
              { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'CROP_HINTS', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 },
            ],
            image: {
              content: image,
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyASnlJ-3UZgiZdUgpKwo67OLU-DwyX8kgc',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson.responses[0].labelAnnotations[0].description);
      //responses[""0""].labelAnnotations[""0""].description
      this.setState({
        googleResponse:
          responseJson.responses[0].labelAnnotations[0].description,
        uploading: false,
        stillNoResponse: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  rickBtn: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
});
