import React from 'react';
import { Text, ListItem, Body, Thumbnail, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


export const TopicsListItem = props => {
  const { url, title, img, description } = props.topic;
  return (
    <ListItem
      button
      onPress={() => props.TopicOverview(url, title)}
    >
      {img === '#' ? (
        <View style={styles.viewThumbnail}>
          <Text style={styles.textThumbnail}>#</Text>
        </View>
      ) : (
        <Thumbnail square source={{ uri: img }} />
      )}
      <Body>
        <Text>{title}</Text>
        <Text note>{description}</Text>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  textThumbnail: {
    width: '100%',
    textAlign: 'center',
    color: '#6a737d'
  },
  viewThumbnail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
    width: 56,
    height: 56
  }
});

const mapDispatchToProps = dispatch => ({
  TopicOverview: (url, title) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'TopicOverview',
        params: { url: url, title: title }
      })
    )
});

export default connect(
  null,
  mapDispatchToProps
)(TopicsListItem);
