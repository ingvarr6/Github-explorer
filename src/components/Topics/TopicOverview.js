import React, { Component } from 'react';
import {
  ListItem,
  Body,
  Text,
  Icon,
  Right,
  View,
  Spinner
} from 'native-base';
import { getTopicOverview } from '../../api/index';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchTopicsOverview } from '../../actions/topicsAction';


class TopicOverview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'GitHub'),
      headerStyle: {
        backgroundColor: '#24292e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      topicDataList: [],
      isLoading: true
    };
  }

  loadTopicOverview = url => {
    this.props.getTopicOverview(url);
  };

  loadingTopicsList = async () => {
    const topicsList = await getTopicOverview(
      this.props.navigation.getParam('url', 'GitHub')
    );
    this.setState({
      topicDataList: topicsList,
      isLoading: false
    });
  };

  componentDidMount() {
    const url = this.props.navigation.getParam('url');
    this.loadTopicOverview(url);
  }

  render() {
    const {isLoadingTopics, topicOverviewList} = this.props;
    return (
      <React.Fragment>
        {isLoadingTopics ? (
          <View style={styles.spinner}>
            <Spinner color="#24292e" />
          </View>
        ) : (
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={topicOverviewList}
              renderItem={({item}) => (
                <ListItem
                  button
                  onPress={() =>
                    this.props.navigation.navigate('WebView', {
                      url: item.url,
                      name: item.name
                    })
                  }
                >
                  <Body>
                    <Text style={{ paddingBottom: 10 }}>
                      {item.author} / {item.name}
                    </Text>
                    <Text note style={{ paddingBottom: 10 }}>
                      {item.description}
                    </Text>
                    <View style={styles.viewInline}>
                      <View
                        style={[
                          styles.languageColor,
                          { backgroundColor: item.language.color }
                        ]}
                      />
                      <Text>{item.language.name}</Text>
                    </View>
                  </Body>
                  <Right>
                    <Text>
                      <Icon name="ios-star" style={{ fontSize: 14 }} />{' '}
                      {item.stars}
                    </Text>
                  </Right>
                </ListItem>
              )}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  languageColor: {
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: 50
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  viewInline: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    isLoadingTopics: state.topics.isLoading,
    topicOverviewList: state.topics.topicOverviewList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopicOverview: (url) => {
      dispatch(fetchTopicsOverview(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicOverview);
