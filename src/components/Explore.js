import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Container,
  StyleProvider
} from 'native-base';
import { connect } from 'react-redux';
import { fetchTrends, toBookmark } from '../actions/trendsAction';
import { fetchTopics } from '../actions/topicsAction';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

import Trending from './Trending/Trending';
import Topics from './Topics/Topics';

class Explore extends Component {
  loadTrendsWithPeriod = period => {
    this.props.getTrends(period);
  };

  loadTopics = page => {
    this.props.getTopics(page);
  };

  toBookmark = obj => {
    this.props.toBookmark(obj);
  };

  render() {
    const { trends, isLoadingTrends } = this.props;
    const { topics, isLoadingTopics } = this.props;
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header hasTabs hasSegment />
          <Tabs locked initialPage={0}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-trending-up" />
                  <Text>Trending</Text>
                </TabHeading>
              }
            >
              <Trending
                loadTrendsWithPeriod={this.loadTrendsWithPeriod}
                toBookmark={this.toBookmark}
                isLoading={isLoadingTrends}
                trends={trends}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="list" />
                  <Text>Topics</Text>
                </TabHeading>
              }
            >
              <Topics
                loadTopics={this.loadTopics}
                isLoading={isLoadingTopics}
                topics={topics}
              />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}

Explore.propTypes = {
  navigation: PropTypes.object.isRequired
};


const mapStateToProps = state => {
  return {
    trends: state.trends,
    isLoadingTrends: state.trends.isLoading,
    topics: state.topics.topics,
    isLoadingTopics: state.topics.isLoading,
    topicOverviewList: state.topics.topicOverviewList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTrends: period => {
      dispatch(fetchTrends(period));
    },
    getTopics: page => {
      dispatch(fetchTopics(page));
    },
    toBookmark: obj => {
      dispatch(toBookmark(obj));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
