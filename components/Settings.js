import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image , AsyncStorage} from 'react-native';
import { Button } from './common/Button';

class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      {this.renderButton()}
      </View>
    );
  }
  renderButton() {
    //if (this.state.isLoadingComplete) {
      return (
        <Button
          OnPress={e => {
            AsyncStorage.clear();
            this.props.navigation.navigate("Auth");
          }}
        >
          Sign Out
        </Button>
      );
    //}
    //return <Spinner size="small" />;
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
  }
});

export default Settings;