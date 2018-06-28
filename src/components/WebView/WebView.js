import React, { Component } from 'react';
import { WebView as Web } from 'react-native';

class WebView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'GitHub'),
      headerStyle: {
        backgroundColor: '#24292e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    };
  };
  render() {
    const { navigation } = this.props;
    const url =
      navigation.getParam('url', 'https://github.com') +
      '/blob/master/README.md';
    return (
      <Web
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        source={{ uri: url }}
      />
    );
  }
}

export default WebView;
