import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import BrickList from 'react-native-masonry-brick-list';

export default class GridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Just id (unique) and span (1,2,3, ...) is required
      data: [
        { id: 1, name: 'Red', color: '#f44336', span: 1 },
        { id: 2, name: 'Pink', color: '#E91E63', span: 2 },
        { id: 3, name: 'Purple', color: '#9C27B0', span: 3 },
        { id: 4, name: 'Deep Purple', color: '#673AB7', span: 1 },
        { id: 5, name: 'Indigo', color: '#3F51B5', span: 1 },
        { id: 6, name: 'Blue', color: '#2196F3', span: 1 },
        { id: 7, name: 'Light Blue', color: '#03A9F4', span: 3 },
        { id: 8, name: 'Cyan', color: '#00BCD4', span: 2 },
        { id: 9, name: 'Teal', color: '#009688', span: 1 },
        { id: 10, name: 'Green', color: '#4CAF50', span: 1 },
        { id: 11, name: 'Light Green', color: '#8BC34A', span: 2 },
        { id: 12, name: 'Lime', color: '#CDDC39', span: 3 },
        { id: 13, name: 'Yellow', color: '#FFEB3B', span: 2 },
        { id: 14, name: 'Amber', color: '#FFC107', span: 1 },
        { id: 15, name: 'Orange', color: '#FF5722', span: 3 },
      ],
    };
  }
  render() {
    return (
      <BrickList
        data={this.state.data}
        renderItem={prop => this.renderView(prop)}
        columns={3}
      />
    );
  }
  _onPress() {
    console.log(this.children.props.children);
  }
  renderView = prop => {
    return (
      <TouchableOpacity
        onPress={this._onPress}
        key={prop.id}
        style={{
          margin: 2,
          borderRadius: 2,
          backgroundColor: prop.color,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{prop.name} </Text>
      </TouchableOpacity>
    );
  };
}
