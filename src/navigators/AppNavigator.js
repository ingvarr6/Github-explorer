import React from 'react';
import { connect } from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { Icon } from 'native-base';

import Explore from '../components/Explore';
import Bookmarks from '../components/Bookmarks/Bookmarks';
import WebView from '../components/WebView/WebView';
import Topics from '../components/Topics/Topics';
import TopicOverview from '../components/Topics/TopicOverview';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const ExploreStack = createStackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      header: null
    }
  },
  WebView: {
    screen: WebView
  },
  Topics: {
    screen: Topics
  },
  TopicOverview: {
    screen: TopicOverview
  }
});

const BookmarksStack = createStackNavigator({
  Bookmarks: {
    screen: Bookmarks
  }
});

const RootNavigator = createBottomTabNavigator(
  {
    Explore: { screen: ExploreStack },
    Bookmarks: { screen: BookmarksStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Explore') {
          iconName = 'ios-compass-outline';
        } else if (routeName === 'Bookmarks') {
          iconName = 'ios-bookmarks-outline';
        }

        return (
          <Icon ios={iconName} android={iconName} style={{ color: '#fff' }} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#c8c9cb',
      activeBackgroundColor: '#24292e',
      inactiveBackgroundColor: '#24292e'
    }
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
