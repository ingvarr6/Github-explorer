import * as actions from '../actions/topicsAction';

const initialState = {
  topics: [],
  topicOverviewList: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TOPICS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actions.TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload.topics,
        isLoading: false
      };
    case actions.TOPIC_OVERVIEW_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actions.TOPIC_OVERVIEW_SUCCESS:
      return {
        ...state,
        topicOverviewList: action.payload.topicOverview,
        isLoading: false
      };
    default:
      return state;
  }
};
