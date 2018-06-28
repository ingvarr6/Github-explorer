import React from 'react';
import { ListItem, Body, Text, Icon, Right, View, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const TrendingListView = props => {
  const {
    href,
    name,
    author,
    description,
    stars,
    forks,
    language,
    isBookmark
  } = props;
  return (
    <ListItem button onPress={() => props.webViewScreen(name, href)}>
      <Body>
        <Text style={{ paddingBottom: 10 }}>
          {author} / {name}
        </Text>
        <Text note style={{ paddingBottom: 10 }}>
          {description}
        </Text>
        <View style={styles.viewInline}>
          <View
            style={[styles.languageColor, { backgroundColor: language.color }]}
          />
          <Text>{language.name}</Text>
        </View>
      </Body>
      <Right>
        <Button transparent onPress={() => props.onBookmark(props)}>
          <Icon
            ios="ios-bookmark-outline"
            android="ios-bookmark-outline"
            style={[styles.iconBtn, isBookmark ? { color: 'red' } : '']}
          />
        </Button>
        <Text>
          <Icon name="ios-star" style={{ fontSize: 14 }} /> {stars}
        </Text>
        <Text>
          <Icon name="md-git-branch" style={{ fontSize: 14 }} /> {forks}
        </Text>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  languageColor: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginRight: 5
  },
  viewInline: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBtn: {
    fontSize: 30,
    color: '#007aff'
  }
});

const mapDispatchToProps = dispatch => ({
  webViewScreen: (name, url) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'WebView',
        params: { name: name, url: url }
      })
    )
});

export default connect(
  null,
  mapDispatchToProps
)(TrendingListView);
