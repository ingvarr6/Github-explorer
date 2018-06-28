import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Spinner, Button, Segment, Text } from 'native-base';

import TrendingListView from './TrendingListView';

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentActive: 1,
    };
  }

  componentDidMount() {
    this.props.loadTrendsWithPeriod('daily');
  }

  onBookmark = id => {
    this.props.toBookmark(id);
  };

  onSegmentBtn = segmentId => {
    const { loadTrendsWithPeriod } = this.props;
    if (this.props.isLoading === true) {
      return;
    }

    this.setState({
      segmentActive: segmentId
    });

    if (segmentId === 1) {
      loadTrendsWithPeriod('daily');
    } else if (segmentId === 2) {
      loadTrendsWithPeriod('weekly');
    } else {
      loadTrendsWithPeriod('monthly');
    }
  };

  render() {
    const { segmentActive } = this.state;
    const { trends, isLoading } = this.props.trends;
    return (
      <React.Fragment>
        <Segment>
          <Button
            first
            active={segmentActive === 1 ? true : false}
            onPress={() => this.onSegmentBtn(1)}
          >
            <Text>Today</Text>
          </Button>
          <Button
            active={segmentActive === 2 ? true : false}
            onPress={() => this.onSegmentBtn(2)}
          >
            <Text>Week</Text>
          </Button>
          <Button
            last
            active={segmentActive === 3 ? true : false}
            onPress={() => this.onSegmentBtn(3)}
          >
            <Text>Month</Text>
          </Button>
        </Segment>
        {isLoading ? (
          <View style={styles.spinner}>
            <Spinner color="#24292e" />
          </View>
        ) : (
          <View>
            <FlatList
              data={trends}
              renderItem={({ item }) => (
                <TrendingListView
                  href={item.href}
                  name={item.name}
                  author={item.author}
                  description={item.description}
                  stars={item.stars}
                  forks={item.forks}
                  language={item.language}
                  isBookmark={item.isBookmark}
                  onBookmark={this.onBookmark}
                />
              )}
              keyExtractor={(item, index) => item.href}
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

export default Trending;
