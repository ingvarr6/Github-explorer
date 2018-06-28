import React, { Component } from 'react';
import { View, Text, ListItem, Body, Right, Button, Icon } from 'native-base';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { connect } from 'react-redux';
import { toBookmark } from '../../actions/trendsAction';

class Bookmarks extends Component {
  static navigationOptions = {
    title: 'Bookmarks',
    headerStyle: {
      backgroundColor: '#24292e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  state = {
    isLoading: false,
    trends: []
  };

  componentDidMount() {
    this.setState({ trends: this.props.trends });
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.trends) !== JSON.stringify(this.state.trends)
    ) {
      this.setState({ trends: nextProps.trends });
    }
  }

  openWeb = (url) =>{
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { trends } = this.state;
    return (
      <View style={styles.content}>
        {trends === 0 ? (
          <Text>Empty</Text>
        ) : (
          <FlatList
            data={trends}
            keyExtractor={(item, index) => item.href}
            renderItem={({ item }) => (
              <ListItem button onPress={() => this.openWeb(item.href)}>
                <Body>
                  <Text style={{ marginBottom: 7 }}>{item.name}</Text>
                  <Text note style={{ marginBottom: 7 }}>
                    {item.description}
                  </Text>
                  <Text>{item.href}</Text>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.props.removeBookmark(item)}
                  >
                    <Icon
                      ios="ios-close-circle-outline"
                      android="md-close-circle"
                      style={{ fontSize: 28, color: '#ff3b30' }}
                    />
                  </Button>
                </Right>
              </ListItem>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: { backgroundColor: '#fff', flex: 1 }
});

const mapStateToProps = state => {
  return {
    trends: state.trends.trends.filter(trend => {
      if (trend.isBookmark === true) {
        return trend;
      }
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeBookmark: id => {
      dispatch(toBookmark(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookmarks);
