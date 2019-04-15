import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest(
                        '/me?fields=name,picture',
                        null,
                        this._responseInfoCallback
                      );
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    }
                  )
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};
_responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
    }
  }
module.exports = FBLoginButton;