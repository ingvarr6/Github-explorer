import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Spinner } from 'native-base';

import TopicsListItem from './TopicsListItem';

class Topics extends Component {
  componentDidMount() {
    this.props.loadTopics();
  }

  render() {
    const { topics, isLoading } = this.props;
    return (
      <React.Fragment>
        {isLoading ? (
          <View style={styles.spinner}>
            <Spinner color="#24292e" />
          </View>
        ) : (
          <View>
            <FlatList
              data={topics}
              renderItem={({ item }) => (
                <TopicsListItem
                  topic={item}
                  isLoading={isLoading}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Topics;
