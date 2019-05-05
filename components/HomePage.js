import React from 'react'

import { StyleSheet, View, Text , Alert , Button , Image , TextInput } from 'react-native'
//import gi from 'google-images'

class HomePage extends React.Component {

  state = {
    image_text : 'book' ,
    image_url : 'https://bootdey.com/img/Content/avatar/avatar6.png'
  };
json_function = () =>{
  fetch('https://www.googleapis.com/customsearch/v1?q='+this.state.image_text+'&searchType=image&key=AIzaSyBhZTG6sKJGJOEALitQQbzY1QeuDFAlmAM&cx=008891785920372734137:v4qop8avcnq').then(response => response.json())
  .then (data => {
    var json_fragment = data.items[0].link;
    this.setState({ image_url: json_fragment });
    Alert.alert('json text ', json_fragment)
  })
  .catch(error => Alert.alert(error));
}
  
  render() {
    console.log(this.props);
    return (

      <View style={styles.main_container}>
      <TextInput
      onChangeText={text => this.setState({ image_text : text })}
      />
        <Button
        title = "go"
        onPress={this.json_function}
        >


        </Button>
        <Image
          style={styles.image}
          source={{uri: this.state.image_url}}
        />
      </View>

    )

  }

}


const styles = StyleSheet.create({

  main_container: {

    flex: 1,

  },
  image : {
    width: 100,
    height: 100,
  }

})


export default HomePage