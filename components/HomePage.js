import React from 'react'

import { StyleSheet, View, Text } from 'react-native'


class HomePage extends React.Component {

  render() {
    console.log(this.props);
    return (

      <View style={styles.main_container}>

        <Text> Token : {this.props.navigation.state.params.token}</Text>
        <Text> Username : {this.props.navigation.state.params.currentUser.username}</Text>

      </View>

    )

  }

}


const styles = StyleSheet.create({

  main_container: {

    flex: 1,

  }

})


export default HomePage