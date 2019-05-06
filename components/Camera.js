import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
  Animated,
  Easing,
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import renderIf from 'render-if';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const { width, height } = Dimensions.get('window');
export default class Camera extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLib:"",
      imageCam:"",
      uploading: false,
      googleResponse: 'Analyze Me!',
      avatarLibSource: null,
      avatarCamSource: null,
      fromUriToBase64: null,
      googleApiResult: null,
      stillNoResponse: true,
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
     Animated.timing(this.state.progress, {
       toValue: 1,
       duration: 5000,
       easing: Easing.linear,
     }).start();
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
        this.setState({
          avatarCamSource: source,
          imageCam: response.data,
        });
      }
    });
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
          avatarLibSource: source,
          imageLib: response.data,
        });
      }
    });
  }
      renderLibButton(){
        if(this.state.imageLib)
        {
          return(
            <View style={{flex:1}}>
            <Image
              source={this.state.avatarLibSource}
              style={{
                margin: 2,
                borderRadius: 2,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <TouchableOpacity style={styles.secondoverlay} onPress={() => this.submitToGoogle()}>

                {renderIf(this.state.uploading)(
                  <View style={{flex:1, width:width,height:height}} >
                  <LottieView source={require('../assets/anim/4222-camera-scanning.json')} autoPlay loop style={styles.animoverlay} resizeMode="cover"/>
                  </View>
                )}
                {renderIf(!this.state.uploading || !this.state.stillNoResponse)(
                <Text style={styles.textContainer} style={{ fontWeight: 'bold',color: '#044434'}}>{this.state.googleResponse}</Text>
              )}
            </TouchableOpacity>
            </View>


          );
        }
        return(
          <TouchableOpacity
            onPress={() => this.openLibrary()}
            style={{
              margin: 2,
              borderRadius: 2,
              backgroundColor: '#f9e05e',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          <LottieView source={require('../assets/anim/70-image-icon-tadah.json')} autoPlay loop />
          </TouchableOpacity>
        );

      }
      async submitToGoogle() {
      this.setState({ uploading: true });
        try {

          let  image  = this.state.imageCam ? this.state.imageCam : this.state.imageLib;
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

      renderCamButton(){
        if(this.state.imageCam)
        {
          return(

            <View style={{flex:1}}>
          <Image
            source={this.state.avatarCamSource}
            style={{
              margin: 2,
              borderRadius: 2,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <TouchableOpacity style={styles.secondoverlay} onPress={() => this.submitToGoogle()}>

              {renderIf(this.state.uploading)(
                <View style={{flex:1, width:width,height:height}} >
                <LottieView source={require('../assets/anim/4222-camera-scanning.json')} autoPlay loop style={styles.animoverlay} resizeMode="cover"/>
                </View>
              )}
              {renderIf(!this.state.uploading || !this.state.stillNoResponse)(
              <Text style={styles.textContainer} style={{ fontWeight: 'bold',color: '#044434'}}>{this.state.googleResponse}</Text>
            )}
          </TouchableOpacity>
          </View>
        );

        }
        return(
          <TouchableOpacity
            onPress={() => this.openCamera()}
            style={{
              margin: 2,
              borderRadius: 2,
              backgroundColor: '#4195f4',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          <LottieView source={require('../assets/anim/1159-camera.json')} autoPlay loop />
          </TouchableOpacity>

        );
      }

  render() {
    return (
        <View style={{flex:1}}>
        {this.renderCamButton()}
        {this.renderLibButton()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: '50%',
      opacity: 0.5,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#d1842b',
    },
    animoverlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondoverlay: {
          flex: 1,
          position: 'absolute',
          left: 0,
          top: '50%',
          opacity: 0.5,
          width: width,
          alignItems: 'center',
          justifyContent: 'center',

        }
});
